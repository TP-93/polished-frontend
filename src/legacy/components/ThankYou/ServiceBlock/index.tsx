// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { Container } from 'styled-bootstrap-grid';
import { Link } from 'react-router-dom';
import { black, cocoBold, cocoRegular, pink } from '../../../styles/constants';
import SocialMedia from '../../SocialMedia';
import { useUserProvider } from '../../../context/user';

const ServiceBlock = () => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { ThankYou } = languages[currentLanguage];
  const {
    serviceBlock: { serviceBox1, serviceBox2, customLink },
  } = ThankYou;

  return (
    <ServiceBlockWrapper>
      <ServiceTitle>{serviceBox1.title}</ServiceTitle>
      <Paragraph>{serviceBox1.paragraph}</Paragraph>
      <SocialContainer>
        <SocialMedia iconColor={black} />
      </SocialContainer>
      <ServiceTitle>{serviceBox2.title}</ServiceTitle>
      <Paragraph>{serviceBox2.paragraph}</Paragraph>
      <div>
        <Arrow>{'> '}</Arrow>
        <CustomLink to="/faq">{customLink}</CustomLink>
      </div>
    </ServiceBlockWrapper>
  );
};

const ServiceBlockWrapper = styled(Container)`
  margin-top: 40px;
  text-align: center;
`;

const ServiceTitle = styled.h3`
  ${cocoBold};
  color: ${black};
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;
  margin-top: 0;
`;

const Paragraph = styled.p`
  ${cocoRegular};
  font-size: 12px;
  color: ${black};
  text-align: center;
  text-transform: uppercase;
  line-height: 22px;
  margin-top: 0;
`;

const Arrow = styled.span`
  ${cocoRegular};
  color: ${pink};
  font-size: 22px;
`;

const CustomLink = styled(Link)`
  ${cocoRegular};
  font-size: 12px;
  color: ${pink};
  text-transform: uppercase;
  text-decoration: underline;
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

export default ServiceBlock;
