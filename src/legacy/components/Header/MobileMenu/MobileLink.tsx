// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as Arrow } from '../../../assets/images/icons/arrows/check_icon_thin_black.svg.tsx';
import { cocoRegular, black, white } from '../../../styles/constants';

interface MenuLink {
  pathname: string;
  state: {
    title: string;
  };
}

interface Props {
  title: string;
  link?: MenuLink | string;
  onClick?: (value: boolean) => void;
  reverse?: boolean;
}

export default function MobileMenuLink({
  title,
  link = '#',
  onClick,
  reverse = false,
}: Props) {
  return (
    <Link
      to={link}
      onClick={() => {
        if (onClick) onClick(false);
      }}
    >
      <Box reverse={reverse}>
        {reverse && (
          <>
            <IconWrapper reverse={reverse}>
              <Arrow />
            </IconWrapper>
            <Title reverse={reverse}>{title}</Title>
          </>
        )}

        {!reverse && (
          <>
            <Title reverse={reverse}>{title}</Title>{' '}
            <IconWrapper reverse={reverse}>
              <Arrow />
            </IconWrapper>
          </>
        )}
      </Box>
    </Link>
  );
}

const Title = styled.h3<{ reverse: boolean }>`
  ${cocoRegular};
  width: 100%;
  padding: 18px 0;
  color: ${(p) => (p.reverse ? white : black)};
  text-align: ${(p) => (p.reverse ? 'center' : 'left')};
  text-transform: uppercase;
  align-self: center;
  font-size: 12px;
`;

const IconWrapper = styled.div<{ reverse: boolean }>`
  & svg {
    width: 20px;
    height: auto;
    transform: ${({ reverse }) =>
      reverse ? 'rotate(90deg)' : 'rotate(-90deg)'};

    path {
      fill: ${(p) => (p.reverse ? white : black)};
    }
  }
`;

const Box = styled.div<{ reverse: boolean }>`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  padding: 0 10px;
  text-align: center;
  vertical-align: middle;
  color: black;
  background-color: ${({ reverse }) => (reverse ? black : white)};
`;
