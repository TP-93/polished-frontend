// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { white, cocoBold, noDesktop } from '../../../styles/constants';

interface Props {
  title: string;
}

export default ({ title }: Props) => (
  <Wrapper>
    {/* <BackgroundLine /> */}
    <Title>{title}</Title>
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 0 1rem 0;
  text-align: center;
  user-select: none;
`;

const Title = styled.h2`
  ${cocoBold};
  position: relative;
  font-size: 1rem;
  color: #050505;
  text-align: center;
  min-width: 26%;
  width: fit-content;
  z-index: 1;
  background-color: ${white};
  padding: 0;
  text-transform: uppercase;

  @media ${noDesktop} {
    padding: 0 8px;
  }
`;
