// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { white, lightBlack } from '../../../styles/constants';
import { ReactComponent as ArrowLeft } from '../../../assets/images/icons/arrows/left_arrow_icon_white.svg.tsx';
import { ReactComponent as ArrowRight } from '../../../assets/images/icons/arrows/right_arrow_icon_white.svg.tsx';

export const VerticalArrowTop = ({ ...props }) => (
  <ArrowContainerTop {...props} className="" type="button" role="none">
    <ArrowImageLeft />
  </ArrowContainerTop>
);

export const VerticalArrowBottom = ({
  // currentSlide,
  // slideCount,
  ...props
}) => (
  <ArrowContainerBottom {...props} className="" type="button" role="none">
    <ArrowImageRight />
  </ArrowContainerBottom>
);

export const ArrowContainer = styled.button`
  position: absolute !important;
  width: 30px !important;
  height: 30px !important;
  border-radius: 50%;
  border: none !important;
  cursor: pointer;
  left: 50% !important;
  transform: translate(-50%, 0) !important;
  z-index: 1;
  background: ${lightBlack};
  padding: 0;
`;

const ArrowContainerTop = styled(ArrowContainer)`
  top: 0 !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
`;
const ArrowContainerBottom = styled(ArrowContainer)`
  bottom: 0 !important;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.6);
`;

const ArrowImageLeft = styled(ArrowLeft)`
  width: 7px;
  height: 21px;
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
  path {
    fill: ${white} !important;
  }
`;

const ArrowImageRight = styled(ArrowRight)`
  width: 7px;
  height: 21px;
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
  path {
    fill: ${white} !important;
  }
`;
