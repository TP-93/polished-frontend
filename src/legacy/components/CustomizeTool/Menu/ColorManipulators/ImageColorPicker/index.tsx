// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { isDesktop, isMobile, isTablet } from 'react-device-detect';

import { Stack } from '@mui/material';

import { useUserProvider } from '../../../../../context/user';
import { useCustomizationStateValue } from '../../../../../context/customize';

import uploadImage from '../../../../../assets/images/customize-tool/uploadImage.png';
import ModalPortal from '../../../../common/Modals/ModalPortal';
import MakePhotoModal from './MakePhotoModal';
import UploadImageModal from './PickerModal';
import { KIOSK_API_RECORD } from '../../../../../constants';
import { noDesktop, cocoRegular } from '../../../../../styles/constants';
import { ReactComponent as uploadIcon } from '../../../../../assets/images/customize-tool/upload_icon.svg.tsx';
import { ReactComponent as makePhotoIcon } from '../../../../../assets/images/customize-tool/make-photo.svg.tsx';

interface Props {
  designs: any;
  setSelectedLayer: any;
  mobileChangesApply: any;
  resetLayerSelection: any;
}

const ImageColorPicker = ({
  designs,
  setSelectedLayer,
  mobileChangesApply,
  resetLayerSelection,
}: Props) => {
  const [isDragOver, toggleDragOver] = useState<boolean>(false);
  const [isUploadModal, toggleUploadModal] = useState<boolean>(false);
  const [isMakePhotoModal, toggleMakePhotoModal] = useState<boolean>(false);
  const [uploadImageUrl, setUploadUrl] = useState<any>('');

  const isKiosk: boolean = !!localStorage.getItem(KIOSK_API_RECORD);

  const isUploadButton = (!isKiosk && isDesktop) || isMobile || isTablet;

  const {
    state: { newTextEditingSession },
  } = useCustomizationStateValue();

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Product: {
      colorPickersData: {
        imagePicker: { paragraph, label, uploadLink },
      },
    },
  } = languages[currentLanguage];

  const uploadModalToggler = () => {
    toggleUploadModal((prev) => !prev);
  };

  const makePhotoModalToggler = () => {
    toggleMakePhotoModal((prev) => !prev);
  };

  useEffect(() => {
    if (newTextEditingSession.active === false) {
      toggleUploadModal(false);
      setUploadUrl('');
    }
  }, [newTextEditingSession]);

  const uploadButtonHandler = (event: any) => {
    const {
      target: { files },
    } = event;

    const fileReader = new FileReader();

    fileReader.onloadend = function handler() {
      setUploadUrl(fileReader.result);
      uploadModalToggler();
    };

    fileReader.readAsDataURL(files[0]);

    // eslint-disable-next-line no-param-reassign
    event.target.value = null;
  };

  const dragOverHandler = (e: any) => {
    e.preventDefault();
    toggleDragOver(true);
  };

  const dragLeaveHandler = (e: any) => {
    e.preventDefault();
    toggleDragOver(false);
  };

  const dropHandler = (e: any) => {
    e.preventDefault();
    e.persist();

    toggleDragOver(false);

    const fileReader = new FileReader();

    fileReader.onloadend = function handler() {
      setUploadUrl(fileReader.result);
      uploadModalToggler();
    };

    fileReader.readAsDataURL(e.dataTransfer.files[0]);
  };

  const passImageFromWebCameraHandler = (imageData: string) => {
    setUploadUrl(() => imageData);
    toggleUploadModal(() => true);
  };

  return (
    <Wrapper
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
    >
      <Container
        style={isDragOver ? { backgroundColor: '#3e3e45' } : undefined}
      >
        <UploadImage src={uploadImage} />

        <UploadTitle>{paragraph}</UploadTitle>

        <Stack flexDirection="row">
          {isUploadButton && (
            <InputLabel onChange={uploadButtonHandler}>
              <UploadIcon />
              <span>{label}</span>

              <UploadInput type="file" accept="image/png, image/jpeg" />
            </InputLabel>
          )}

          {!isMobile && !isTablet && (
            <PhotoModalButton onClick={makePhotoModalToggler}>
              <MakePhotoIcon /> Make photo
            </PhotoModalButton>
          )}
        </Stack>

        <UploadImageLink>{uploadLink}</UploadImageLink>
      </Container>

      {isUploadModal && (
        <UploadImageModal
          url={uploadImageUrl}
          close={uploadModalToggler}
          designs={designs}
          setSelectedLayer={setSelectedLayer}
          mobileChangesApply={mobileChangesApply}
          resetLayerSelection={resetLayerSelection}
        />
      )}

      <ModalPortal isOpen={isMakePhotoModal}>
        <MakePhotoModal
          close={makePhotoModalToggler}
          passImageFromWebCameraHandler={passImageFromWebCameraHandler}
        />
      </ModalPortal>
    </Wrapper>
  );
};

export default ImageColorPicker;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 1%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  border: 1px dashed #f7f7f7;
  border-radius: 20px;
  transition: 0.2s background-color;
`;

const UploadImage = styled.img`
  height: 10vh;

  @media ${noDesktop} {
    height: 3vh;
  }
`;

const textStyles = css`
  ${cocoRegular};
  font-size: calc(0.45em + 1vmin);
  user-select: none;
  color: #f7f7f7;
  text-align: center;
`;

const UploadTitle = styled.p`
  ${textStyles};
`;

const uploadControlStyles = css`
  min-width: 14rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.5% 8%;
  background-color: #f7f7f7;
  border-radius: 50px;
  cursor: pointer;
  text-align: justify;
  white-space: nowrap;
  text-transform: capitalize;
  ${textStyles};
  color: #000;
`;

const InputLabel = styled.label`
  ${uploadControlStyles};
  margin-right: ${() => (!isMobile ? '0.5rem' : '0')};
`;

const PhotoModalButton = styled.button`
  ${uploadControlStyles};
  outline: none;
  border: none;
`;

const uploadControlIconStyles = css`
  flex-basis: 20%;
  height: 2vh;
`;

const UploadIcon = styled(uploadIcon)`
  ${uploadControlIconStyles};
`;

const MakePhotoIcon = styled(makePhotoIcon)`
  ${uploadControlIconStyles};
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadImageLink = styled.p`
  ${textStyles};
`;
