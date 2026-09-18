// @ts-nocheck
import React from 'react';
import styled, { css } from 'styled-components';
import { isMobileOnly } from 'react-device-detect';

import { useUserProvider } from '../../../../context/user';
import { useCustomizationStateValue } from '../../../../context/customize';

import { cocoRegular } from '../../../../styles/constants';
import { ReactComponent as LeftArrow } from '../../../../assets/images/customize-tool/buttons/generateLeft.svg.tsx';
import { ReactComponent as RightArrow } from '../../../../assets/images/customize-tool/buttons/generateRight.svg.tsx';


interface Props {
  designs: any;
}

const ColorGenerator = ({ designs }: Props) => {
  const { state, dispatch } = useCustomizationStateValue();

  const {
    currentDesign: { schemeId },
    selectedDesignId,
  } = state;

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: {
      colorPickersData: {
        autoGenerator: { prevBtn, nextBtn, paragraph1, paragraph2 },
      },
    },
  } = languages[currentLanguage];

  const createPayloadHandler = () => {
    const design = designs.find((item: any) => item.id === selectedDesignId);

    const layersIdsValues = design.layers
      .filter((layer: any) => layer?.options[0].editable?.length > 0)
      .map((layer: any) => layer.options[0].id);

    const newColors = randomColor({
      hue: 'random',
      luminosity: 'random',
      count: layersIdsValues.length,
    });

    const payload = layersIdsValues.map((id: number, index: number) => ({
      id,
      color: newColors[index],
    }));

    return payload;
  };

  const generateNewColorsHandler = () => {
    if (selectedDesignId) {
      const payload = createPayloadHandler();

      const type = isMobileOnly
        ? 'ADD_HOVER_COLORS_SCHEME'
        : 'APPLY_GENERATED_COLORS';

      dispatch({
        type,
        payload,
      });
    }
  };

  const selectPreviousColorsSchemeHandler = () => {
    if (schemeId !== -1) {
      const type = isMobileOnly
        ? 'SELECT_PREVIOUS_HOVER_COLORS_SCHEME'
        : 'SELECT_PREVIOUS_GENERATED_COLORS_SCHEME';

      dispatch({
        type,
      });
    }
  };

  return (
    <GenerateWrapper>
      <BtnsWrapper>
        <PrevBtn
          onClick={selectPreviousColorsSchemeHandler}
          disabled={schemeId === -1}
        >
          <LeftBtnArrow />
          <span>{prevBtn}</span>
        </PrevBtn>

        <NextBtn onClick={generateNewColorsHandler}>
          <span>{nextBtn}</span>
          <RightBtnArrow />
        </NextBtn>
      </BtnsWrapper>

      <ParagraphsWrapper>
        <Paragraph>{paragraph1}</Paragraph>
        <Paragraph>{paragraph2}</Paragraph>
      </ParagraphsWrapper>
    </GenerateWrapper>
  );
};

export default ColorGenerator;

const GenerateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 20px;
`;

const BtnsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;

  @media (max-width: 769px) {
    margin-bottom: 10px;
  }
`;

const btnStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 48%;
  min-height: 35px;
  padding: 5px;
  text-transform: capitalize;
  border-radius: 50px;
  background-color: transparent;
  border: none;
  outline: none;
  color: #979797;
  ${cocoRegular};
  cursor: pointer;
  user-select: none !important;
  white-space: nowrap;
  font-size: calc(0.45em + 1vmin);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  > svg {
    flex-basis: 15%;
    height: 2vh;
    user-select: none !important;

    & > path {
      fill: #979797;
    }

    &:last-child {
      & > path {
        fill: #ffffff;
      }
    }
  }

  > span {
    flex-basis: 85%;
  }
`;

const PrevBtn = styled.button`
  ${btnStyles};
  border: 2px solid #979797;
`;

const NextBtn = styled.button`
  ${btnStyles};
  color: #f7f7f7;
  border: 2px solid #3e6ae1;
  background-color: #3e6ae1;
`;

const LeftBtnArrow = styled(LeftArrow)``;
const RightBtnArrow = styled(RightArrow)``;

const ParagraphsWrapper = styled.div``;

const Paragraph = styled.p`
  width: 100%;
  opacity: 0.85;
  color: #f7f7f7;
  text-align: justify;
  user-select: none !important;
  ${cocoRegular};
  font-size: calc(0.4em + 1vmin);
  line-height: calc(0.4em + 1vmax);

  &:first-child {
    margin-bottom: 2%;
  }
`;
