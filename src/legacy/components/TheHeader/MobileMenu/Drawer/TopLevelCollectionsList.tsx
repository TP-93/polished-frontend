// @ts-nocheck
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import moment from 'moment-timezone';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { cocoBold } from '../../../../styles/constants';

function isBeforeNovember25_00hrsAmsterdam() {
  const currentDateTime = moment().tz('Europe/Amsterdam');
  const targetDateTime = moment.tz(
    `${currentDateTime.year()}-11-25T00:00:00`,
    'Europe/Amsterdam',
  );

  return currentDateTime.isBefore(targetDateTime);
}

interface Props {
  collections: any[];
  closeDrawer: () => void;
}

export default function TopLevelCollectionsList({
  collections,
  closeDrawer,
}: Props) {
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
              key={collection.name}
              disablePadding
              sx={{
                padding: '1rem 0',
                borderBottom: '1px solid gray',
                a: {
                  color: `${isBlackFriday ? '#0051ca' : '#5c5c5c'} !important`,
                  '&:hover': {
                    color: `${isBlackFriday ? '#0051ca' : '#000'} !important`,
                  },
                },
              }}
            >
              <NavLink
                to={{ pathname }}
                onClick={closeDrawer}
                style={{
                  ...cocoBold,
                  color: '#000',
                  fontSize: '0.75rem',
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
