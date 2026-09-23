// @ts-nocheck
// Shared model for the shop menu. Everything is derived from the data the shop
// already returns in `getShopMenu` (navigation.main.items) - nothing is hardcoded.
import moment from 'moment-timezone';

function isBeforeNovember25_00hrsAmsterdam() {
  const currentDateTime = moment().tz('Europe/Amsterdam');
  const targetDateTime = moment.tz(
    `${currentDateTime.year()}-11-25T00:00:00`,
    'Europe/Amsterdam',
  );

  return currentDateTime.isBefore(targetDateTime);
}

export function getItemPathname(item: any): string {
  if (item?.page) return `/${item.page.slug}`;

  if (item?.collection) {
    if (item.collection.name?.toLowerCase() === 'black friday') {
      if (!isBeforeNovember25_00hrsAmsterdam())
        return '/collection/black-friday/';

      return '/special-event';
    }

    return `/collection/${item.collection?.slug?.toLowerCase()}`;
  }

  return '#';
}

export function getDiscountValue(name: string): number | null {
  const match = (name || '').match(/(\d{1,2})\s*%/);

  return match ? Number(match[1]) : null;
}

export function isSaleItem(item: any): boolean {
  const names = `${item?.name || ''} ${item?.collection?.name || ''}`;

  return /sale/i.test(names);
}

// Groups a submenu item into parent categories with their sub categories.
export function buildCategoryGroups(item: any): any[] {
  const list: any[] = item?.collection?.productCategoryList || [];
  const slug: string = item?.collection?.slug?.toLowerCase() || '';

  const groups: any[] = [];

  [...list]
    .sort((a: any, b: any) => +a.parentPosition - +b.parentPosition)
    .forEach((category: any) => {
      if (!category?.parentName || !category?.parentPosition) return;

      let group = groups.find(
        (candidate: any) => candidate.name === category.parentName,
      );

      if (!group) {
        group = {
          id: `${slug}-${category.parentName}`,
          name: category.parentName,
          items: [],
        };

        groups.push(group);
      }

      group.items.push({
        id: category.id,
        name: category.name,
        pathname: `/collection/${slug}/${category.slug}`,
      });
    });

  groups.forEach((group: any) => {
    group.items.sort((a: any, b: any) => a.position - b.position);
  });

  return groups;
}

const categoryGroupOrder: string[][] = [
  ['tops', 'top'],
  ['sweatshirts', 'sweatshirt', 'hoodies & zips', 'hoodies'],
  ['bottoms', 'bottom'],
  ['jackets & vests', 'jackets', 'jacket'],
  ['accessoires', 'accessories', 'accessories & lifestyle'],
];

export function orderCategoryGroups(groups: any[] = []): any[] {
  const getRank = (name: string): number => {
    const normalizedName = (name || '').trim().toLowerCase();
    const rank = categoryGroupOrder.findIndex((aliases: string[]) =>
      aliases.some(
        (alias: string) =>
          normalizedName === alias || normalizedName.startsWith(`${alias} `),
      ),
    );

    return rank === -1 ? categoryGroupOrder.length : rank;
  };

  return groups
    .map((group: any, index: number) => ({ group, index }))
    .sort((a: any, b: any) => {
      const rankDifference = getRank(a.group?.name) - getRank(b.group?.name);
      return rankDifference || a.index - b.index;
    })
    .map(({ group }: any) => group);
}

export function buildMenuModel(collections: any[] = []) {
  const submenuItems = collections.filter((item: any) => item?.enableSubmenu);
  const flatItems = collections.filter((item: any) => !item?.enableSubmenu);

  const categoryMenus = submenuItems.filter((item: any) => !isSaleItem(item));
  const saleMenus = submenuItems.filter((item: any) => isSaleItem(item));

  const discounts = flatItems
    .filter(
      (item: any) => isSaleItem(item) && getDiscountValue(item.name) !== null,
    )
    .map((item: any) => ({
      value: getDiscountValue(item.name),
      name: item.name,
      pathname: getItemPathname(item),
    }))
    .sort((a: any, b: any) => a.value - b.value);

  const collectionItems = flatItems.filter(
    (item: any) =>
      !(isSaleItem(item) && getDiscountValue(item.name) !== null),
  );

  return { categoryMenus, saleMenus, discounts, collectionItems };
}
