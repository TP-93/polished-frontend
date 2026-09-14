// @ts-nocheck
import styled from 'styled-components';

import { noDesktop } from '../../styles/constants';
import { ReactComponent as Mail } from '../../assets/images/icons/socials/mail_icon_white.svg.tsx';
import { ReactComponent as Insta } from '../../assets/images/icons/socials/instagram_icon_white.svg.tsx';
import { ReactComponent as Facebook } from '../../assets/images/icons/socials/facebook_icon_white.svg.tsx';
import { ReactComponent as WhatsApp } from '../../assets/images/icons/socials/whatsapp_icon_white.svg.tsx';

const SocialMedia = ({ iconColor }: { iconColor: string }) => (
  <SocialContainer>
    <SocialLink
      aria-label="jorcustom"
      iconColor={iconColor}
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.instagram.com/jorcustom/"
    >
      <Insta />
    </SocialLink>

    <SocialLink
      aria-label="jorcustom"
      iconColor={iconColor}
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.facebook.com/JorCustom/"
    >
      <Facebook />
    </SocialLink>

    <SocialLink
      aria-label="jorcustom"
      iconColor={iconColor}
      target="_blank"
      rel="noopener noreferrer"
      href="https://wa.me/31683206218"
    >
      <WhatsApp />
    </SocialLink>

    <SocialLink
      aria-label="jorcustom"
      iconColor={iconColor}
      target="_blank"
      rel="noopener noreferrer"
      href="mailto:info@jorcustom.com"
    >
      <Mail />
    </SocialLink>
  </SocialContainer>
);

export default SocialMedia;

const SocialContainer = styled.div`
  margin-top: 2rem;

  @media ${noDesktop} {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 0;
    padding: 10px 10px 5px 10px;
  }
`;

const SocialLink = styled.a<{ iconColor: string }>`
  margin-right: 25px;

  path {
    fill: ${({ iconColor }) => iconColor};
  }

  &:last-of-type {
    margin-right: 0;
  }
`;
