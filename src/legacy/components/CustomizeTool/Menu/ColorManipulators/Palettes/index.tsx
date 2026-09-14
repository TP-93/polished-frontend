// @ts-nocheck
import React, { useState } from 'react';
import { isMobileOnly } from 'react-device-detect';

import { useCustomizationStateValue } from '../../../../../context/customize';

import FoilColors from './FoilColors';
import RegularColors from './RegularColors';

interface Props {
  isFlexFoil: boolean;
  colorThemes: any;
}

const Palettes = ({ isFlexFoil, colorThemes }: Props) => {
  const [selectedColor, setSelectedColor] = useState<string>('');

  const { state, dispatch } = useCustomizationStateValue();

  const {
    currentDesign: { selectedLayerId },
  } = state;

  const foilColors =
    colorThemes.find((theme: any) => theme.name === 'Foil Colors') || [];

  const handleColorChange = (color: string) => {
    setSelectedColor(color);

    const type = isMobileOnly ? 'ADD_HOVER_COLOR' : 'CHANGE_LAYER_COLOR';
    const payload = isMobileOnly ? { id: selectedLayerId, color } : color;

    dispatch({
      type,
      payload,
    });
  };

  return (
    <>
      {!isFlexFoil && (
        <RegularColors
          colorThemes={colorThemes}
          selectedColor={selectedColor}
          handleColorChange={handleColorChange}
        />
      )}
      {isFlexFoil && (
        <FoilColors
          foilColors={foilColors}
          selectedColor={selectedColor}
          handleColorChange={handleColorChange}
        />
      )}
    </>
  );
};

export default Palettes;
