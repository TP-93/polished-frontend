// @ts-nocheck
import React from 'react';
import styled, { css } from 'styled-components';

import { getDesignsForProduct_product_designs_layers as LayerInterface } from '../../../../apollo/queries/types/getDesignsForProduct';

import { cocoRegular } from '../../../../styles/constants';

interface Props {
  imgProportionCof: number;
  name?: string;
  layers: LayerInterface[];
  newColor?: any;
  isActive?: any;
  orientation?: number;
  parentHeight?: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default ({
  imgProportionCof,
  name,
  layers,
  newColor,
  isActive,
  orientation,
  parentHeight,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const imgHeight = (window.innerHeight * 28) / 100;
  const imgContRatio = imgHeight / (imgHeight * imgProportionCof);

  const firstOption =
    layers?.length && layers[0].options && layers[0].options[0];

  if (firstOption) {
    const { src: bgSrc, rectangle } = firstOption;

    const rectHeight = rectangle?.height || 1;

    const scale =
      orientation && parentHeight && orientation < 1
        ? (imgContRatio * parentHeight) / rectHeight
        : imgHeight / rectHeight;

    return (
      <Container
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <ImageWrapper isActive={isActive}>
          <ImageContainer height={rectHeight * scale}>
            {bgSrc && <BgImage src={bgSrc} />}

            {layers.map((l) => {
              const zeroOption = l.options && l.options[0];

              if (zeroOption) {
                const { id, src, rectangle: rect, defaultColor } = zeroOption;

                if (src && rect) {
                  const { x, y, width, height } = rect;

                  return (
                    <React.Fragment key={`inner-${id}`}>
                      <Image
                        src={src}
                        alt="layer design"
                        x={(x || 0) * scale}
                        y={(y || 0) * scale}
                        w={(width || 1) * scale}
                        h={(height || 1) * scale}
                      />
                      <LayerDefaultColor bgColor={newColor || defaultColor} />
                    </React.Fragment>
                  );
                }

                return null;
              }

              return null;
            })}
          </ImageContainer>
        </ImageWrapper>

        <Title>{name}</Title>
      </Container>
    );
  }
  return null;
};

const Container = styled.div`
  position: relative;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 5px;
  //padding: 0 0.5%;
  cursor: pointer;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`;

const absoluteStyles = css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1%;
  width: 100%;
  height: 20%;
  border-radius: 20px;
`;

const LayerDefaultColor = styled.div<{ bgColor: any }>`
  ${absoluteStyles};
  z-index: 30;
  background-color: ${({ bgColor }) => bgColor};
`;

const ImageWrapper = styled.div<{ isActive: boolean }>`
  flex: 0 0 auto;
  opacity: 0.95;
  border: 5px solid ${({ isActive }) => (isActive ? '#3C66D6' : 'transparent')};
  //border-radius: 30px;
  border-radius: 25px;
`;

const ImageContainer = styled.div<{ height: number }>`
  position: relative;
  flex: 0 0 auto;
  height: ${({ height }) => height}px;
`;

const BgImage = styled.img`
  display: block;
  width: auto;
  height: 100%;
  //border-radius: 25px;
  border-radius: 20px;
`;

const Image = styled.img<{ x: number; y: number; w: number; h: number }>`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ w }) => w}px;
  height: ${({ h }) => h}px;
  //border-radius: 25px;
  border-radius: 20px;
`;

const Title = styled.div`
  color: #fff;
  opacity: 0.85;
  //margin-top: 4%;
  margin-top: 10px;
  text-align: center;
  text-transform: capitalize;
  user-select: none;
  ${cocoRegular};
  font-size: calc(0.4em + 1vmin);
`;
