// @ts-nocheck
import React from 'react';

import Palettes from './Palettes';
import ColorGenerator from './ColorGenerator';
import ImageColorPicker from './ImageColorPicker';
import ColorWheelWrapper from './ColorWheel';
import { useCustomizationStateValue } from '../../../../context/customize';

interface Props {
  designs: any;
  isFlexFoil: boolean;
  activeIndex: number;
  colorThemes: any;
  setSelectedLayer: any;
  mobileChangesApply: any;
  resetLayerSelection: any;
}

const ColorPickers = ({
  designs,
  isFlexFoil,
  activeIndex,
  colorThemes,
  setSelectedLayer,
  mobileChangesApply,
  resetLayerSelection,
}: Props) => {
  const {
    state: { currentDesign, selectedDesignId },
  } = useCustomizationStateValue();

  const { selectedLayerId, changedLayersWithColor } = currentDesign;

  const selectedDesign =
    designs?.filter((d: any) => d?.id === selectedDesignId) || [];

  const selectedDesignData =
    selectedDesign.length > 0 ? selectedDesign[0] : null;

  const layers = selectedDesignData?.layers || [];

  let selectedLayer: any = null;
  let selectedLayerColor: string = '';

  if (selectedLayerId) {
    selectedLayer = layers.find(
      (layer: any) => layer?.options[0].id === selectedLayerId,
    );

    selectedLayerColor = selectedLayer?.options[0].defaultColor;

    if (changedLayersWithColor[selectedLayerId])
      selectedLayerColor = changedLayersWithColor[selectedLayerId];
  }

  switch (activeIndex) {
    case 0:
      return <ColorGenerator designs={designs} />;
    case 1:
      return <Palettes isFlexFoil={isFlexFoil} colorThemes={colorThemes} />;
    case 2:
      return (
        <ColorWheelWrapper
          initialColor={selectedLayerColor}
          hideButtons={false}
        />
      );
    case 3:
      return (
        <ImageColorPicker
          designs={designs}
          setSelectedLayer={setSelectedLayer}
          mobileChangesApply={mobileChangesApply}
          resetLayerSelection={resetLayerSelection}
        />
      );
    default:
      return null;
  }
};

export default ColorPickers;
