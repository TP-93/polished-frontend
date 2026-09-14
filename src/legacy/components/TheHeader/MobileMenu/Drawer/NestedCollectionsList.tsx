// @ts-nocheck
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { List as List } from '@mui/material';
import { SvgIcon as SvgIcon } from '@mui/material';
import { Collapse as Collapse } from '@mui/material';
import { ListItem as ListItem } from '@mui/material';
import { Typography as Typography } from '@mui/material';

import { cocoBold, cocoRegular } from '../../../../styles/constants';

import { ReactComponent as RightArrow } from '../../../../assets/images/icons/arrows/right_arrow_icon_black.svg.tsx';

interface Props {
  collections: any[];
  closeDrawer: () => void;
}

export default function NestedCollectionsList({
  collections,
  closeDrawer,
}: Props) {
  const [dropDownCollection, setDropDownCollection] =
    React.useState<string>('');

  return (
    <>
      {collections
        .filter((collection: any) => collection.enableSubmenu)
        .map((collection: any) => {
          const isDropDownActive: boolean =
            dropDownCollection === collection.name;

          const { productCategoryList } = collection.collection || {};

          const uniqueParentCategories = productCategoryList.reduce(
            (acc: any, category: any) => {
              const isCategoryAdded = acc.find(
                (item: any) => item.categoryName === category.parentName,
              );

              if (
                !isCategoryAdded &&
                category?.parentName &&
                category?.parentPosition
              ) {
                acc.push({
                  id: category.id,
                  categorySlug: category.slug,
                  categoryName: category.parentName,
                  parentPosition: category.parentPosition,
                  collectionName: collection.name,
                });
              }

              return acc;
            },
            [],
          );

          return (
            <List
              key={collection.collection.name}
              disablePadding
              sx={{
                ':last-child': {
                  paddingBottom: isDropDownActive ? '1rem' : 0,
                  borderBottom: isDropDownActive ? '1px solid gray' : 'none',
                },
              }}
            >
              <ListItem
                disablePadding
                onClick={() => {
                  if (!isDropDownActive) {
                    setDropDownCollection(collection.collection.name);
                  } else {
                    setDropDownCollection('');
                  }
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 0',
                  cursor: 'pointer',
                  borderBottom: isDropDownActive ? 'none' : '1px solid gray',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    ...cocoBold,
                    color: '#000',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                  }}
                >
                  {collection?.collection?.name}
                </Typography>

                <SvgIcon
                  component={RightArrow}
                  inheritViewBox
                  sx={{
                    height: '15px',
                    transform: isDropDownActive ? 'rotateY(180deg)' : undefined,
                  }}
                />
              </ListItem>

              <Collapse in={isDropDownActive}>
                <ListItem
                  disablePadding
                  onClick={closeDrawer}
                  sx={{ padding: '0 0 0.5rem 20px', cursor: 'pointer' }}
                >
                  <NavLink
                    to={{
                      pathname: `/collection/${collection?.collection?.slug?.toLowerCase()}/`,
                    }}
                    style={{
                      opacity: 0.75,
                      ...cocoRegular,
                      color: '#727272',
                      fontSize: '0.75rem',
                    }}
                  >
                    ALL
                  </NavLink>
                </ListItem>

                {uniqueParentCategories
                  .sort(
                    (a: any, b: any) => +a.parentPosition - +b.parentPosition,
                  )
                  .map((category: any, topIndex: number) => {
                    const subCategoriesData = productCategoryList
                      .filter(
                        (item: any) =>
                          item.parentName === category.categoryName,
                      )
                      .sort((a: any, b: any) => +a.position - +b.position);

                    return (
                      <List key={`${topIndex}-${category.name}`} disablePadding>
                        {subCategoriesData.map(
                          (subCategory: any, index: number) => {
                            const pathname: string = `/collection/${collection.collection.slug.toLowerCase()}/${
                              subCategory.slug
                            }`;

                            return (
                              <ListItem
                                key={`${index}-${subCategory.name}`}
                                disablePadding
                                sx={{
                                  padding: '0.5rem 0 0.5rem 20px',
                                  opacity: 0.75,
                                  a: {
                                    color: '#727272 !important',
                                    '&:hover': {
                                      color: '#000 !important',
                                    },
                                  },
                                }}
                              >
                                <NavLink
                                  to={{
                                    pathname,
                                    state: { title: subCategory.name },
                                  }}
                                  onClick={closeDrawer}
                                  style={{
                                    fontSize: '0.7rem',
                                    ...cocoRegular,
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  {subCategory?.name}
                                </NavLink>
                              </ListItem>
                            );
                          },
                        )}
                      </List>
                    );
                  })}
              </Collapse>
            </List>
          );
        })}
    </>
  );
}
