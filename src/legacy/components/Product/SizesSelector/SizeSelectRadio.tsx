// @ts-nocheck
import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';

import getDiagonalDeg from '../../../utils/hooks/getDiagonalDeg';
import { red, cocoRegular, noDesktop } from '../../../styles/constants';

interface Props {
  name: string;
  selected?: boolean;
  isSoldOut: boolean;
  stockMessage: any;
  setSelected: (size: string) => void;
  setInsufficientStock: (msg: any) => void;
}

const SizeSelectRadio = ({
  name,
  isSoldOut,
  selected = false,
  stockMessage,
  setSelected,
  setInsufficientStock,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [deg, setDeg] = useState('45deg');

  getDiagonalDeg(ref, setDeg);

  return (
    <Wrapper
      soldOut={isSoldOut}
      selected={selected}
      ref={ref}
      onClick={() => {
        if (isSoldOut) return null;
        setInsufficientStock(stockMessage);

        return setSelected(name);
      }}
    >
      <Box>
        {name}
        {isSoldOut && <Diagonal deg={deg} />}
      </Box>
    </Wrapper>
  );
};

export default SizeSelectRadio;

const fontColorStyles = css`
  color: #f7f7f7;
  background-color: #404040;
  cursor: pointer;
  border: 1px solid #606060;
  border-right: 0;
`;

const regularStyles = css`
  ${fontColorStyles};
`;

const disabledStyles = css`
  ${fontColorStyles};
  cursor: not-allowed;
  border: 1px solid ${red};
`;

const selectedStyles = css`
  ${fontColorStyles};
  background-color: #3e6ae1;
  border: 1px solid #3e6ae1;
`;

const Wrapper = styled.div<{ soldOut?: boolean; selected?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 4vh;
  max-height: 4vh;
  //height: 2.5vh;
  //min-height: 35px;
  //padding: 7px;
  //padding: 5px;
  //font-size: calc(0.35em + 1vmin);

  &:first-child {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  &:last-child {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  ${({ soldOut, selected }) => {
    if (soldOut) return disabledStyles;
    if (selected) return selectedStyles;

    return regularStyles;
  }}
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  //min-height: 4vh;
  //max-height: 4vh;
  //padding: 5px;
  ${cocoRegular};
  text-align: center;
  text-transform: uppercase;
  //font-size: calc(0.35em + 1vmin);

  font-size: calc(0.1em + 1vmin);

  @media ${noDesktop} {
    font-size: calc(0.35em + 1vmin);
    //font-size: calc(0.45em + 1vmin);
  }
`;

// font-size: calc(0.1em + 1vmin);
// @media ${noDesktop} {
//   font-size: calc(0.45em + 1vmin);
// }

const Diagonal = styled.div<{ deg: string }>`
  position: absolute;
  top: 50%;
  left: 0;
  transform: rotate(${(p) => p.deg});
  width: 110%;
  height: 2px;
  background-color: ${red};
`;
