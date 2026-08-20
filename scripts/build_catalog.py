"""Normalise the raw API dump into the slim catalogue the app ships with.

Input:  src/services/data/catalog.json (raw dump from fetch_real_catalog.py)
Output: src/services/data/catalog.slim.json
"""
import base64, json, re, os

RAW = os.environ.get("JC_RAW_OUT", "/tmp/jc-catalog-raw.json")
OUT_PRODUCTS = "src/services/data/products.json"
OUT_DESIGNS = "src/services/data/designs.json"
MEDIA = "https://staging.jorcustom.com/media/"

raw = json.load(open(RAW))


def decode_id(gid: str) -> str:
    try:
        return base64.b64decode(gid).decode().split(":", 1)[1]
    except Exception:
        return gid


def text(html: str | None) -> str:
    if not html:
        return ""
    value = re.sub(r"<br\s*/?>", "\n", html)
    value = re.sub(r"</p>\s*<p>", "\n", value)
    value = re.sub(r"<[^>]+>", "", value)
    value = value.replace("&nbsp;", " ").replace("&amp;", "&").replace("&#39;", "'")
    return re.sub(r"\n{3,}", "\n\n", value).strip()


texts: list[str] = []
text_index: dict[str, int] = {}


def intern_text(value: str) -> int:
    """Store repeated copy (descriptions, size guides) once and reference it by index."""
    if value not in text_index:
        text_index[value] = len(texts)
        texts.append(value)
    return text_index[value]


designs: dict[str, dict] = {}
products: list[dict] = []

for node in raw["products"]:
    images = []
    for group in node.get("imageGroups") or []:
        for image in group.get("images") or []:
            url = image["url"]
            if "placeholder" in url or url in images:
                continue
            images.append(url)
    thumb = (node.get("thumbnail") or {}).get("url")
    if thumb and "placeholder" not in thumb and thumb not in images:
        images.insert(0, thumb)
    if not images:
        continue

    design_ids = []
    for design in node.get("designs") or []:
        did = decode_id(design["id"])
        design_ids.append(did)
        if did in designs:
            continue
        layers = []
        for layer in sorted(design.get("layers") or [], key=lambda l: l.get("position") or 0):
            offset = json.loads(layer.get("offset") or "{}")
            layers.append({
                "id": decode_id(layer["id"]),
                "name": layer.get("displayName") or layer.get("name") or "",
                "layerType": layer.get("layerType"),
                "image": MEDIA + layer["image"] if layer.get("image") else None,
                "editableColor": bool(layer.get("isEditableColor")),
                "editableText": bool(layer.get("isEditableText")),
                "printable": bool(layer.get("isPrintable")),
                "defaultColor": layer.get("defaultColor"),
                "position": layer.get("position") or 0,
                "width": layer.get("width") or 0,
                "height": layer.get("height") or 0,
                "x": offset.get("x") or 0,
                "y": offset.get("y") or 0,
                "minChars": layer.get("minCharacterAmount"),
                "maxChars": layer.get("maxCharacterAmount"),
            })
        if not layers:
            continue
        base = layers[0]
        designs[did] = {
            "id": did,
            "name": re.sub(r"\.psd$", "", design.get("name") or "", flags=re.I),
            "thumbnail": design.get("thumbnail"),
            "projection": design.get("projection"),
            "canvasWidth": base["width"] or 1667,
            "canvasHeight": base["height"] or 2000,
            "layers": layers,
        }

    sizes = [
        {"label": (item.get("size") or "").upper(), "quantity": item.get("quantity") or 0}
        for item in node.get("stockItems") or []
        if item.get("size")
    ]

    products.append({
        "slug": node["slug"],
        "name": node["name"],
        "new": bool(node.get("new")),
        "priceCents": round(float((node.get("price") or {}).get("amount") or 0) * 100),
        "discountPriceCents": (
            round(float(node["discountPrice"]["amount"]) * 100) if node.get("discountPrice") else None
        ),
        "color": {
            "name": (node.get("color") or {}).get("name") or "",
            "hex": (node.get("color") or {}).get("value") or "#000000",
        },
        "category": {
            "name": (node.get("category") or {}).get("name") or "",
            "slug": (node.get("category") or {}).get("slug") or "",
        },
        "collections": [
            {"name": c["name"].strip(), "slug": c["slug"]} for c in node.get("collections") or []
        ],
        "images": images[:6],
        "sizes": sizes,
        "description": intern_text(text(node.get("description"))),
        "descriptionEn": intern_text(text(node.get("descriptionEn"))),
        "sizeReference": intern_text(text(node.get("sizeReference"))),
        "sizeReferenceEn": intern_text(text(node.get("sizeReferenceEn"))),
        "designIds": [d for d in design_ids if d in designs],
    })

# --- Fallback: products whose colourway has no artwork of its own reuse the
# artwork of the same theme + garment (staging only ships designs for the base
# colourways, e.g. SummerSet twin-set variants have none).
PROJ = {"front", "back"}


def parse_asset_name(name: str):
    """-> (theme, garment, colour, projection) from a JORCUSTOM asset filename."""
    stem = re.sub(r"\.(psd|jpg|jpeg|png)$", "", name, flags=re.I)
    tokens = stem.split("_")
    for i, token in enumerate(tokens):
        if token.lower() in PROJ and i >= 3:
            return tokens[i - 3], tokens[i - 2], tokens[i - 1], token.lower()
    return None


def norm(value: str) -> str:
    return re.sub(r"[^a-z0-9]", "", (value or "").lower())


def garment_keys(garment: str) -> list[str]:
    base = norm(garment)
    keys = [base]
    for prefix in ("summerset", "twinset", "set"):
        if base.startswith(prefix):
            keys.append(base[len(prefix):])
    return [k for k in keys if k]


design_index: dict[tuple[str, str, str], list[str]] = {}
design_index_any_colour: dict[tuple[str, str], list[str]] = {}
for did, design in designs.items():
    parsed = parse_asset_name(design["name"])
    if not parsed:
        continue
    theme, garment, colour, _ = parsed
    for gkey in garment_keys(garment):
        design_index.setdefault((norm(theme), gkey, norm(colour)), []).append(did)
        design_index_any_colour.setdefault((norm(theme), gkey), []).append(did)

fallbacks = 0
for product in products:
    if product["designIds"] or not product["images"]:
        continue
    parsed = next(
        (p for p in (parse_asset_name(i.rsplit("/", 1)[-1]) for i in product["images"]) if p),
        None,
    )
    if not parsed:
        continue
    theme, garment, colour, _ = parsed
    colours = [colour] + colour.split("-")
    matched: list[str] = []
    for gkey in garment_keys(garment):
        for candidate in colours:
            matched = design_index.get((norm(theme), gkey, norm(candidate)), [])
            if matched:
                break
        if not matched:
            matched = design_index_any_colour.get((norm(theme), gkey), [])
        if matched:
            break
    if not matched:
        continue
    # keep one design per projection, preferring the first match
    picked: dict[str, str] = {}
    for did in matched:
        projection = designs[did].get("projection") or "front"
        picked.setdefault(projection, did)
    product["designIds"] = list(picked.values())
    fallbacks += 1



os.makedirs(os.path.dirname(OUT_PRODUCTS), exist_ok=True)
json.dump(
    {
        "products": products,
        "texts": texts,
        "colorThemes": [
            {"id": decode_id(t["id"]), "name": t["name"], "colors": t["colors"]}
            for t in raw["colorThemes"]
        ],
    },
    open(OUT_PRODUCTS, "w"),
    separators=(",", ":"),
)
json.dump(designs, open(OUT_DESIGNS, "w"), separators=(",", ":"))
print("products", len(products), "designs", len(designs), "texts", len(texts))
print("customisable products", sum(1 for p in products if p["designIds"]), "fallback-matched", fallbacks)
