// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { isMobile } from 'react-device-detect';
// @ts-ignore
import * as colorHelper from 'react-color/lib/helpers';
// @ts-ignore
import {
  Hue,
  ColorWrap,
  Saturation,
  EditableInput,
} from 'react-color/lib/components/common';

import { useCustomizationStateValue } from '../../../../../context/customize';

import { cocoRegular, iphone7Width } from '../../../../../styles/constants';


interface Props {
  rgb: any;
  hex: any;
  hsv: any;
  hsl: any;
  onChange: any;
  colorInfo: any;
  hideButtons: any;
  getHexValue: any;
  blockColorChange?: boolean;
}

const Wheel = ({
  rgb,
  hex,
  hsv,
  hsl,
  onChange,
  colorInfo,
  hideButtons,
  getHexValue,
  blockColorChange,
}: Props) => {
  const windowW = window.innerWidth;

  const [isFocus, toggleFocus] = useState<boolean>(false);
  const [isRendered, setRender] = useState<boolean>(false);

  const { state, dispatch } = useCustomizationStateValue();

  const {
    currentDesign: { selectedLayerId },
  } = state;

  useEffect(() => {
    setRender(true);
  }, []);

  useEffect(() => {
    if (getHexValue) getHexValue(hex);

    if (isRendered && hex !== colorInfo) {
      if (windowW <= 768) {
        dispatch({
          type: 'ADD_HOVER_COLOR',
          payload: { id: selectedLayerId, color: hex },
        });
      }

      if (windowW > 768 && !blockColorChange) {
        dispatch({
          type: 'CHANGE_LAYER_COLOR',
          payload: hex,
        });
      }
    }
  }, [hex]);

  const inputChangeHandler = (data: any, e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (data.hex) {
      if (colorHelper.isValidHex(data.hex)) {
        onChange(
          {
            hex: data.hex,
            source: 'hex',
          },
          e,
        );
      }
    } else if (data.r || data.g || data.b) {
      onChange(
        {
          r: data.r || rgb.r,
          g: data.g || rgb.g,
          b: data.b || rgb.b,
          a: rgb.a,
          source: 'rgb',
        },
        e,
      );
    } else if (data.a) {
      if (data.a < 0) {
        // eslint-disable-next-line no-param-reassign
        data.a = 0;
      } else if (data.a > 100) {
        // eslint-disable-next-line no-param-reassign
        data.a = 100;
      }
      // eslint-disable-next-line no-param-reassign
      data.a /= 100;

      onChange(
        {
          h: hsl.h,
          s: hsl.s,
          l: hsl.l,
          a: data.a,
          source: 'rgb',
        },
        e,
      );
    }
  };

  const clickOutsideFormHandler = (e: any) => {
    if (windowW < 1024) {
      e.stopPropagation();

      const projection: any = document.getElementById('image-projection');

      const {
        target: { localName: name },
      } = e;

      if (!isFocus && name === 'input') {
        projection.style.display = 'none';

        toggleFocus(true);
      }

      if (isFocus && name !== 'input') {
        projection.style.display = 'block';

        toggleFocus(false);
      }
    }
  };

  return (
    <>
      <SaturationWrapper>
        <Saturation hsl={hsl} hsv={hsv} onChange={onChange} />
      </SaturationWrapper>

      <HueWrapper>
        <Hue hsl={hsl} onChange={onChange} onTouchStart={onChange} />
      </HueWrapper>

      <ControlsWrapper
        isFocus={isFocus}
        onClick={isMobile ? clickOutsideFormHandler : undefined}
      >
        <ControlsContainer hideButtons={hideButtons}>
          <HexWrapper>
            <EditableInput
              label="hex"
              value={hex.replace('#', '')}
              onChange={inputChangeHandler}
            />
          </HexWrapper>

          <RgbWrapper>
            <EditableInput
              label="r"
              value={rgb.r}
              onChange={inputChangeHandler}
            />
            <EditableInput
              label="g"
              value={rgb.g}
              onChange={inputChangeHandler}
            />
            <EditableInput
              label="b"
              value={rgb.b}
              onChange={inputChangeHandler}
            />
          </RgbWrapper>

          {!hideButtons && <ColorPreview bgColor={hex} />}

          {isFocus && <DoneBtn>Done</DoneBtn>}
        </ControlsContainer>
      </ControlsWrapper>
    </>
  );
};

export default ColorWrap(Wheel);

const SaturationWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 70%;
  touch-action: none;

  > * {
    user-select: none !important;
  }

  > div > div {
    > div:last-child {
      > div {
        width: 20px !important;
        height: 20px !important;
      }
    }
  }

  @media (min-width: 1024px) {
    min-height: 75%;
  }

  @media ${iphone7Width} {
    min-height: 50%;
  }
`;

const HueWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 5%;

  > * {
    user-select: none !important;
  }

  > div > div > div {
    margin-top: 0 !important;
    height: 100% !important;
    > div {
      margin-top: 0 !important;
      height: 100% !important;
    }
  }
`;

const fixedStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  //z-index: 1000 !important;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-top: 35%;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #2c2c2e;
  touch-action: none !important;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div:first-child {
      width: auto;
      margin: 0 5% 20px 0;
    }

    > button {
      margin-top: 20px;
    }
  }
`;

const staticStyles = css`
  width: 100%;
  height: 10%;
`;

const ControlsWrapper = styled.div<{ isFocus: boolean }>`
  ${({ isFocus }) => (isFocus ? fixedStyles : staticStyles)};
`;

const ControlsContainer = styled.div<{ hideButtons: boolean }>`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: ${({ hideButtons }) =>
    hideButtons ? '1fr 2fr' : '0.7fr 2.3fr 1fr'};
`;

const inputStyles = css`
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row-reverse;

    > * {
      ${cocoRegular};
      font-size: calc(0.25em + 1vmin);
    }

    > input {
      width: 80%;
      outline: none;
      color: #979797;
      border: 2px solid #979797;
      background: none;
      border-radius: 50px;
      text-align: center;
      padding: 3% 0;
    }

    > label {
      padding: 0 5% 0 0;
      color: #979797;
      user-select: none !important;
    }
  }
`;

const HexWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  ${inputStyles};

  > div > label {
    padding: 0 5% 0 0;
  }
`;

const RgbWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${inputStyles};

  > div {
    width: 30%;
  }
`;

const ColorPreview = styled.div<{ bgColor: string }>`
  width: 100%;
  height: 100%;
  border-radius: 50px;
  user-select: none !important;
  background-color: ${({ bgColor }) => bgColor};
`;

const DoneBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  width: 27%;
  padding: 1.5%;
  cursor: pointer;
  background-color: #3e6ae0;
  color: #fff;
  border-radius: 50px;
  text-transform: uppercase;
  opacity: 0.85;
  user-select: none;
  ${cocoRegular};
  font-size: calc(0.4em + 1vmin);
`;
