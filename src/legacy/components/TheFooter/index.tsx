// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { useLocation } from 'react-router';

import { useUserProvider } from '../../context/user';

import Feedback from './Feedback';
import DropDown from './MobileDropDown';
import Payments from '../common/Payments';
import NewsLetter from './NewsLetter';
import SocialMedia from '../SocialMedia/index';
import FooterBottom from './FooterBottom';
import { FooterList } from './FooterList';
import {
  black,
  white,
  desktop,
  lessWhite,
  noDesktop,
} from '../../styles/constants';

export default function Footer() {
  const { pathname } = useLocation();

  const isCustomizePage = pathname.includes('product-customize');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { Footer: FooterProvider } = languages[currentLanguage];
  const {
    jorcustom,
    general: generalProvider,
    customerService,
  } = FooterProvider;

  const serviceList = [
    {
      title: customerService.titleList.faq,
      link: '/faq',
      relative: true,
    },
    {
      title: customerService.titleList.order,
      link: '/bestellen',
      relative: true,
    },
    {
      title: customerService.titleList.send,
      link: '/verzenden',
      relative: true,
    },
    {
      title: customerService.titleList.pay,
      link: '/betalen',
      relative: true,
    },
    {
      title: customerService.titleList.raturns,
      link: '/retouren',
      relative: true,
    },
  ];
  const general = [
    {
      title: generalProvider.titleList.privacyPolicy,
      link: '/privacybeleid',
      relative: true,
    },
    {
      title: generalProvider.titleList.cookiePolicy,
      link: '/cookiebeleid',
      relative: true,
    },
    {
      title: `${generalProvider.titleList.general} ${generalProvider.titleList.conditions}`,
      link: '/algemene-voorwaarden',
      relative: true,
    },
  ];
  const JorCustom = [
    {
      title: jorcustom.titleList.ourStory,
      link: '/ons-verhaal',
      relative: true,
    },
    {
      title: jorcustom.titleList.mediaAmbassadors,
      link: '/media-ambassadeurs',
      relative: true,
    },
    {
      title: jorcustom.titleList.career,
      link: '/carriere',
      relative: true,
    },
    {
      title: jorcustom.titleList.contact,
      link: '/contact',
      relative: true,
    },
  ];

  if (isCustomizePage) return null;

  return (
    <>
      <MediaQuery query={noDesktop}>
        <MobileContainer>
          <SocialMedia iconColor={lessWhite} />

          <NewsLetter />

          <DropDownWrapper>
            <DropDown title={customerService.title} list={serviceList} />

            <DropDown title={jorcustom.title} list={JorCustom} />

            <DropDown title={generalProvider.title} list={general} />
          </DropDownWrapper>

          <Feedback withReviewIcon />

          <Payments />

          <FooterBottom />
        </MobileContainer>
      </MediaQuery>

      <MediaQuery query={desktop}>
        <DesktopWrapper>
          <DesktopContainer>
            <DesktopNewsWrapper>
              <NewsLetter />

              <SocialMedia iconColor={white} />

              <Payments />
            </DesktopNewsWrapper>

            <DesktopListsWrapper>
              <FooterList title={customerService.title} list={serviceList} />

              <FooterList title={jorcustom.title} list={JorCustom} />

              <FooterList title={generalProvider.title} list={general} />

              <Feedback />
            </DesktopListsWrapper>
          </DesktopContainer>

          <FooterBottom />
        </DesktopWrapper>
      </MediaQuery>
    </>
  );
}

const MobileContainer = styled.div`
  padding: 11px;
  background-color: ${black};
`;

const DesktopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${black};
`;

const DesktopContainer = styled.div`
  display: grid;
  grid-column-gap: 10%;
  grid-template-columns: 25% 65%;
  padding: 2rem 11px 3rem 11px;
`;

const DesktopNewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const DesktopListsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 1.5rem 0;
`;
