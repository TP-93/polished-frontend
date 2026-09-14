// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import MediaQuery from 'react-responsive';
import { isMobile } from 'react-device-detect';
// @ts-ignore
import PinchZoomPan from 'react-responsive-pinch-zoom-pan';

import {
  getDesignsForProduct_product_designs as DesignInterface,
  getDesignsForProduct_product_designs_layers as LayerInterface,
  getDesignsForProduct_product_designs_layers_options as OptionInterface,
} from '../../../apollo/queries/types/getDesignsForProduct';
import { useCustomizationStateValue } from '../../../context/customize';

import loadImage from '../../../utils/loadImage';
import { Rectangle } from '../../../interfaces/product';
import { noDesktop } from '../../../styles/constants';
import BackButton, { BackBtnWrapper } from '../../common/Buttons/BackButton';
import { Draw, DrawAndSave, LoadedImage, StepwiseDraw } from './interfaces';

interface Props {
  data: (DesignInterface | null)[] | null;
  imageGroups: any;
  newTextLayerApplyStatus: number;
  openSubmitModal: any;
  setNewTextLayerStatus: any;
}

export default ({
  data,
  imageGroups,
  newTextLayerApplyStatus,
  openSubmitModal,
  setNewTextLayerStatus,
}: Props) => {
  const slide = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<any>(null);

  const [cache, setCache] = useState<any>();
  const [index, setIndex] = useState<any>(0);
  const [slideSize, setSlideSize] = useState<any>();
  const [canvasSizes, setCanvasSizes] = useState<any>();
  const [alternative, setAlternative] = useState<any>('');

  const [scaleValue, setScale] = useState<any>(0.3);

  const sliderSettings: any = {
    dots: false,
    speed: 500,
    swipe: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const {
    state: {
      currentDesign: {
        hover,
        toggledLayers,
        changedLayersWithColor: originalChangedColors,
      },
      oldTextEditingSession,
      newTextEditingSession: {
        img: sessionImg,
        rect: sessionRect,
        status,
        layerId: sessionLayerId,
      },
      isChangesResetApplied,
    },
    dispatch,
  } = useCustomizationStateValue();

  const changedColors = Object.keys(originalChangedColors).map(
    (key: string) => ({
      key,
      color: originalChangedColors[key],
    }),
  );

  const changeProjectionHandler = () => {
    setIndex((prev: any) => {
      if (prev === 0) return prev + 1;
      if (prev === 1) return prev - 1;

      return 0;
    });
  };

  const setAlternativeHandler = () => {
    if (imageGroups.length > 0) {
      const group = imageGroups[0];

      if (group) {
        const { url, images } = imageGroups[0];

        const isFrontView = data && data[0]?.projection === 'front';
        const isBackView = data && data[0]?.projection === 'back';

        if (!images?.length) return setAlternative(url);

        if (index === 0 && isFrontView && images[1])
          return setAlternative(images[1]?.url);

        if (index === 0 && isBackView && images[0])
          return setAlternative(images[0]?.url);

        if (index === 1 && isFrontView && images[1])
          return setAlternative(images[0]?.url);

        if (index === 1 && isBackView && images[0])
          return setAlternative(images[1]?.url);
      }
    }

    return null;
  };

  useEffect(() => {
    setAlternativeHandler();
  }, [index]);

  useEffect(() => {
    if (sliderRef?.current) sliderRef.current.slickGoTo(index);
  }, [index]);

  const changeActiveLayer = (prevIndex: number, newIndex: number) => {
    if (data && data[newIndex]) {
      setIndex(newIndex);

      const design = data[newIndex];

      if (design) {
        dispatch({
          type: 'CHANGE_ACTIVE_DESIGN',
          payload: design.id,
        });
      }
    }
  };

  sliderSettings.beforeChange = changeActiveLayer;

  const getSlideSize = () => {
    if (slide?.current?.clientWidth) {
      const { innerWidth, innerHeight } = window;
      const { clientWidth, clientHeight } = slide.current;

      if (innerWidth < 1024) {
        const scale = Math.min(
          clientWidth / innerHeight,
          clientHeight / innerWidth,
        );

        const qualityCof = 2.2 * (innerWidth / clientWidth);

        setScale(scale);

        return setSlideSize({
          width: clientWidth * qualityCof,
          height: clientHeight * qualityCof,
        });
      }

      let scale = Math.max(
        clientWidth / innerWidth,
        clientHeight / innerHeight,
      );

      if (innerWidth >= 2560) scale *= 1.1;

      const qualityCofH = innerHeight / clientHeight;
      const qualityCofW = innerWidth / clientWidth;

      setScale(scale);

      return setSlideSize({
        width: clientWidth * qualityCofW,
        height: clientHeight * qualityCofH,
      });
    }

    return null;
  };

  useEffect(() => {
    getSlideSize();
  }, []);

  const getCanvasSize = (width: number, height: number) => {
    const canvasSize = { width, height, scale: 1 };
    const ratio = width / height;

    if (height / slideSize.height > width / slideSize.width) {
      canvasSize.scale = height / slideSize.height;
      canvasSize.width = slideSize.height * ratio;
      canvasSize.height = slideSize.height;
    } else {
      canvasSize.scale = width / slideSize.width;
      canvasSize.width = slideSize.width;
      canvasSize.height = slideSize.width / ratio;
    }

    return canvasSize;
  };

  const drawLayer = ({ img, cx, projection, rectangle, color }: Draw) => {
    const { x: x0, y: y0, width: w0, height: h0 } = rectangle;
    const { scale } = canvasSizes[projection];

    if (typeof x0 === 'number' && typeof y0 === 'number' && w0 && h0) {
      const resizedRectangle: Rectangle = {
        x: x0 / scale,
        y: y0 / scale,
        width: w0 / scale,
        height: h0 / scale,
      };

      const { x, y, width, height } = resizedRectangle;

      if (color) {
        const compositeCanvas = document.createElement('canvas');
        const compositeCx = compositeCanvas.getContext('2d');
        compositeCanvas.width = width;
        compositeCanvas.height = height;

        if (compositeCx === null) return;

        compositeCx.drawImage(img, 0, 0, width, height);
        compositeCx.globalCompositeOperation = 'source-in';
        compositeCx.fillStyle = color;
        compositeCx.fillRect(0, 0, width, height);

        cx.drawImage(compositeCanvas, x, y, width, height);
      }

      if (!color) cx.drawImage(img, x, y, width, height);
    }
  };

  const drawAndSaveLayer = ({
    id,
    cx,
    img,
    layerType,
    loaded,
    options,
    rectangle,
    projection,
  }: DrawAndSave) => {
    drawLayer({ img, cx, projection, rectangle });

    const { defaultColor } = options[0];

    if (layerType === 'toggle') {
      const toggleGroup: LoadedImage[] = [];

      options.forEach((option, i) => {
        if (i && option) {
          const { src, id: optionId, rectangle: optionRect } = option;

          if (src && optionId && optionRect) {
            loadImage(src).then((altImg) => {
              toggleGroup.push({
                cx,
                id: optionId,
                img: altImg,
                rectangle: optionRect,
                projection,
                defaultColor,
              });
            });
          }
        } else {
          toggleGroup.push({
            id,
            cx,
            img,
            rectangle,
            projection,
            defaultColor,
          });
        }
      });

      loaded.push({
        id,
        cx,
        img,
        rectangle,
        projection,
        toggleGroup,
        defaultColor,
        toggleGroupId: id,
      });
    }

    if (layerType !== 'toggle')
      loaded.push({ id, cx, img, projection, rectangle, defaultColor });
  };

  const drawLayersStepwise = ({
    i,
    cx,
    isLast,
    layers,
    loaded,
    projection,
  }: StepwiseDraw) => {
    const { layerType, options } = layers[i];

    if (options && layerType) {
      const firstOption = options[0];
      const notNullOptions: OptionInterface[] = [];

      options.forEach((option) => {
        if (option) notNullOptions.push(option);
      });

      if (firstOption) {
        const { id, src, rectangle } = firstOption;

        if (id && src && rectangle) {
          if (layers.length - 1 === i) {
            loadImage(src).then((img) => {
              drawAndSaveLayer({
                id,
                cx,
                img,
                layerType,
                loaded,
                rectangle,
                projection,
                options: notNullOptions,
              });

              if (isLast) setCache(loaded);
            });
          } else {
            loadImage(src).then(
              (img) => {
                drawAndSaveLayer({
                  id,
                  cx,
                  img,
                  layerType,
                  loaded,
                  rectangle,
                  projection,
                  options: notNullOptions,
                });
                drawLayersStepwise({
                  i: i + 1,
                  cx,
                  isLast,
                  layers,
                  loaded,
                  projection,
                });
              },
              () =>
                drawLayersStepwise({
                  i: i + 1,
                  cx,
                  isLast,
                  layers,
                  loaded,
                  projection,
                }),
            );
          }
        }
      }
    }
  };

  useEffect(() => {
    if (slideSize) {
      const newCanvasSizes: {
        [key: string]: {
          width: number;
          height: number;
          scale: number;
        };
      } = {};

      if (data) {
        data.forEach((design) => {
          if (design) {
            const { layers, projection } = design;

            if (layers && projection) {
              const firstLayer = layers.find((layer) => {
                if (layer) return layer.position === 1;
                return false;
              });

              if (firstLayer && firstLayer.options) {
                const firstOption = firstLayer.options[0];

                if (firstOption && firstOption.rectangle) {
                  const { width, height } = firstOption.rectangle;

                  if (width && height)
                    newCanvasSizes[projection] = getCanvasSize(width, height);
                }
              }
            }
          }
        });

        setCanvasSizes(newCanvasSizes);
      }
    }
  }, [slideSize, data]);

  useEffect(() => {
    if (isChangesResetApplied) {
      setCache(null);
      dispatch({ type: 'RESET_CHANGES', payload: false });
    }
  }, [isChangesResetApplied]);

  useEffect(() => {
    if (canvasSizes) {
      if (cache) {
        cache.forEach(
          ({
            id,
            cx,
            img,
            projection,
            rectangle,
            toggleGroup,
            toggleGroupId,
            defaultColor,
          }: LoadedImage) => {
            const match = changedColors.find(
              (layer: { [key: string]: string }) => +layer.key === id,
            );

            const hoverColor = hover[id];
            const matchColor = match?.color;
            const color = hoverColor || matchColor || defaultColor;
            const isValidStatus = status === 'open' || status === 'saving';

            if (toggleGroup && toggleGroupId && toggledLayers[toggleGroupId]) {
              const newLayer = toggleGroup.find(
                (option) => option.id === toggledLayers[toggleGroupId],
              );

              if (newLayer) drawLayer({ ...newLayer, color });
            } else if (isValidStatus && sessionLayerId === id) {
              drawLayer({
                cx,
                img: sessionImg,
                color,
                rectangle: sessionRect,
                projection,
              });
            } else {
              drawLayer({ cx, img, color, projection, rectangle });
            }
          },
        );
      }

      if (!cache && data) {
        const loaded: LoadedImage[] = [];

        data.forEach((design, i) => {
          if (design && design.projection && design.layers) {
            const { layers, projection } = design;

            const isLast = i === data.length - 1;

            const canvas = document.getElementById(
              projection,
            ) as HTMLCanvasElement;

            if (canvas === null) return;

            const cx = canvas.getContext('2d');

            if (cx === null) return;

            const sortedLayers = layers.sort((a, b) => {
              if (a && b) return a.position - b.position;
              return 0;
            });

            const notNullLayers: LayerInterface[] = [];

            sortedLayers.forEach((layer) => {
              if (layer) notNullLayers.push(layer);
            });

            drawLayersStepwise({
              i: 0,
              cx,
              isLast,
              loaded,
              projection,
              layers: notNullLayers,
            });
          }
        });
      }
    }
  }, [canvasSizes, changedColors]);

  useEffect(() => {
    if (cache) {
      const cacheCopy = [...cache];

      const cachedLayer = cacheCopy.find(
        (layer: LoadedImage) => layer.id === sessionLayerId,
      );

      if (cachedLayer) {
        dispatch({
          type: 'SAVE_OLD_TEXT_LAYER_IMAGE',
          payload: {
            id: cachedLayer.id,
            img: cachedLayer.img,
            rect: cachedLayer.rectangle,
          },
        });

        cachedLayer.img = sessionImg;
        cachedLayer.rectangle = sessionRect;

        setNewTextLayerStatus(-1);
      }

      setCache(cacheCopy);
    }
  }, [sessionImg]);

  useEffect(() => {
    if (cache) {
      const cacheCopy = [...cache];
      const { id, img: oldImg, rect: oldRect } = oldTextEditingSession;

      const cachedLayer = cacheCopy.find(
        (layer: LoadedImage) => layer.id === id,
      );

      if (cachedLayer) {
        if (isMobile) {
          if (newTextLayerApplyStatus === 0) {
            cachedLayer.img = oldImg;
            cachedLayer.rectangle = oldRect;

            setCache(cacheCopy);
          }
        }
      }
    }
  }, [newTextLayerApplyStatus]);

  return (
    <Container>
      <MediaQuery query="(min-width: 1024px)">
        <BackBtnWrapper leftAlign={'10px'}>
          <BackButton onClick={openSubmitModal} />
        </BackBtnWrapper>
      </MediaQuery>

      {data?.length !== 1 && alternative?.length > 0 && (
        <AnotherProjectionWrapper
          id="image-projection"
          onClick={changeProjectionHandler}
        >
          <AnotherProjection src={alternative} />
        </AnotherProjectionWrapper>
      )}

      <SliderWrapper>
        <Slider ref={sliderRef} {...sliderSettings}>
          {data?.map((design) => {
            if (design?.projection) {
              const { projection } = design;

              const w =
                canvasSizes &&
                canvasSizes[projection] &&
                canvasSizes[projection].width;

              const h =
                canvasSizes &&
                canvasSizes[projection] &&
                canvasSizes[projection].height;

              return (
                <Slide key={projection} ref={slide}>
                  <PinchZoomPan
                    minScale={scaleValue}
                    maxScale={4}
                    zoomButtons={false}
                    initialScale={scaleValue}
                    doubleTapBehavior="zoom"
                    position="topLeft"
                  >
                    <Canvas id={projection} width={w} height={h} />
                  </PinchZoomPan>
                </Slide>
              );
            }

            return null;
          })}
        </Slider>
      </SliderWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const AnotherProjectionWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 30px;
  z-index: 100;
  overflow: hidden;
  width: 130px;
  height: 170px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 1px solid gray;
  border-radius: 20px;
  background-color: #fff;

  @media ${noDesktop} {
    right: 5px;
    width: 90px;
    height: 110px;
  }
`;

const AnotherProjection = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  user-select: none;
`;

const SliderWrapper = styled.div`
  height: 100%;

  & .slick-slider {
    height: 100%;

    & .slick-list {
      height: 100%;

      & .slick-track {
        height: 100%;

        & .slick-slide > div {
          height: 100%;
        }
      }
    }
  }
`;

const Slide = styled.div`
  height: 100%;
`;

const Canvas = styled.canvas`
  margin-top: -10%;

  @media (min-width: 1024px) {
    margin-top: 0;
  }

  @media (min-width: 1366px) {
    margin-left: -4%;
  }
`;
