// @ts-nocheck
import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as zoomIn } from '../../../../../../assets/images/customize-tool/zoom/zoom_in.svg.tsx';
import { ReactComponent as zoomOut } from '../../../../../../assets/images/customize-tool/zoom/zoom_out.svg.tsx';
import { ReactComponent as moveIcon } from '../../../../../../assets/images/customize-tool/zoom/swipe_all_sides.svg.tsx';
import { ReactComponent as pickerIcon } from '../../../../../../assets/images/customize-tool/zoom/color_picker_icon.svg.tsx';

interface Props {
  isPickerActive: boolean;
  resetZoom: any;
  singleZoomIn: any;
  singleZoomOut: any;
  togglePicker: any;
}

const ZoomControls = ({
  isPickerActive,
  resetZoom,
  singleZoomIn,
  singleZoomOut,
  togglePicker,
}: Props) => {
  const [index, toggleIndex] = useState<number>(0);

  const toggleHandler = (id: number) => {
    if (id === index) {
      toggleIndex(0);
    } else {
      toggleIndex(id);
    }
  };

  return (
    <ZoomControlsWrapper>
      <ZoomControl
        isActive={isPickerActive}
        onClick={() => {
          togglePicker((prev: boolean) => !prev);
          toggleHandler(1);
        }}
      >
        <PickerIcon />
      </ZoomControl>
      <ZoomControl
        isActive={!isPickerActive}
        onClick={() => {
          resetZoom();
          toggleHandler(2);
        }}
      >
        <MoveIcon />
      </ZoomControl>
      <ZoomControl
        onClick={() => {
          singleZoomIn();
          toggleHandler(3);
        }}
      >
        <ZoomIn />
      </ZoomControl>
      <ZoomControl
        onClick={() => {
          singleZoomOut();
          toggleHandler(4);
        }}
      >
        <ZoomOut />
      </ZoomControl>
    </ZoomControlsWrapper>
  );
};

export default ZoomControls;

const ZoomControlsWrapper = styled.div`
  position: absolute;
  right: 12px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 40px;
  height: 180px;
  padding: 5px 15px;
  z-index: 100;
  user-select: none;
  background-color: #585858;
  border-radius: 50px;

  @media (min-width: 1024px) {
    bottom: 10px;
    right: 50%;
    transform: translateX(50%);
    flex-direction: row;
    justify-content: space-between;
    width: auto;
    height: auto;
    margin: auto;
  }
`;

// @media ${noDesktop} {
//   right: 12px;
//   bottom: 20px;
//   flex-direction: column;
// width: 40px;
// height: 180px;
// }

const ZoomControl = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  cursor: pointer;
  user-select: none;
  background-color: ${({ isActive }) => (isActive ? '#3c66d6' : '#000')};

  @media (min-width: 1024px) {
    margin-right: 10px;

    &:hover {
      background-color: #3c66d6;
    }
  }

  &:last-child {
    margin-right: 0;
  }

  & > svg {
    width: 3vh;
    height: 3vh;
  }
`;

const PickerIcon = styled(pickerIcon)``;
const MoveIcon = styled(moveIcon)``;
const ZoomIn = styled(zoomIn)``;
const ZoomOut = styled(zoomOut)``;
