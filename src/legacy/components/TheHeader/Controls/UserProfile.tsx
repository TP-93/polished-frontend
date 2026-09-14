// @ts-nocheck
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';

import { useQuery } from 'react-apollo';

import { useMediaQuery } from '@mui/material';

import AccountDropDown from './AccountDropDown';
import useClickOutside from '../../../utils/hooks/ClickOutside';
import { useUserProvider } from '../../../context/user';
import { isAuthenticated } from '../../../apollo/queries/auth';

import { ReactComponent as ProfileIcon } from '../../../assets/images/icons/account/profile_icon_black.svg.tsx';

interface Props {
  isWhiteHeader: boolean;
  openDrawer: (type: 'user') => void;
}

export default function UserProfile({ isWhiteHeader, openDrawer }: Props) {
  const router = useHistory();
  const isMobile = useMediaQuery('(max-width:767px)');

  const userProfileRef = React.useRef<any>(null);

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { Header } = languages[currentLanguage];
  const { menuItems: menuItemsProvider } = Header;

  const { data } = useQuery(isAuthenticated);

  const [isProfileDropDown, setProfileDropDown] =
    React.useState<boolean>(false);

  useClickOutside(userProfileRef, () => {
    setProfileDropDown(false);
  });

  const userIconClickHandler = () => {
    if (isMobile) {
      if (!data?.isLoggedIn) openDrawer('user');
      else router.push('/account');
    }

    if (!isMobile) {
      if (!data?.isLoggedIn) {
        openDrawer('user');
      } else if (!isProfileDropDown) setProfileDropDown(true);
      else setProfileDropDown(false);
    }
  };

  return (
    <Stack
      ref={userProfileRef}
      onClick={userIconClickHandler}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        mr: '1.5rem',
        cursor: 'pointer',
      }}
    >
      <SvgIcon
        component={ProfileIcon}
        inheritViewBox
        sx={{
          height: '20px',
          fill: isWhiteHeader ? '#0a0a0a' : '#fff',
        }}
      />

      {isProfileDropDown && (
        <AccountDropDown
          menuItemsProvider={menuItemsProvider}
          closeMenu={() => setProfileDropDown(false)}
        />
      )}
    </Stack>
  );
}
