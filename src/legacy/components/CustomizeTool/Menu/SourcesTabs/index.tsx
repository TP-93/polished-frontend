// @ts-nocheck
import React, { useState } from 'react';
import styled from 'styled-components';

import { useUserProvider } from '../../../../context/user';

import wheelIcon from '../../../../assets/images/customize-tool/customizeIcon.png';
import InitialSourcePicker from './InitialSourcePicker';
import { cocoBold, cocoRegular } from '../../../../styles/constants';
import { ReactComponent as themesIcon } from '../../../../assets/images/customize-tool/tabs/themesIcon.svg.tsx';
import { ReactComponent as generatorIcon } from '../../../../assets/images/customize-tool/tabs/generatorIcon.svg.tsx';
import { ReactComponent as imagePickerIcon } from '../../../../assets/images/customize-tool/tabs/imagePicker.svg.tsx';

interface Tabs {
  isFlexFoil: boolean;
  activeIndex: number;
  isTextEditing: boolean;
  toggleIndex: (index: number) => void;
}

const TabsRow = ({
  isFlexFoil,
  activeIndex,
  isTextEditing,
  toggleIndex,
}: Tabs) => {
  const [isInitialSourcePicked, toggleInitialSourcePicker] =
    useState<boolean>(false);

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const icons = [
    <GenerateIcon />,
    <ThemesIcon />,
    <WheelIcon src={wheelIcon} />,
    <ImagePickerIcon />,
  ];

  const {
    Product: {
      colorPickersData: {
        selectColorTitle,
        selectSourceTitle,
        autoGenerator: { title: title1 },
        colorThemes: { title: title2 },
        colorWheel: { title: title3 },
        imagePicker: { title: title4 },
      },
    },
  } = languages[currentLanguage];

  const titles = [title1, title2, title3, title4];

  const sourceHandler = (index: number) => toggleIndex(index);

  const initialSourceHandler = (index: number) => {
    toggleInitialSourcePicker(true);
    toggleIndex(index);
  };

  return (
    <TabsWrapper isBorderApplied={isInitialSourcePicked}>
      <Title>{isFlexFoil ? selectColorTitle : selectSourceTitle}</Title>

      {!isInitialSourcePicked && (
        <InitialSourcePicker
          titles={titles}
          isFlexFoil={isFlexFoil}
          sourceHandler={initialSourceHandler}
        />
      )}

      {isInitialSourcePicked && (
        <TabsContainer>
          {titles.map((title, index) => {
            if (isFlexFoil && title !== title2) return null;
            if (isFlexFoil && title === title2) sourceHandler(index);

            return (
              <TabItem
                key={title}
                isActive={index === activeIndex}
                isDisabled={isTextEditing}
                onClick={() => sourceHandler(index)}
                onTouchStart={() => sourceHandler(index)}
              >
                {icons[index]}
                <span>{title}</span>
              </TabItem>
            );
          })}
        </TabsContainer>
      )}
    </TabsWrapper>
  );
};

export default TabsRow;

const TabsWrapper = styled.div<{ isBorderApplied: boolean }>`
  ${({ isBorderApplied }) => (!isBorderApplied ? 'flex-grow: 1' : '')};
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: ${({ isBorderApplied }) =>
    isBorderApplied ? '2px solid #585858' : 'none'};
`;

const Title = styled.h4`
  text-align: center;
  color: #f7f7f7;
  text-transform: uppercase;
  opacity: 0.85;
  user-select: none;
  ${cocoBold};
  font-size: calc(0.45em + 1vmin);
`;

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0.5rem 0;
  overflow: auto hidden;
`;

const TabItem = styled.div<{ isActive: boolean; isDisabled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24.5%;
  text-transform: capitalize;
  cursor: pointer;
  background-color: ${(p: any) => (p.isActive ? '#3C66D6' : '#1c1c1e')};
  border-radius: 50px;
  color: #f7f7f7;
  opacity: ${({ isDisabled }) => (isDisabled ? '0.5' : '0.85')};
  user-select: none;
  white-space: nowrap;
  ${cocoRegular};
  padding: 1%;
  font-size: calc(0.25em + 1vmin);

  > svg {
    flex-basis: 15%;
    height: 2.5vh;
    margin-right: 4%;
  }

  > span {
    text-align: left;
  }

  @media (min-width: 768px) and (max-width: 1100px) {
    font-size: calc(0.1em + 1vmin);
  }
`;

const GenerateIcon = styled(generatorIcon)``;
const ThemesIcon = styled(themesIcon)``;
const WheelIcon = styled.img`
  flex-basis: 15%;
  height: 2.5vh;
  margin-right: 4%;
  user-select: none;
`;
const ImagePickerIcon = styled(imagePickerIcon)``;
