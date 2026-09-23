// @ts-nocheck
import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { Stack as Stack } from '@mui/material';
import { UserRound } from 'lucide-react';

import { useQuery } from 'react-apollo';

import { useMediaQuery } from '@mui/material';

import AccountDropDown from './AccountDropDown';
import useClickOutside from '../../../utils/hooks/ClickOutside';
import { useUserProvider } from '../../../context/user';
import { isAuthenticated } from '../../../apollo/queries/auth';

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
        cursor: 'pointer',
      }}
    >
      <UserRound
        aria-hidden="true"
        size={19}
        strokeWidth={1.35}
        color={isWhiteHeader ? 'var(--foreground)' : 'var(--background)'}
        style={{
          width: '19px',
          height: '19px',
          margin: '0 2px',
          overflow: 'visible',
          transform: 'scaleX(1.22)',
          transformOrigin: 'center',
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
