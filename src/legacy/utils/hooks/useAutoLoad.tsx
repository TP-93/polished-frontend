// @ts-nocheck
import { useEffect } from 'react';
import { desktopWidth } from '../../styles/constants';

const mobileGap = 200;

export default (ref: any) => {
  useEffect(() => {
    const scrollListeter = () => {
      const pageHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      );

      const currentHeight = window.innerHeight + window.pageYOffset;

      if (ref && ref.current) {
        if (
          (window.innerWidth < desktopWidth &&
            currentHeight + mobileGap >= pageHeight) ||
          currentHeight === pageHeight
        ) {
          ref.current.click();
        }
      }
    };

    document.addEventListener('scroll', scrollListeter);

    return () => {
      document.removeEventListener('scroll', scrollListeter);
    };
  }, []);
};
