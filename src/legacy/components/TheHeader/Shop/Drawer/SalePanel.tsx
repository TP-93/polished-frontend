// @ts-nocheck
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Box as Box } from '@mui/material';
import { Typography as Typography } from '@mui/material';

import { buildCategoryGroups, getItemPathname } from '../../menuModel';
import { cocoBold, cocoRegular } from '../../../../styles/constants';

interface Props {
  menus: any[];
  discounts: any[];
  closeDrawer: () => void;
  labels: any;
}

export default function SalePanel({
  menus,
  discounts,
  closeDrawer,
  labels,
}: Props) {
  return (
    <Box sx={{ pt: '20px' }}>
      {discounts.length > 0 && (
        <Box sx={{ mb: '24px' }}>
          <Typography
            sx={{
              ...cocoBold,
              fontSize: '0.7rem',
              color: '#111',
              mb: '10px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {labels.discount}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {discounts.map((discount: any) => (
              <NavLink
                key={discount.name}
                to={{ pathname: discount.pathname }}
                onClick={closeDrawer}
                style={{ textDecoration: 'none' }}
              >
                <Box
                  sx={{
                    ...cocoBold,
                    fontSize: '0.7rem',
                    color: '#111',
                    padding: '8px 14px',
                    borderRadius: '999px',
                    border: '1px solid #e2e2e2',
                    backgroundColor: '#fafafa',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#111',
                      backgroundColor: '#f0f0f0',
                    },
                  }}
                >
                  {`-${discount.value}%`}
                </Box>
              </NavLink>
            ))}
          </Box>
        </Box>
      )}

      {menus.map((menu: any) => {
        const groups = buildCategoryGroups(menu);

        return (
          <Box key={menu.name}>
            <NavLink
              to={{ pathname: getItemPathname(menu) }}
              onClick={closeDrawer}
              style={{
                ...cocoBold,
                fontSize: '0.7rem',
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
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                columnGap: '24px',
                rowGap: '24px',
              }}
            >
              {groups.map((group: any) => (
                <Box key={group.id}>
                  <Typography
                    sx={{
                      ...cocoBold,
                      fontSize: '0.7rem',
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
                          fontSize: '0.7rem',
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
