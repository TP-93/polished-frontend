// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import {
  platinum,
  cocoBold,
  grey,
  black,
  lessWhite,
  desktop,
} from '../../../styles/constants';
import { ReactComponent as ArrowIcon } from '../../../assets/images/icons/arrows/check_icon_thin_white.svg.tsx';

export default ({
  id,
  children,
  title,
  currentSection,
  changeSection,
}: {
  id: string;
  children: JSX.Element[] | JSX.Element;
  title: string;
  currentSection: string;
  changeSection: (id: string) => void;
}) => {
  const isOpen = currentSection === id;

  return (
    <Container>
      <Title
        isOpen={isOpen}
        onClick={() => {
          if (isOpen) changeSection('');
          else changeSection(id);
        }}
      >
        {title}
        <ArrowBox isOpen={isOpen}>
          <Arrow />
        </ArrowBox>
      </Title>
      {isOpen && <Content>{children}</Content>}
    </Container>
  );
};

const Container = styled.div`
  border-radius: 10px;
  position: relative;
  border: 1px solid ${platinum};
  margin-bottom: 20px;
`;

const Content = styled.div`
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;
`;

interface ElProps {
  isOpen: boolean;
}

const Title = styled.div`
  ${cocoBold};
  font-size: 14px;
  color: ${(p: ElProps) => (p.isOpen ? lessWhite : grey)};
  text-align: center;
  padding: 19px 0;
  border-bottom: 1px solid ${platinum};
  background-color: ${(p: ElProps) => (p.isOpen ? black : platinum)};
  transition: all 0.15s ease-in-out;
  position: relative;
  cursor: pointer;
  text-transform: capitalize;
  border-radius: 10px;
  text-transform: uppercase;

  @media ${desktop} {
    font-size: 18px;
  }
`;

const ArrowBox = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%)
    rotate(${(p: ElProps) => (p.isOpen ? '0deg' : '-180deg')});
  path {
    fill: ${(p: ElProps) => (p.isOpen ? lessWhite : grey)};
    transition: all 0.15s ease-in-out;
  }
  transition: all 0.15s ease-in-out;
`;

const Arrow = styled(ArrowIcon)`
  width: 20px;
  height: auto;
`;
