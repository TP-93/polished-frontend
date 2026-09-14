// @ts-nocheck
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import moment from 'moment-timezone';

import { List as List } from '@mui/material';
import { ListItem as ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { cocoBold } from '../../../../styles/constants';

function isBeforeNovember25_00hrsAmsterdam() {
  const currentDateTime = moment().tz('Europe/Amsterdam');
  const targetDateTime = moment.tz(
    `${currentDateTime.year()}-11-25T00:00:00`,
    'Europe/Amsterdam',
  );

  return currentDateTime.isBefore(targetDateTime);
}

const useStyles = makeStyles(() => ({
  box: {
    width: 'max-content',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: '20%',
      width: 0,
      height: '2px',
      backgroundColor: '#5c5c5c',
      whiteSpace: 'nowrap',
      transition: 'width 0.3s ease',
    },
    // '&:hover::after': {
    //   width: '100%',
    //   backgroundColor: '#000',
    // },
  },
}));

interface Props {
  collections: any[];
  closeDrawer: () => void;
}

export default function TopLevelCollectionsList({
  collections,
  closeDrawer,
}: Props) {
  const classes = useStyles();

  const getListItemPathname = (item: any) => {
    if (item?.page) {
      return `/${item?.page.slug}`;
    }

    if (item?.collection) {
      if (item.collection.name.toLowerCase() === 'black friday') {
        if (!isBeforeNovember25_00hrsAmsterdam())
          return `/collection/black-friday/`;

        return `/special-event`;
      }

      return `/collection/${item.collection?.slug?.toLowerCase()}`;
    }

    return '#';
  };

  return (
    <List disablePadding>
      {collections
        .filter((collection: any) => !collection.enableSubmenu)
        .map((collection: any) => {
          const pathname = getListItemPathname(collection);

          const isBlackFriday: boolean =
            collection.name.toLowerCase() === 'black friday';

          return (
            <ListItem
              id="shop-item"
              key={collection.name}
              disablePadding
              className={classes.box}
              sx={{
                padding: '0.5rem 0',
                a: {
                  color: `${isBlackFriday ? '#0051ca' : '#5c5c5c'} !important`,
                  '&:hover': {
                    color: `${isBlackFriday ? '#0051ca' : '#000'} !important`,
                  },
                },
                '&:hover::after': {
                  width: '100%',
                  backgroundColor: isBlackFriday ? '#0051ca' : '#000',
                },
              }}
            >
              <NavLink
                to={{ pathname }}
                onClick={closeDrawer}
                style={{
                  ...cocoBold,
                  fontSize: '0.7rem',
                }}
              >
                {collection.name}
              </NavLink>
            </ListItem>
          );
        })}
    </List>
  );
}
