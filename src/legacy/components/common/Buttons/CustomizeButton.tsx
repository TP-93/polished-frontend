// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { useMediaQuery } from '@mui/material';
import { cocoRegular } from '../../../styles/constants';
import personalizeIcon from '../../../assets/images/customize-tool/customize_icon.png';

interface Props {
  text: string;
}

const CustomiseButton = ({ text }: Props) => {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <CustomizeButton>
      <CustomizeIcon src={personalizeIcon} alt="customize" />
      <span
        style={{ fontSize: isMobile ? '0.65rem' : '0.75rem', color: '#000' }}
      >
        {text}
      </span>
    </CustomizeButton>
  );
};

export default CustomiseButton;

const CustomizeButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: none;
  outline: none;
  background: none;
  ${cocoRegular};
`;

const CustomizeIcon = styled.img`
  width: 0.65rem;
  margin-right: 0.5rem;
`;
