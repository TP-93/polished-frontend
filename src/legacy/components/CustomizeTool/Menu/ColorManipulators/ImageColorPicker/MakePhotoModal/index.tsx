// @ts-nocheck
import styled, { css, keyframes } from 'styled-components';
import { useEffect, useRef, useState } from 'react';

import { useSpring, animated } from 'react-spring';

import { Check as ConfirmIcon } from 'styled-icons/bootstrap';
import { DeleteBin5 as DeleteIcon, CameraOff } from 'styled-icons/remix-line';

import CloseModalBtn from '../../../../../common/Buttons/CloseModal';
import { cocoBold, cocoRegular } from '../../../../../../styles/constants';
import { ReactComponent as makePhotoIcon } from '../../../../../../assets/images/customize-tool/make-photo.svg.tsx';

interface Props {
  close: () => void;
  passImageFromWebCameraHandler: (imageData: string) => void;
}

export default function MakePhotoModal({
  close,
  passImageFromWebCameraHandler,
}: Props) {
  const [isRendered, toggleRenderStatus] = useState<boolean>(false);

  const streamRef: any = useRef();

  const [stream, setStream] = useState<any>(null);
  const [isCameraAllowed, toggleCameraPermission] = useState<boolean>(true);
  const [isImageValidation, toggleImageValidation] = useState<boolean>(true);
  const [isValidStreamImage, setStreamValidity] = useState<boolean>(false);

  const [photoUrl, setPhotoUrl] = useState<string>('');

  const [isFlipped, setFlipped] = useState<boolean>(false);

  const { display, opacity, transform } = useSpring({
    opacity: isFlipped ? 1 : 0,
    display: isFlipped ? 'none' : 'flex',
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 100 },
  });

  const validatePhotoFromCamera = async () => {
    const video = streamRef.current;

    const canvas = document.createElement('canvas');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx: any = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const { data } = imageData;

    let brightness = 0;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      brightness += (r + g + b) / 3;
    }

    brightness = Math.floor(brightness / (canvas.width * canvas.height));

    if (brightness !== 142) {
      setStreamValidity(true);
    } else {
      setStreamValidity(false);
      toggleCameraPermission(false);
    }
  };

  useEffect(() => {
    if (streamRef.current && stream) {
      streamRef.current.addEventListener('loadeddata', validatePhotoFromCamera);
    }
  }, [stream]);

  const streamHandler = async () => {
    try {
      const streamPlayer = streamRef.current;

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      setStream(newStream);

      streamPlayer.srcObject = newStream;
      streamPlayer.play();
    } catch (e) {
      toggleCameraPermission(false);
    } finally {
      toggleImageValidation(false);
    }
  };

  const stopStreamHandler = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track: any) => track.stop());
    }
  };

  useEffect(() => {
    if (!isRendered) {
      streamHandler();
      toggleRenderStatus(true);
    }

    return () => {
      if (isRendered) stopStreamHandler();
    };
  }, [isRendered]);

  const takePictureHandler = () => {
    const streamPlayer = streamRef?.current;
    const tmpCanvas: any = document.createElement('canvas');

    const height = streamPlayer.videoHeight;
    const width = streamPlayer.videoWidth;

    tmpCanvas.height = height;
    tmpCanvas.width = width;

    const context: any = tmpCanvas.getContext('2d');

    context.drawImage(streamPlayer, 0, 0, width, height);

    const photoDataUrl = tmpCanvas.toDataURL('image/png');

    setPhotoUrl(photoDataUrl);
    setFlipped(true);
  };

  const clearPhotoHandler = () => {
    setPhotoUrl('');
    setFlipped(false);
  };

  const closeModalHandler = () => {
    stopStreamHandler();
    close();
  };

  const confirmPhotoHandler = () => {
    passImageFromWebCameraHandler(photoUrl);
    closeModalHandler();
  };

  return (
    <>
      <Container
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
          display,
        }}
      >
        <CloseModalBtn close={closeModalHandler} />

        {isImageValidation && isCameraAllowed && (
          <Overlay isAbsolute>Establishing camera connection</Overlay>
        )}

        <Title>Take a photo</Title>

        {!isCameraAllowed && !isImageValidation && !isValidStreamImage && (
          <Overlay isAbsolute>
            <CameraOff />
            <p>Set up camera image or check access permission</p>
          </Overlay>
        )}

        <Stream ref={streamRef}></Stream>

        <TakePhotoButton
          disabled={!isImageValidation && !isValidStreamImage && !stream}
          onClick={takePictureHandler}
        >
          <MakePhotoIcon />
        </TakePhotoButton>
      </Container>

      <Container
        style={{
          opacity,
          transform,
          rotateY: '180deg',
          display: isFlipped ? 'flex' : 'none',
        }}
      >
        <CloseModalBtn close={closeModalHandler} />

        <Title>Confirm taken photo?</Title>

        <PhotoWrapper>
          <Photo src={photoUrl} />
        </PhotoWrapper>

        <ControlsWrapper>
          <DeleteButton disabled={!photoUrl} onClick={clearPhotoHandler}>
            <DeleteIcon />
          </DeleteButton>
          <ConfirmButton disabled={!photoUrl} onClick={confirmPhotoHandler}>
            <ConfirmIcon />
          </ConfirmButton>
        </ControlsWrapper>
      </Container>
    </>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;

const absoluteStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
`;

const Overlay = styled.div<{ isAbsolute: boolean }>`
  z-index: 110;
  ${({ isAbsolute }) => (isAbsolute ? absoluteStyles : undefined)};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #2b2b31;
  border-radius: 20px;
  ${cocoRegular};
  color: #f7f7f7;
  font-size: calc(0.5em + 1vmin);
  animation: ${fadeIn} 1s ease-in;
  animation-fill-mode: forwards;

  svg {
    height: 10vh;
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 0.5rem;
  ${cocoBold};
  color: #f7f7f7;
  text-align: center;
`;

const Container = styled(animated.div)`
  position: relative;
  width: calc(100vw * 30 / 100);
  height: 65vh;
  display: flex;
  flex-direction: column;
  background-color: #1c1c1e;
  border-radius: 20px;
  padding: 1rem;
`;

const Stream = styled.video`
  flex: 1;
  width: 100%;
  height: 80%;
  object-fit: fill;
  color: #fff;
  border-radius: 20px !important;
  animation: ${fadeIn} 1s ease-in;
  animation-fill-mode: forwards;
`;

const PhotoWrapper = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 20px;
`;

const Photo = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: fill;
`;

const btnStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: 0.5% 0;
  outline: none;
  cursor: pointer;
  ${cocoRegular};
  border-radius: 20px;
  user-select: none;
  font-size: calc(0.5em + 1vmin);

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TakePhotoButton = styled.button`
  ${btnStyles};
  ${cocoRegular};
  align-self: flex-end;
  outline: none;
  background-color: #3e6ae0;
  color: #f7f7f7;
  width: 100%;
  margin-top: 1rem;
  border: 2px solid #3e6ae0;
  border-radius: 20px;
  cursor: pointer;
  font-size: calc(0.5em + 1vmin);

  :disabled {
    opacity: 0.95;
    touch-action: none;
    cursor: not-allowed;
  }
`;

const MakePhotoIcon = styled(makePhotoIcon)`
  height: 3.4vh;

  path {
    fill: #f7f7f7;
  }
`;

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const DeleteButton = styled.button`
  ${btnStyles};
  width: 48%;
  border: 2px solid #ff453a;
  color: #ff453a;
  background-color: transparent;
  margin-right: 0.5rem;
  user-select: none;
  cursor: pointer;

  &:hover {
    color: #f7f7f7;
    background-color: #ff453a;
  }

  > svg {
    height: 3vh;
    transform: scale(0.8);
  }
`;

const ConfirmButton = styled.button`
  ${btnStyles};
  width: 48%;
  border: 2px solid #31cd48;
  color: #31cd48;
  background-color: transparent;

  &:hover {
    color: #f7f7f7;
    background-color: #31cd48;

    svg {
      path {
        fill: #f7f7f7;
      }
    }
  }

  > svg {
    height: 3vh;

    path {
      fill: #31cd48;
    }
  }
`;
