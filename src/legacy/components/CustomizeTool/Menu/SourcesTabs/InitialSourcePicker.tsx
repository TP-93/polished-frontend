// @ts-nocheck
import styled, { css } from 'styled-components';

import wheelIcon from '../../../../assets/images/customize-tool/customizeIcon.png';
import {
  desktop,
  cocoRegular,
  iphone7Width,
} from '../../../../styles/constants';
import { ReactComponent as themesIcon } from '../../../../assets/images/customize-tool/tabs/themesIcon.svg.tsx';
import { ReactComponent as generatorIcon } from '../../../../assets/images/customize-tool/tabs/generatorIcon.svg.tsx';
import { ReactComponent as imagePickerIcon } from '../../../../assets/images/customize-tool/tabs/imagePicker.svg.tsx';

interface Props {
  titles: string[];
  isFlexFoil: boolean;
  sourceHandler: (index: number) => void;
}

const InitialSourcePicker = ({ titles, isFlexFoil, sourceHandler }: Props) => {
  const icons = [
    <GenerateIcon />,
    <ThemesIcon />,
    <WheelIcon src={wheelIcon} />,
    <ImagePickerIcon />,
  ];

  return (
    <Container>
      {icons.map((icon, index: number) => {
        if (isFlexFoil && titles[index] !== titles[1]) return null;
        if (isFlexFoil && titles[index] === titles[1]) sourceHandler(index);

        return (
          <Source key={titles[index]} onClick={() => sourceHandler(index)}>
            {icon} <span>{titles[index]}</span>
          </Source>
        );
      })}
    </Container>
  );
};

export default InitialSourcePicker;

const Container = styled.div`
  display: grid;
  grid-gap: 1vmin;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  flex-grow: 1;
  padding: 0.5rem;
`;

const Source = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1vmax 0;
  opacity: 0.95;
  cursor: pointer;
  border-radius: 20px;
  background-color: #1c1c1e;

  > span {
    margin-top: 2vmax;
    color: #f7f7f7;
    font-size: calc(0.45em + 1vmin);
    user-select: none;
    ${cocoRegular};
  }

  @media ${desktop} {
    &:hover {
      opacity: 1;
      background-color: #111111;
    }
  }

  @media ${iphone7Width} {
    padding: 0.8vmin;

    > span {
      margin-top: 1vmax;
    }
  }
`;

const iconStyles = css`
  display: block;
  width: 4vmax;
  height: 4vmax;
`;

// @media ${iphone7Width} {
//   width: 2vmax;
//   height: 2vmax;
// }

const GenerateIcon = styled(generatorIcon)`
  ${iconStyles}
`;
const ThemesIcon = styled(themesIcon)`
  ${iconStyles}
`;
const WheelIcon = styled.img`
  ${iconStyles}
`;
const ImagePickerIcon = styled(imagePickerIcon)`
  ${iconStyles}
`;
