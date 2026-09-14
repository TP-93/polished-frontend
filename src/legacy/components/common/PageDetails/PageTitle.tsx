// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import BackButton from '../Buttons/BackButton';
import { black, cocoBold, noDesktop } from '../../../styles/constants';

interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => {
  return (
    <PageTitleWrapper>
      <BackButton />
      <Title>{title}</Title>
    </PageTitleWrapper>
  );
};

export default PageTitle;

const PageTitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-content: start;
  padding: 20px;

  > button {
    color: #000;
    background-color: #fff;
    justify-content: flex-start;
  }

  @media ${noDesktop} {
    grid-template-columns: 1fr 3fr 1fr;
    padding: 30px 10px 20px 10px;

    & > h1 {
      font-size: 1rem;
    }
  }
`;

const Title = styled.h1`
  ${cocoBold};
  color: ${black};
  font-size: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  margin-top: 0;
`;
