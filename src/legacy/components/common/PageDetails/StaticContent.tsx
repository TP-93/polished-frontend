// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { black, cocoRegular } from '../../../styles/constants';

export default ({ content }: { content: string }) => (
  <StaticContentComp dangerouslySetInnerHTML={{ __html: content }} />
);

const StaticContentComp = styled.div`
  & > * {
    padding: auto;
    margin: auto;
    box-sizing: content-box;
    ${cocoRegular};
    color: ${black};
  }
`;
