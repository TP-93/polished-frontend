// @ts-nocheck
import { keyframes } from 'styled-components';

export const horizontalForwardAnimation = keyframes`
    ${'0%'} {
      transform: translateX(0);
    }
    ${'25%'} {
      opacity: 0;
      transform: translateX(100%);
    }
    ${'50%'} {
      opacity: 0;
      transform: translateX(-100%);
    }
    ${'75%'} {
      opacity: 1;
      transform: translateX(0);
    }
`;

export const horizontalBackwardAnimation = keyframes`
    ${'0%'} {
      transform: translateX(0);
    }
    ${'25%'} {
      opacity: 0;
      transform: translateX(-100%);
    }
    ${'50%'} {
      opacity: 0;
      transform: translateX(100%);
    }
    ${'75%'} {
      opacity: 1;
      transform: translateX(0);
    }
`;

export const verticalAnimation = keyframes`
    ${'0%'} {
      transform: translateY(0);
    }
    ${'25%'} {
      opacity: 0;
      transform: translateY(100%);
    }
    ${'50%'} {
      opacity: 0;
      transform: translateY(-100%);
    }
    ${'75%'} {
      opacity: 1;
      transform: translateY(0);
    }
`;
