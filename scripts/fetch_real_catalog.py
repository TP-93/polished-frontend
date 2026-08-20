"""Fetch the real JORCUSTOM catalogue (products, designs, layers, colour themes)
from the staging GraphQL API and write it to src/services/data/catalog.json.

Usage: python3 scripts/fetch_real_catalog.py
Requires JC_BASIC_AUTH="user:password" for the staging basic-auth gate.
"""
import base64, json, os, sys, urllib.error, urllib.request

URL = os.environ.get("JC_GRAPHQL_URL", "https://staging.jorcustom.com/graphql/")
BASIC = os.environ.get("JC_BASIC_AUTH", "")
OUT = os.environ.get("JC_RAW_OUT", "/tmp/jc-catalog-raw.json")

HEADERS = {"content-type": "application/json"}
if BASIC:
    HEADERS["Authorization"] = "Basic " + base64.b64encode(BASIC.encode()).decode()


def gql(query: str):
    req = urllib.request.Request(URL, json.dumps({"query": query}).encode(), HEADERS)
    try:
        payload = json.load(urllib.request.urlopen(req, timeout=180))
    except urllib.error.HTTPError as err:
        payload = json.loads(err.read())
    if not payload.get("data"):
        print(json.dumps(payload)[:1000], file=sys.stderr)
        raise SystemExit("GraphQL query failed")
    return payload["data"]


PRODUCTS = """{ products(first: 100 %s) {
  pageInfo { hasNextPage endCursor }
  edges { node {
    slug name new
    price { amount currency }
    discountPrice { amount }
    color { name value }
    category { name slug }
    collections { name slug }
    description descriptionEn sizeReference sizeReferenceEn
    thumbnail { url }
    imageGroups { name images { url } }
    stockItems { size quantity }
    designs { id name thumbnail projection layers {
      id name displayName layerType image isEditableColor isEditableText
      isPrintable defaultColor position height width offset
      minCharacterAmount maxCharacterAmount
    } }
  } } } }"""


def main():
    nodes, after = [], ""
    while True:
        conn = gql(PRODUCTS % after)["products"]
        nodes += [edge["node"] for edge in conn["edges"]]
        if not conn["pageInfo"]["hasNextPage"]:
            break
        after = ', after: "%s"' % conn["pageInfo"]["endCursor"]

    themes = gql("{ colorThemes { id name colors } }")["colorThemes"]

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as handle:
        json.dump({"products": nodes, "colorThemes": themes}, handle, separators=(",", ":"))
    print(f"wrote {OUT}: {len(nodes)} products, {len(themes)} colour themes")


if __name__ == "__main__":
    main()
