// @ts-nocheck
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Box as Box } from '@mui/material';
import { Typography as Typography } from '@mui/material';

import {
  buildCategoryGroups,
  buildCategoryColumns,
  getItemPathname,
} from '../../menuModel';
import { cocoBold, cocoRegular } from '../../../../styles/constants';

interface Props {
  menus: any[];
  closeDrawer: () => void;
  labels: any;
}

export default function CategoriesPanel({
  menus,
  closeDrawer,
  labels,
}: Props) {
  return (
    <Box sx={{ pt: '20px' }}>
      {menus.map((menu: any) => {
        const groups = buildCategoryColumns(buildCategoryGroups(menu));
        const allPathname = getItemPathname(menu);

        return (
          <Box key={menu.name} sx={{ mb: '24px' }}>
            <NavLink
              to={{ pathname: allPathname }}
              onClick={closeDrawer}
              style={{
                ...cocoBold,
                fontSize: '0.625rem',
                color: '#111',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {labels.viewAll}
            </NavLink>

            <Box
              sx={{
                mt: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                columnGap: '24px',
                rowGap: '24px',
              }}
            >
              {groups.map((group: any) => (
                <Box key={group.id}>
                  <Typography
                    sx={{
                      ...cocoBold,
                      fontSize: '0.625rem',
                      color: '#111',
                      mb: '8px',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {group.name}
                  </Typography>

                  {group.items.map((item: any) => (
                    <Box key={item.id} sx={{ padding: '4px 0' }}>
                      <NavLink
                        to={{
                          pathname: item.pathname,
                          state: { title: item.name },
                        }}
                        onClick={closeDrawer}
                        style={{
                          ...cocoRegular,
                          fontSize: '0.625rem',
                          color: '#6c6c6c',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.name}
                      </NavLink>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
