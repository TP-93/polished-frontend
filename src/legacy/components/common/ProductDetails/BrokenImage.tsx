// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { BrokenImage } from 'styled-icons/material';

const BrokenImageWrapper = () => {
  return (
    <BrokenImageContainer>
      <BrokenImageIcon />
    </BrokenImageContainer>
  );
};

export default BrokenImageWrapper;

const BrokenImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;

const BrokenImageIcon = styled(BrokenImage)`
  width: 40%;
  height: 40%;
`;
