// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import moment from 'moment-timezone';
import { DialogTitle as DialogTitle } from '@mui/material';
import { Fade, Stack, Typography } from '@mui/material';

import { Close as CloseIcon } from '@mui/icons-material';

import { useMediaQuery as useMediaQuery } from '@mui/material';
import LoginFrom from './LoginForm';
import RegisterFrom from './RegisterForm';
import WelcomeTitle from './WelcomeTitle';
import RegisterFinish from './RegisterFinish';

import { useUserProvider } from '../../context/user';
import BlackFridayBgMobile from '../../assets/images/mocks/bf2024_mobile.jpeg';
import BlackFridayBgDesktop from '../../assets/images/mocks/bf2024.jpeg';
import { cocoRegular, noDesktop } from '../../styles/constants';

function isBeforeNovember24_18hrsAmsterdam() {
  const currentDateTime = moment().tz('Europe/Amsterdam');
  const targetDateTime = moment.tz(
    `${currentDateTime.year()}-11-24T18:00:00`,
    'Europe/Amsterdam',
  );

  return currentDateTime.isBefore(targetDateTime);
}

export default function SpecialEvent() {
  const isMobile = useMediaQuery('(max-width:767px)');

  const router = useHistory();

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    specialEvents: { blackFriday },
  } = languages[currentLanguage];
  const { registration } = blackFriday;

  const defaultComponent = isBeforeNovember24_18hrsAmsterdam()
    ? 'welcome'
    : 'login';

  const [currentComponent, setComponent] =
    React.useState<string>(defaultComponent);

  const closeHandler = () => {
    if (currentComponent === 'register') setComponent('welcome');
    else router.push('/');
  };

  const changeCurrentComponentHandler = (name: string) => {
    setComponent(name);
  };

  return (
    <Wrapper>
      {currentComponent === 'welcome' && (
        <WelcomeTitle
          changeCurrentComponentHandler={changeCurrentComponentHandler}
        />
      )}

      <Fade key={currentComponent} in={currentComponent !== 'welcome'}>
        <FormContainer isHidden={currentComponent === 'welcome'}>
          <DialogTitle
            sx={{
              pt: '0.2rem',
              pr: '0.2rem',
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {currentComponent !== 'welcome' && (
              <CloseIcon onClick={closeHandler} sx={{ cursor: 'pointer' }} />
            )}
          </DialogTitle>

          <Stack
            width="100%"
            display="flex"
            alignItems="center"
            flexDirection="column"
            margin={currentComponent === 'finish' ? 'auto' : 0}
            padding="0 2rem 0 2rem"
            justifyContent="center"
          >
            {currentComponent === 'register' && (
              <RegisterFrom
                changeCurrentComponentHandler={changeCurrentComponentHandler}
              />
            )}

            {currentComponent === 'finish' && <RegisterFinish />}

            {currentComponent === 'login' && <LoginFrom />}
          </Stack>

          {currentComponent === 'register' && (
            <Typography
              variant="body1"
              sx={{
                mt: 'auto',
                ...cocoRegular,
                color: '#4c4c4c',
                fontSize: isMobile ? '0.6rem' : '0.75rem',
              }}
            >
              {registration.form.paragraph}
            </Typography>
          )}
        </FormContainer>
      </Fade>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  resize: both;
  background: url(${BlackFridayBgMobile});
  backdrop-filter: blur(15px) saturate(150%);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (min-width: 1200px) {
    background: url(${BlackFridayBgDesktop});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    resize: both;
  }
`;

const FormContainer = styled.div<{ isHidden: boolean }>`
  display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
  background-color: #ffff;
  min-width: 20vw;
  min-height: 20vh;

  @media (${noDesktop}) {
    min-width: 90vw;
    max-width: 90vw;
  }
`;
