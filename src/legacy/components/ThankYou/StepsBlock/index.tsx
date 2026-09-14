// @ts-nocheck
import React from 'react';
import { Col, Row } from 'styled-bootstrap-grid';
import styled from 'styled-components';
import PrintIcon from '../../../assets/images/icons/checkout/print_icon.svg.tsx';
import ShippingIcon from '../../../assets/images/icons/checkout/standard_shipping_icon.svg.tsx';
import Location from '../../../assets/images/icons/checkout/place_shipping.png';
import {
  black,
  cocoBold,
  cocoRegular,
  desktop,
} from '../../../styles/constants';
import { useUserProvider } from '../../../context/user';

const StepsBlock = () => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { ThankYou } = languages[currentLanguage];
  const {
    stepsBlock: { title, stepBox1, stepBox2, stepBox3 },
  } = ThankYou;

  return (
    <StepsBlockWrapper>
      <StepsBlockTitle>{title}</StepsBlockTitle>
      <Row>
        <Col md={8} mdOffset={2}>
          <Row>
            <Block md={4}>
              <Icon src={PrintIcon} />
              <BlockTitle>{stepBox1.title}</BlockTitle>
              <BlockText>{stepBox1.text}</BlockText>
            </Block>
            <Block md={4}>
              <Icon src={ShippingIcon} />
              <BlockTitle>{stepBox2.title}</BlockTitle>
              <BlockText>{stepBox2.text}</BlockText>
            </Block>
            <Block md={4}>
              <Icon src={Location} />
              <BlockTitle>{stepBox3.title}</BlockTitle>
              <BlockText>{stepBox3.text}</BlockText>
            </Block>
          </Row>
        </Col>
      </Row>
    </StepsBlockWrapper>
  );
};

const StepsBlockWrapper = styled.div`
  margin-top: 40px;
`;

const StepsBlockTitle = styled.h3`
  ${cocoBold};
  color: ${black};
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  margin-top: 0;

  @media ${desktop} {
    font-size: 14px;
    margin-bottom: 40px;
  }
`;

const Block = styled(Col)`
  display: flex;
  flex-direction: column;
`;

const Icon = styled.img`
  width: auto;
  height: 40px;
  margin: 0 auto 15px auto;
`;

const BlockTitle = styled.h4`
  ${cocoBold};
  color: ${black};
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;
  margin-top: 0;
`;

const BlockText = styled.p`
  ${cocoRegular};
  font-size: 12px;
  color: ${black};
  text-align: center;
  text-transform: uppercase;
  line-height: 22px;
  margin-top: 0;
`;

export default StepsBlock;
