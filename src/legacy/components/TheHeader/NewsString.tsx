// @ts-nocheck
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

import { Box as Box } from '@mui/material';
import { cocoRegular } from '../../styles/constants';
import { useHeaderContext } from './Provider';

export default () => {
  const { pathname } = useLocation();

  const { newsLine } = useHeaderContext();

  const isVisible: boolean =
    pathname !== '/cart' && pathname !== '/checkout' && pathname !== '/account';

  const isSpecialEventPage: boolean = pathname.includes('special-event');

  const lineRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    if (containerRef.current && lineRef.current) {
      if (lineRef.current.offsetWidth > containerRef.current.offsetWidth) {
        setAnimate(true);
      }
    }
  }, [newsLine]);

  if (!isVisible || !newsLine?.length) return null;

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s ease-in-out',
        backgroundColor: !isSpecialEventPage ? '#0d0e0e' : '#0051ca',
      }}
    >
      <RunningLine animate={animate} ref={lineRef}>
        {newsLine}
      </RunningLine>
    </Box>
  );
};

const running = keyframes`
  0% {
    transform: translate(50%)
  }

  100% {
    transform: translate(-100%)
  }  
`;

const animation = css`
  animation: ${running} 15s linear infinite;
`;

const RunningLine = styled.div<{ animate: boolean }>`
  margin: 0;
  padding: 3px 0;
  color: #fff;
  font-size: calc(0.1em + 1vmin);
  text-align: center;
  white-space: pre;
  ${cocoRegular};
  ${({ animate }) => animate && animation};
`;
