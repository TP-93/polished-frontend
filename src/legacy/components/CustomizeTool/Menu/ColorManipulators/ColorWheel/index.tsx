// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Wheel from './Wheel';

interface Props {
  initialColor: string;
  hideButtons: boolean;
  blockColorChange?: boolean;
  getHexValue?: (hexValue: string) => void;
}

const ColorWheelWrapper = ({
  initialColor,
  hideButtons,
  blockColorChange,
  getHexValue,
}: Props) => {
  const [colorInfo, setColorInfo] = useState<any>(initialColor);

  useEffect(() => {
    setColorInfo(initialColor);
  }, [initialColor]);

  const pointerEventHandler = (color: any) => {
    setColorInfo(color);
  };

  return (
    <ColorWheelContainer id="color-wheel-wrapper">
      <Wheel
        color={colorInfo}
        colorInfo={colorInfo}
        hideButtons={hideButtons}
        blockColorChange={blockColorChange}
        onChange={pointerEventHandler}
        getHexValue={getHexValue}
      />
    </ColorWheelContainer>
  );
};

export default ColorWheelWrapper;

const ColorWheelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-width: 100%;
  height: 100%;
`;
