// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { media } from 'styled-bootstrap-grid';
import MediaQuery from 'react-responsive';
import { ChevronLeft, ChevronRight } from 'styled-icons/fa-solid';
import {
  large,
  noLarge,
  white,
  darkGrey,
  noDesktop,
  lightBlack,
} from '../../../styles/constants';
import { ReactComponent as ArrowLeft } from '../../../assets/images/icons/arrows/left_arrow_icon_black.svg.tsx';
import { ReactComponent as ArrowRight } from '../../../assets/images/icons/arrows/right_arrow_icon_black.svg.tsx';

export const SlickArrowLeft = ({ ...props }) => (
  <ArrowContainerLeft
    {...props}
    className=""
    type="button"
    role="none"
    name="slide left"
    arial-label="previous slide"
  >
    <ArrowImageLeft />
  </ArrowContainerLeft>
);

export const SlickArrowRight = ({ ...props }) => (
  <ArrowContainerRight
    {...props}
    className=""
    type="button"
    role="none"
    name="slide right"
    arial-label="next slide"
  >
    <ArrowImageRight />
  </ArrowContainerRight>
);

export const ArrowContainer = styled.button`
  position: absolute !important;
  width: 60px !important;
  height: 60px !important;
  border-radius: 30px !important;
  background: ${lightBlack} !important;
  border: none !important;
  cursor: pointer;
  top: 50% !important;
  transform: translate(0, -50%) !important;
  z-index: 1;

  @media ${noDesktop} {
    width: 40px !important;
    height: 40px !important;
  }
`;

const ArrowContainerLeft = styled(ArrowContainer)`
  left: 30px !important;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.6);
  @media ${noDesktop} {
    left: 15px !important;
  }
`;
const ArrowContainerRight = styled(ArrowContainer)`
  right: 30px !important;
  box-shadow: -2px 2px 6px rgba(0, 0, 0, 0.6);
  @media ${noDesktop} {
    right: 15px !important;
  }
`;

const ArrowImageLeft = styled(ArrowLeft)`
  width: 12px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 48%;
  transform: translate(-50%, -50%);
  path {
    fill: ${white} !important;
  }
`;

const ArrowImageRight = styled(ArrowRight)`
  width: 12px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 52%;
  transform: translate(-50%, -50%);
  path {
    fill: ${white} !important;
  }
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  color: ${darkGrey};
  opacity: 0.5;

  ${media.lg`
    opacity: 1;
  `}
`;

const LeftArrow = styled(Arrow)`
  left: 0;
  z-index: 1;

  ${media.lg`
    padding-left: 44px;`}
`;

const RightArrow = styled(Arrow)`
  right: 0;

  ${media.lg`
    padding-right: 44px`}
`;

const iconSize = 20;
const iconSizeLg = 40;

export const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <LeftArrow onClick={onClick}>
    <MediaQuery query={noLarge}>
      <ChevronLeft size={iconSize} />
    </MediaQuery>
    <MediaQuery query={large}>
      <ChevronLeft size={iconSizeLg} />
    </MediaQuery>
  </LeftArrow>
);

export const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <RightArrow onClick={onClick}>
    <MediaQuery query={noLarge}>
      <ChevronRight size={iconSize} />
    </MediaQuery>
    <MediaQuery query={large}>
      <ChevronRight size={iconSizeLg} />
    </MediaQuery>
  </RightArrow>
);
