// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { cocoRegular, noTablet } from '../../../../../styles/constants';

interface Props {
  colorThemes: any;
  selectedColor: any;
  handleColorChange: any;
}

const RegularColors = ({
  colorThemes,
  selectedColor,
  handleColorChange,
}: Props) => (
  <Palettes>
    {colorThemes.map((palette: any) => {
      const { name, colors } = palette;

      if (name === 'Foil Colors') return <></>;

      return (
        <Palette key={name}>
          <Title>{name}</Title>

          <Colors>
            {colors.map((color: string, idx: number) => (
              <ColorWrapper
                key={color + idx}
                isActive={color === selectedColor}
                onClick={() => handleColorChange(color)}
              >
                <Color bg={color} isActive={color === selectedColor} />
              </ColorWrapper>
            ))}
          </Colors>
        </Palette>
      );
    })}
  </Palettes>
);

export default RegularColors;

const Palettes = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: inherit;
  overflow: auto;
  margin: auto;

  &::-webkit-scrollbar {
    display: block !important;
    border: none;
    border-radius: 50px;
    background-color: #8c8c8c;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: #505050;
  }
`;

const Palette = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1%;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.div`
  width: 15%;
  padding: 1.5%;
  text-align: center;
  border-radius: 50px;
  background-color: #1c1c1e;
  color: #f7f7f7;
  user-select: none;
  ${cocoRegular};
  font-size: calc(0.45em + 1vmin);
`;

const Colors = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 83%;
  height: 100%;
  overflow: auto hidden;
`;

const ColorWrapper = styled.div<{ isActive: boolean }>`
  position: ${({ isActive }) => (isActive ? 'relative' : 'static')};
  flex-basis: 10%;
  padding: 5px;

  @media ${noTablet} {
    left: -0.5%;
  }
`;

const Color = styled.div<{ bg: string; isActive: boolean }>`
  width: 35px;
  height: 35px;
  border: ${({ isActive }) =>
    isActive ? '3px solid #3C66D6' : '3px solid transparent'};
  border-radius: 50%;
  background-color: ${({ bg }) => bg};
  cursor: pointer;
  user-select: none !important;

  &:hover {
    transform: scale(1.1);
  }

  @media ${noTablet} {
    width: 25px;
    height: 25px;
  }
`;
