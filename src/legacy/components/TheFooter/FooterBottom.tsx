// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { black, lessWhite, white } from '../../styles/constants';

export default function FooterBottom() {
  return (
    <FooterCopy>
      &copy; {new Date().getFullYear()}. JORCUSTOM. all rights reserved.
      Developed by
      <MadeBy href="https://sedna.software/"> SEDNA.software </MadeBy>
    </FooterCopy>
  );
}

const FooterCopy = styled.p`
  padding: 0.5rem 0;
  color: ${white};
  font-size: calc(0.1em + 1vmin);
  border-top: 1px solid #8e8e93;
  text-align: center;
  background: ${black};
  font-family: 'Coco Gothic', Arial, sans-serif;
  font-weight: normal;
`;

const MadeBy = styled.a`
  color: ${lessWhite};
  font-size: 12px;
  font-weight: normal;
  font-family: 'Coco Gothic', Arial, sans-serif;
`;
