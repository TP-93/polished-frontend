// @ts-nocheck
import React from 'react';
import styled, { keyframes } from 'styled-components';

import LoaderIcon from '../../../assets/images/customize-tool/customize_icon.png';

export default function Loader() {
  const [imgIsLoaded, setImageIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setImageIsLoaded(true);
  }, []);

  if (imgIsLoaded)
    return (
      <Wrapper>
        <Img src={LoaderIcon} alt="Loading..." />
      </Wrapper>
    );

  return (
    <Wrapper>
      <div className="vertical-centered-box">
        <div className="content">
          <div className="loader-circle" />
          <div className="loader-line-mask one">
            <div className="loader-line" />
          </div>
          <div className="loader-line-mask two">
            <div className="loader-line" />
          </div>
          <div className="loader-line-mask three">
            <div className="loader-line" />
          </div>
          <div className="loader-line-mask four">
            <div className="loader-line" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: calc(100vh - 8vh);
`;

const rotating = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Img = styled.img`
  width: 80px;
  animation: ${rotating} 2s linear infinite;
`;
