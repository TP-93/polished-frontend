// @ts-nocheck
import { useEffect } from 'react';

const rad = 57.2958;

export default (ref: any, setDeg: (flag: string) => void) => {
  useEffect(() => {
    if (ref && ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setDeg(`${Math.atan(height / width) * rad}deg`);
    }
  }, []);
};
