// @ts-nocheck
import { useEffect } from 'react';
import { desktopWidth } from '../../styles/constants';

const listenSreenWidth = (
  setState: (flag: boolean) => void,
  width = desktopWidth,
) => {
  const getWidth = () => {
    if (window.innerWidth < width) setState(true);
    else setState(false);
  };

  // eslint-disable-next-line
  useEffect(() => {
    getWidth();
    window.addEventListener('resize', getWidth);
    return () => window.removeEventListener('resize', getWidth);
  });
};

export default listenSreenWidth;
