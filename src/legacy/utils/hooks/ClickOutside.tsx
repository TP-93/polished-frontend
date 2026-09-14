// @ts-nocheck
import React, { useEffect } from 'react';

const useClickOutside = (
  ref: React.RefObject<React.ReactNode>,
  callback: (e: any) => void,
) => {
  const handleClick = (e: Event) => {
    // @ts-ignore
    if (ref.current && !ref.current.contains(e.target)) callback(e);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  });
};

export default useClickOutside;
