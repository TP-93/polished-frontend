// @ts-nocheck
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { List as List } from '@mui/material';
import { ListItem as ListItem } from '@mui/material';
import { Collapse as Collapse } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { cocoBold, cocoRegular } from '../../../../styles/constants';

const useStyles = makeStyles(() => ({
  box: {
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: 0 /* Initial width set to 0 */,
      height: '2px',
      backgroundColor: '#5c5c5c',
      transition: 'width 0.3s ease' /* Transition on width */,
    },
    '&:hover::after': {
      width: '100%' /* Width increases on hover */,
    },
  },
}));

interface Props {
  collections: any[];
  closeDrawer: () => void;
}

export default function NestedCollectionsList({
  collections,
  closeDrawer,
}: Props) {
  const classes = useStyles();

  const [subCategories, setSubCategories] = React.useState<any>({
    categoryName: '',
    collectionName: '',
  });

  return (
    <>
      {collections
        .filter((collection: any) => collection.enableSubmenu)
        .map((collection: any) => {
          const { productCategoryList } = collection.collection || {};

          const uniqueParentCategories = productCategoryList
            .sort((a: any, b: any) => +a.parentPosition - +b.parentPosition)
            .reduce((acc: any, category: any) => {
              const isCategoryAdded = acc.find(
                (item: any) => item.categoryName === category.parentName,
              );

              if (
                category?.parentName &&
                category?.parentPosition &&
                !isCategoryAdded
              ) {
                acc.push({
                  id: category.id,
                  categoryName: category.parentName,
                  parentPosition: category.parentPosition,
                  collectionName: collection.name,
                });
              }

              return acc;
            }, []);

          return (
            <List key={collection.name} disablePadding>
              <ListItem
                disablePadding
                onClick={closeDrawer}
                sx={{
                  padding: '0.6rem 0',
                  cursor: 'pointer',
                  a: {
                    color: '#5c5c5c !important',
                    '&:hover': {
                      color: '#000 !important',
                    },
                  },
                }}
              >
                <NavLink
                  to={{
                    pathname: `/collection/${collection?.collection?.slug?.toLowerCase()}/`,
                  }}
                  className={classes.box}
                  style={{
                    ...cocoBold,
                    fontSize: '0.7rem',
                  }}
                >
                  {collection?.collection?.name}
                </NavLink>
              </ListItem>

              <ListItem
                disablePadding
                onClick={closeDrawer}
                sx={{
                  a: {
                    color: '#7c7c7c !important',
                    '&:hover': {
                      color: '#000 !important',
                    },
                  },
                }}
              >
                <NavLink
                  to={{
                    pathname: `/collection/${collection?.collection?.slug?.toLowerCase()}/`,
                  }}
                  style={{
                    padding: '0.5rem 0',
                    opacity: 0.75,
                    ...cocoRegular,
                    cursor: 'pointer',
                    fontSize: '0.7rem',
                  }}
                >
                  ALL
                </NavLink>
              </ListItem>

              {uniqueParentCategories.map((category: any) => {
                const subCategoriesData = productCategoryList
                  .filter(
                    (item: any) => item.parentName === category.categoryName,
                  )
                  .sort((a: any, b: any) => a.position - b.position);

                return (
                  <ListItem
                    key={category.id}
                    onMouseEnter={() =>
                      setSubCategories({
                        categoryName: category.categoryName,
                        collectionName: collection.name,
                      })
                    }
                    onMouseLeave={() => {
                      setSubCategories({
                        categoryName: '',
                        collectionName: '',
                      });
                    }}
                    disablePadding
                    sx={{
                      position: 'relative',
                      padding: '0.5rem 0',
                      opacity: 0.75,
                      ...cocoRegular,
                      fontSize: '0.7rem',
                      color: '#7c7c7c !important',
                      '&:hover': {
                        color: '#000 !important',
                      },
                    }}
                  >
                    {category.categoryName}

                    <Collapse
                      in={
                        subCategories.collectionName === collection.name &&
                        subCategories.categoryName === category.categoryName
                      }
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: '100%',
                        width: 'max-content',
                      }}
                    >
                      <List disablePadding>
                        {subCategoriesData.map((subCategory: any) => {
                          const pathname: string = `/collection/${collection.collection.slug.toLowerCase()}/${
                            subCategory.slug
                          }`;

                          return (
                            <ListItem
                              key={subCategory?.slug}
                              disablePadding
                              sx={{
                                padding: '0.5rem 0 0.5rem 2rem',
                                opacity: 0.75,
                                a: {
                                  color: '#7c7c7c !important',
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
                        })}
                      </List>
                    </Collapse>
                  </ListItem>
                );
              })}
            </List>
          );
        })}
    </>
  );
}
