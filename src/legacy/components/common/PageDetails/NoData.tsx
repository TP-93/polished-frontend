// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
}

export default function NoData({ title }: Props) {
  return <Container>{title}...</Container>;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 13vh);
  font-size: calc(0.5em + 1vmin);
  text-align: center;
  font-weight: 400;
  font-family: Coco Gothic;
`;
