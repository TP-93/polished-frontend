// @ts-nocheck
import styled from 'styled-components';

import { noTablet } from '../../../../../styles/constants';

interface Props {
  foilColors: any;
  selectedColor: any;
  handleColorChange: any;
}

const FoilColors = ({
  foilColors,
  selectedColor,
  handleColorChange,
}: Props) => {
  if (foilColors.length === 0) return null;

  return (
    <Wrapper>
      <Container>
        {foilColors.colors.map((color: string) => (
          <ColorWrapper
            isActive={color === selectedColor}
            onClick={() => handleColorChange(color)}
          >
            <Color isActive={color === selectedColor} bg={color} />
          </ColorWrapper>
        ))}
      </Container>
    </Wrapper>
  );
};

export default FoilColors;

const Wrapper = styled.div`
  height: 100%;
  max-height: 100%;
  width: 100%;
  overflow: hidden auto;

  &::-webkit-scrollbar {
    display: block !important;
    border: none;
    border-radius: 50px;
    background-color: #8c8c8c;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 50px;
    background-color: #505050;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
`;

const ColorWrapper = styled.div<{ isActive: boolean }>`
  position: ${({ isActive }) => (isActive ? 'relative' : 'static')};
  flex-basis: 10%;
  padding: 5px;

  @media ${noTablet} {
    left: -0.5%;
  }
`;

const Color = styled.div<{ bg: string; isActive: boolean }>`
  width: 35px;
  height: 35px;
  border: ${({ isActive }) =>
    isActive ? '3px solid #3C66D6' : '3px solid transparent'};
  border-radius: 50%;
  background-color: ${({ bg }) => bg};
  cursor: pointer;
  user-select: none !important;

  &:hover {
    transform: scale(1.1);
  }

  @media ${noTablet} {
    width: 25px;
    height: 25px;
  }
`;
