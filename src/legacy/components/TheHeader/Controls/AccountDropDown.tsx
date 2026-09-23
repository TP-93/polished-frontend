// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { v4 as uuid4 } from 'uuid';
import { useApolloClient, useMutation } from 'react-apollo';

import { Box as Box } from '@mui/material';
import { Stack as Stack } from '@mui/material';

import {
  white,
  platinum,
  lightGrey,
  cocoRegular,
} from '../../../styles/constants';
import initState from '../../../apollo/local/initState';
import { getCheckout } from '../../../apollo/queries/checkout';
import { useUserProvider } from '../../../context/user';
import { createOrMergeCheckoutLogOut } from '../../../apollo/mutations/checkout';
import {
  AUTH_TOKEN_NAME,
  GUEST_TOKEN_NAME,
  PREV_GUEST_TOKEN_NAME,
} from '../../../constants';

import { ReactComponent as logOut } from '../../../assets/images/icons/account/logout_icon.svg.tsx';
import { ReactComponent as userIcon } from '../../../assets/images/icons/account/profile_icon_white.svg.tsx';
import { ReactComponent as designsIcon } from '../../../assets/images/icons/checkout/print_icon.svg.tsx';

const prevToken = localStorage.getItem(PREV_GUEST_TOKEN_NAME);
const token = prevToken || uuid4();

const linkTextStyle: any = {
  position: 'relative',
  top: '3px',
  color: '#000',
  fontSize: 'calc(0.2em + 1vmin)',
  ...cocoRegular,
};

interface Props {
  menuItemsProvider: any;
  closeMenu: () => void;
}

export default ({ closeMenu, menuItemsProvider }: Props) => {
  const router = useHistory();
  const client = useApolloClient();

  const {
    state: { currency, currentLanguage: lang },
  } = useUserProvider();

  const [logoutRequest, { loading: isLoading }] = useMutation(
    createOrMergeCheckoutLogOut,
    {
      refetchQueries: ['checkAuthenticatedState'],
      variables: {
        lang,
        input: {
          token,
        },
        currency,
      },
      onCompleted: (data) => {
        localStorage.removeItem(AUTH_TOKEN_NAME);
        localStorage.setItem(GUEST_TOKEN_NAME, token);

        client.writeData({ data: initState });

        if (data) {
          client.writeQuery({
            query: getCheckout,
            data: data.checkoutCreateOrMergeLogOut,
            variables: { token },
          });

          closeMenu();
        }
      },
    },
  );

  const redirectHandler = (path: string) => {
    router.push(path);

    closeMenu();
  };

  return (
    <Box
      onMouseLeave={closeMenu}
      sx={{
        position: 'absolute',
        top: '60px',
        right: '20px',
        width: 'max-content',
        height: 'auto',
        margin: 0,
        zIndex: 200,
        background: white,
        div: {
          p: '1rem',
          cursor: 'pointer',
          borderBottom: `1px solid ${lightGrey}`,
          ':hover': {
            background: platinum,
          },
        },
      }}
    >
      <Stack
        display="flex"
        alignItems="center"
        flexDirection="row"
        onClick={() => redirectHandler('/account')}
      >
        <UserIcon />
        <span style={{ ...linkTextStyle }}>{menuItemsProvider.account}</span>
      </Stack>

      <Stack
        display="flex"
        alignItems="center"
        flexDirection="row"
        onClick={() => redirectHandler('/my-designs')}
      >
        <DesignsIcon />
        <span style={{ ...linkTextStyle }}>{menuItemsProvider.myDesigns}</span>
      </Stack>

      <Stack
        display="flex"
        alignItems="center"
        flexDirection="row"
        onClick={() => logoutRequest()}
        sx={{
          touchActions: isLoading ? 'none' : 'auto',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.5 : 1,
        }}
      >
        <LogOutIcon />
        <span style={{ ...linkTextStyle }}>{menuItemsProvider.signout}</span>
      </Stack>
    </Box>
  );
};

const LogOutIcon = styled(logOut)`
  margin-right: 10px;
  min-height: 1.5vh;
  width: 1.5vh;

  path {
    fill: #000;
  }
`;
const UserIcon = styled(userIcon)`
  margin-right: 10px;
  min-height: 1.5vh;
  width: 1.5vh;

  path {
    fill: #000;
  }
`;
const DesignsIcon = styled(designsIcon)`
  margin-right: 10px;
  min-height: 1.5vh;
  width: 1.5vh;

  path {
    fill: #000;
  }
`;
