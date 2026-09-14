// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { Check } from 'styled-icons/bootstrap';
import MediaQuery from 'react-responsive';
import { isDesktop, isMobile } from 'react-device-detect';
import styled, { css } from 'styled-components';

import { useCustomizationStateValue } from '../../../../../../context/customize';

import bg from '../../../../../../assets/images/customize-tool/png-bg.png';
import Magnifier from './Magnifier';
import ColorWheel from '../../ColorWheel';
import { rgbToHex } from '../../../../../../utils/colorConvertors';
import LayersPicker from '../../../LayersPicker';
import { useUserProvider } from '../../../../../../context/user';
import MobileLayerControls from '../../../LayerControls';
import {
  cocoBold,
  cocoRegular,
  noTablet,
} from '../../../../../../styles/constants';
import ZoomControls from './ZoomControls';

interface Props {
  url: any;
  close: () => void;
  designs: any;
  setSelectedLayer: any;
  mobileChangesApply: any;
  resetLayerSelection: any;
}

const UploadImageModal = ({
  url,
  close,
  designs,
  setSelectedLayer,
  mobileChangesApply,
  resetLayerSelection,
}: Props) => {
  const image = useRef<any>(new Image());
  const mainCanvas = useRef<any>(null);

  const windowW = window.innerWidth;
  const windowH = window.innerHeight;

  const canvW =
    window.innerWidth <= 768
      ? (window.innerWidth * 95) / 100
      : (window.innerWidth * 65) / 100;

  const canvH =
    window.innerWidth <= 768
      ? (window.innerHeight * 48) / 100
      : (window.innerHeight * 90) / 100;

  const DRAW_POS = [canvW / 2, canvH / 2];
  const MAX_ZOOM = 2;
  const MIN_ZOOM = !isMobile ? 0.4 : 0.1;
  const ZOOM_STEP = 0.1;
  const MOUSE_POS = [0, 0];
  const DEFAULT_ZOOM = !isMobile ? 0.4 : 0.1;

  const [scale, setScale] = useState<number>(DEFAULT_ZOOM);
  const [drawPos, setDrawPos] = useState<any[]>(DRAW_POS);
  const [mousePos, setMousePos] = useState<any[]>(MOUSE_POS);
  const [isMouseDown, toggleMouseDown] = useState<boolean>(false);
  const [isPickerActive, togglePicker] = useState<boolean>(true);

  const [isGlass, toggleGlass] = useState<boolean>(false);
  const [magnifyData, setMagnifyDataData] = useState<any>({
    top: 0,
    left: 0,
    colorGrid: [],
  });
  const [pickedColors, setPickedColors] = useState<any>([]);
  const [selectedColor, setSelectedColor] = useState<string>('#fff');
  const [isColorPicked, setColorPickInfo] = useState<boolean>(false);

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: {
      colorPickersData: {
        imagePicker: {
          pickBtn,
          cancelBtn,
          colorTitle,
          mobilePick,
          finishLayers,
          mobileColorTitle,
        },
      },
    },
  } = languages[currentLanguage];

  const {
    state: {
      currentDesign: { selectedLayerId },
    },
    dispatch,
  } = useCustomizationStateValue();

  useEffect(() => {
    image.current.addEventListener('load', () => {
      drawImage(DEFAULT_ZOOM, DRAW_POS);
    });

    image.current.src = url;

    const projection: any = document.getElementById('image-projection');
    if (projection) projection.style.display = 'none';

    if (isMobile) mobileChangesApply();

    return () => {
      if (projection) projection.style.display = 'block';
    };
  }, []);

  const closeHandler = () => {
    close();
    resetLayerSelection();
  };

  const pickBtnHandler = () => {
    const newData = {
      id: selectedLayerId,
      color: selectedColor,
    };

    const updated = [...pickedColors];

    const i = updated.findIndex(({ id }) => id === selectedLayerId);

    if (i === -1) updated.push(newData);
    else updated[i] = newData;

    setPickedColors(updated);
    setColorPickInfo(true);
  };

  const finishHandler = () => {
    dispatch({
      type: 'UPDATE_CHANGED_COLORS',
      payload: pickedColors,
    });

    closeHandler();
  };

  const getCanvasData = () => ({
    c: mainCanvas.current,
    w: mainCanvas.current.width,
    h: mainCanvas.current.height,
    ctx: mainCanvas.current.getContext('2d'),
  });

  const clearCanvas = () => {
    const { w, h, ctx } = getCanvasData();

    ctx.fillStyle = isMobile ? '#000' : '#fff';
    ctx.fillRect(0, 0, w, h);
  };

  const drawImage = (sc: number, pos: any[]) => {
    const { ctx } = getCanvasData();
    const { width: imageW, height: imageH } = image.current;

    const desktopAdjustmentValue = isDesktop ? 1.5 : 1;

    const w = imageW * sc * desktopAdjustmentValue;
    const h = imageH * sc * desktopAdjustmentValue;

    const x = pos[0] - w / 2;
    const y = pos[1] - h / 2;

    ctx.drawImage(image.current, x, y, w, h);
  };

  function getElementPosition(obj: any) {
    let top: number = 0;
    let left: number = 0;

    const { offsetTop, offsetLeft, offsetParent } = obj || {};

    if (offsetParent) {
      do {
        top += offsetTop;
        left += offsetLeft;
      } while (obj === offsetParent);

      return { x: left, y: top };
    }

    return {
      x: 200,
      y: 200,
    };
  }

  const getCursorCoordinates = (e: any) => {
    let pageX: number = 0;
    let pageY: number = 0;

    if (isMobile && e?.touches && e.touches[0]) {
      pageX = e.touches[0].pageX;
      pageY = e.touches[0].pageY;
    }

    if (!isMobile) {
      pageX = e.pageX;
      pageY = e.pageY;
    }

    return {
      pageX,
      pageY,
    };
  };

  function getCursorEventLocation(element: any, event: any) {
    const pos: any = getElementPosition(element);
    const { pageX, pageY } = getCursorCoordinates(event);

    if (pageX && pageY) {
      return {
        x: pageX - pos.x,
        y: pageY - pos.y,
      };
    }

    return {
      x: 200,
      y: 200,
    };
  }

  const handleEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    toggleGlass(true);
  };

  const handleLeave = () => {
    toggleGlass(false);
  };

  const handleClick = () => {
    const data = magnifyData.colorGrid.reverse();
    if (data.length && data[4] && data[4][4]) {
      const [r, g, b] = data[4][4].color.split(',');
      const hex = `000000${rgbToHex(r, g, b)}`.slice(-6);

      setSelectedColor(`#${hex}`);
    } else {
      setSelectedColor(`#000000`);
    }
  };

  const zoomIn = () => {
    if (scale < MAX_ZOOM) {
      const newScale = +(scale + ZOOM_STEP).toFixed(1);
      setScale(newScale);
      clearCanvas();
      drawImage(newScale, drawPos);
    }
  };

  const zoomOut = () => {
    if (scale > MIN_ZOOM) {
      const newScale = +(scale - ZOOM_STEP).toFixed(1);
      setScale(newScale);
      clearCanvas();
      drawImage(newScale, drawPos);
    }
  };

  const wheelZoom = (e: any) => {
    const scaleBy = 1.1;
    const oldScale = scale;

    const { pageX, pageY } = getCursorCoordinates(e);

    const mousePointTo = {
      x: (pageX - drawPos[0]) / oldScale,
      y: (pageY - drawPos[1]) / oldScale,
    };

    const newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    if (newScale > 0.4 && newScale <= 4) {
      const newDrawPos = [
        pageX - mousePointTo.x * newScale,
        pageY - mousePointTo.y * newScale,
      ];

      setScale(newScale);
      setDrawPos(newDrawPos);

      clearCanvas();
      drawImage(newScale, newDrawPos);
    }
  };

  const setMouseDown = (e: any) => {
    const { pageX, pageY } = getCursorCoordinates(e);

    toggleMouseDown(true);
    setMousePos([pageX, pageY]);
  };

  const setMouseUp = () => {
    toggleMouseDown(false);
  };

  const touchEndHandler = () => {
    handleLeave();
    handleClick();
  };

  const preventHandler = (e: any) => {
    e.preventDefault();
  };

  const posChangeHandler = (e: any) => {
    if (isMouseDown) {
      const { pageX, pageY } = getCursorCoordinates(e);

      const delta = [pageX - mousePos[0], pageY - mousePos[1]];
      const newDrawPos = [drawPos[0] + delta[0], drawPos[1] + delta[1]];

      setDrawPos(newDrawPos);
      setMousePos([pageX, pageY]);

      clearCanvas();
      drawImage(scale, newDrawPos);
    }
  };

  const moveHandler = (e: any) => {
    try {
      const canvas = mainCanvas.current;
      const context = canvas.getContext('2d');
      const eventLocation: any = getCursorEventLocation(canvas, e);

      const { x, y } = eventLocation;

      const x1 = x - 4;
      const y1 = y - 4;

      const colorData: any = [[], [], [], [], [], [], [], [], []];

      let c1 = 0;
      let c2 = 0;

      let globalIndex = 0;

      for (let i = x1; c1 <= 8; i += 1) {
        for (let j = y1; c2 <= 8; j += 1) {
          const { data } = context.getImageData(i, j, 1, 1);
          const color = `${data[0]},${data[1]},${data[2]}`;
          colorData[c1][c2] = { id: globalIndex, color };

          c2 += 1;
          globalIndex += 1;
        }

        c1 += 1;
        c2 = 0;
      }

      c1 = 0;
      globalIndex = 0;

      const { pageX, pageY } = getCursorCoordinates(e);
      const top: number = isMobile ? pageY - 80 : pageY;
      const left: number = isMobile ? pageX - 80 : pageX;

      setMagnifyDataData({
        top: `${top}px`,
        left: `${left}px`,
        colorGrid: colorData.reverse(),
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  const style = { cursor: isPickerActive ? 'crosshair' : 'move' };

  let imgProportionCof = 1;

  if (windowW <= 375) imgProportionCof = 1.8;
  if (windowW > 375 && windowW <= 768) imgProportionCof = 1.3;
  if (windowW > 768) imgProportionCof = 0.6;

  const onWheel = !isPickerActive ? wheelZoom : undefined;
  const onMouseEnter = isPickerActive ? handleEnter : undefined;
  const onMouseLeave = isPickerActive ? handleLeave : undefined;
  const onMouseClick = isPickerActive ? handleClick : undefined;
  const onCursorMove = isPickerActive ? moveHandler : posChangeHandler;
  const onTouchStart = isPickerActive ? handleEnter : setMouseDown;
  const onTouchEnd = isPickerActive ? touchEndHandler : setMouseUp;

  return (
    <Container bgUrl={bg} heightValue={windowH}>
      <ImagePreview>
        <canvas
          ref={mainCanvas}
          style={style}
          width={canvW}
          height={canvH}
          onWheel={onWheel}
          onMouseUp={setMouseUp}
          onMouseDown={setMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseMove={(e: any) => {
            onCursorMove(e);
          }}
          onMouseLeave={onMouseLeave}
          onClick={onMouseClick}
          onTouchStart={onTouchStart}
          onTouchMove={(e: any) => {
            onCursorMove(e);
          }}
          onTouchEnd={onTouchEnd}
          onContextMenu={preventHandler}
        />

        <Magnifier magnifyData={magnifyData} isMagnifier={isGlass} />

        <ZoomControls
          isPickerActive={isPickerActive}
          resetZoom={() => {
            togglePicker(false);
          }}
          singleZoomIn={zoomIn}
          singleZoomOut={zoomOut}
          togglePicker={togglePicker}
        />
      </ImagePreview>

      <Controls>
        <MediaQuery query="(min-width: 1024px)">
          <ChromePickerWrapper>
            <ColorWheel
              hideButtons
              blockColorChange
              initialColor={selectedColor}
              getHexValue={setSelectedColor}
            />
          </ChromePickerWrapper>

          <Title>{colorTitle}</Title>
        </MediaQuery>

        <MediaQuery query="(max-width: 1023px)">
          <Title>{mobileColorTitle}</Title>
        </MediaQuery>

        <ColorPreview bgUrl={selectedColor} />

        <ConfirmPick onClick={pickBtnHandler}>
          {!isMobile && <Check />}
          <span>{isMobile ? mobilePick : pickBtn}</span>
        </ConfirmPick>

        <LayersWrapper>
          <LayersPicker
            designs={designs}
            withTitle={false}
            pickedColors={pickedColors}
            imgProportionCof={imgProportionCof}
            setSelectedLayer={setSelectedLayer}
          />
        </LayersWrapper>

        <MediaQuery query="(min-width: 1024px)">
          <ButtonsWrapper>
            <CancelButton onClick={close}>{cancelBtn}</CancelButton>
            <DoneButton disabled={!isColorPicked} onClick={finishHandler}>
              {finishLayers}
            </DoneButton>
          </ButtonsWrapper>
        </MediaQuery>

        <MediaQuery query="(max-width: 1023px)">
          <MobileLayerControls
            isFixed={true}
            isImagePickerControls
            doneHandler={finishHandler}
            cancelHandler={closeHandler}
          />
        </MediaQuery>
      </Controls>
    </Container>
  );
};

export default UploadImageModal;

const Container = styled.div<{ bgUrl?: any; heightValue?: any }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: ${({ heightValue }) => `${heightValue}px`};
  background-color: #000;
  background-image: none;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    background-image: ${({ bgUrl }) => `url(${bgUrl})`};
    background-position: left;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
  max-height: 50%;
  padding: 10px 0;

  canvas {
    user-select: none !important;
    touch-action: none;
    border: 1px solid grey;
    border-radius: 10px;
  }

  @media (min-width: 1024px) {
    width: 70%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;

    > canvas {
      user-select: none !important;
      touch-action: none;
      border: none;
    }
  }
`;

const Controls = styled.div`
  justify-content: flex-start;
  width: 100%;
  height: 50%;
  padding: 10px 10px 0 10px;
  border-radius: 0;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 30%;
    height: 100%;
    padding: 20px;
    background-color: #000;
    border-radius: 20px 0 0 20px;
  }
`;

const ChromePickerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40%;

  > div > div:last-child {
    width: 100%;
    grid-template-columns: 0.3fr 1fr;
  }
`;

const Title = styled.h3`
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  color: #f7f7f7;
  user-select: none;
  ${cocoBold};
  font-size: calc(0.3em + 1vmin);

  @media ${noTablet} {
    margin-bottom: 2%;
  }
`;

const ColorPreview = styled.div<{ bgUrl: string }>`
  width: 100%;
  padding: 3.5%;
  margin-bottom: 1%;
  background-color: ${({ bgUrl }) => bgUrl};
  border-radius: 50px;
  user-select: none;
`;

const btnStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  text-transform: uppercase;
  cursor: pointer;
  ${cocoRegular};
  border-radius: 50px;
  user-select: none;
  font-size: calc(0.35em + 1vmin);
`;

const ConfirmPick = styled.button`
  ${btnStyles};
  width: 100%;
  padding: 2%;
  margin-bottom: 1%;
  border: 2px solid #31cd48;
  color: #31cd48;
  background-color: transparent;

  > svg {
    height: 3.8vh;

    path {
      fill: #31cd48;
    }
  }

  @media (min-width: 1024px) {
    padding: 1% 0;

    & > span {
      font-size: 10px;
    }

    &:hover {
      color: #f7f7f7;
      background-color: #31cd48;

      svg {
        path {
          fill: #f7f7f7;
        }
      }
    }
  }
`;

const LayersWrapper = styled.div`
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CancelButton = styled.button`
  ${btnStyles};
  width: 48%;
  padding: 2% 0;
  border: 2px solid #ff453a;
  color: #ff453a;
  background-color: transparent;

  &:hover {
    color: #f7f7f7;
    background-color: #ff453a;
  }
`;

const DoneButton = styled.button`
  ${btnStyles};
  width: 48%;
  padding: 2% 0;
  border: 2px solid #3e6ae1;
  color: #f7f7f7;
  background-color: #3e6ae1;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
