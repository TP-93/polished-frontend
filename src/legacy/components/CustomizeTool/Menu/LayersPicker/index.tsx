// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { isMobile } from 'react-device-detect';
import { useUserProvider } from '../../../../context/user';
import { useCustomizationStateValue } from '../../../../context/customize';

import {
  getStaticLayers,
  getSortedLayers,
} from '../../utils/customizationUtils';
import LayerSlide from './LayerSlide';
import { cocoBold, hoverColor } from '../../../../styles/constants';

interface Props {
  designs: any;
  withTitle: boolean;
  pickedColors?: any;
  imgProportionCof: number;
  setSelectedLayer: any;
}

const LayersPicker = ({
  designs,
  withTitle,
  pickedColors,
  imgProportionCof,
  setSelectedLayer,
}: Props) => {
  const layersDiv = useRef<HTMLDivElement>(null);

  const [orientation, setOrientation] = useState<any>();
  const [optionsHeight, setHeight] = useState<any>();

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: {
      colorPickersData: { selectLayerTitle },
    },
  } = languages[currentLanguage];

  const {
    state: { selectedDesignId, currentDesign },
    dispatch,
  } = useCustomizationStateValue();

  const {
    toggledLayers: toggledLayersData,
    selectedLayerId,
    changedLayersWithColor,
  } = currentDesign;

  const design = designs?.filter((d: any) => d?.id === selectedDesignId) || [];
  const selectedDesign = design.length > 0 ? design[0] : null;
  const layers = selectedDesign?.layers || [];

  const staticLayers = getStaticLayers(designs, selectedDesignId);

  const getOrientationAndHeight = () => {
    if (layersDiv.current) {
      setHeight(layersDiv.current.clientHeight);
      setOrientation(window.innerWidth / window.innerHeight);
    }
  };

  useEffect(() => {
    getOrientationAndHeight();
  }, []);

  const clickHandler = (id: any, layer: any) => {
    dispatch({
      type: 'ADD_SELECTED_LAYER_ID',
      payload: id,
    });

    setSelectedLayer(layer);
  };

  const enterHandler = (id: number) => {
    dispatch({
      type: 'ADD_HOVER_COLOR',
      payload: { id, color: hoverColor },
    });
  };

  const leaveHandler = () => {
    dispatch({ type: 'REMOVE_HOVER_COLOR' });
  };

  const toggledLayers = layers?.filter(
    (layer: any) => layer.layerType === 'toggle',
  );

  return (
    <LayersWrapper>
      {withTitle && <Title>{selectLayerTitle}</Title>}

      <LayersContainer ref={layersDiv} isJustify={toggledLayers?.length > 2}>
        {layers?.map((layer: any) => {
          if (layer) {
            const { layerType, options } = layer;

            const firstOption = options && options[0];

            if (firstOption?.id && firstOption?.editable) {
              const { id, editable } = firstOption;

              const { sortedLayers, currentOption: CO } = getSortedLayers({
                layer,
                staticLayers,
                toggledLayers: toggledLayersData,
              });

              let newColor: string = '';

              if (pickedColors) {
                const data = pickedColors.find((item: any) => item.id === id);

                if (data) {
                  newColor = data.color;
                } else {
                  newColor = changedLayersWithColor[id];
                }
              } else {
                newColor = changedLayersWithColor[id];
              }

              const isActive: boolean = selectedLayerId === id;

              return (
                (layerType === 'toggle' || editable.length > 0) && (
                  <LayerSlide
                    key={`outer-${id}`}
                    imgProportionCof={imgProportionCof}
                    name={CO?.displayName || ''}
                    layers={sortedLayers}
                    newColor={newColor}
                    isActive={isActive}
                    orientation={orientation}
                    parentHeight={optionsHeight}
                    onClick={() => clickHandler(id, layer)}
                    onMouseEnter={
                      !isMobile ? () => enterHandler(id) : undefined
                    }
                    onMouseLeave={!isMobile ? leaveHandler : undefined}
                  />
                )
              );
            }

            return null;
          }

          return null;
        })}
      </LayersContainer>
    </LayersWrapper>
  );
};

export default LayersPicker;

const LayersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LayersContainer = styled.div<{ isJustify: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isJustify }) =>
    isJustify ? 'space-between' : 'flex-start'};
  overflow: auto hidden;
  width: 100%;
  height: 100%;
  padding: 0.5rem;

  &::-webkit-scrollbar {
    display: block !important;
    border: none;
    border-radius: 20px;
    background-color: #8c8c8c;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: #505050;
  }
`;

const Title = styled.h4`
  color: #f7f7f7;
  opacity: 0.85;
  text-align: center;
  user-select: none;
  text-transform: uppercase;
  ${cocoBold};
  font-size: calc(0.45em + 1vmin);
`;
