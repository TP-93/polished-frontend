// @ts-nocheck
import styled from 'styled-components';
import React, { ReactNode, useEffect, useRef } from 'react';

interface Props {
  isOpen: boolean;
  children: ReactNode;
  close?: () => void;
  color?: string;
}

const Modal = ({ color, isOpen, children }: Props) => {
  const html: any = document.querySelector('html');

  const scrollHeight = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      scrollHeight.current = window.scrollY;

      if (html) html.style.overflow = 'hidden';

      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }

    if (!isOpen) {
      if (html) html.removeAttribute('style');

      document.body.removeAttribute('style');

      if (scrollHeight.current) window.scrollTo(0, scrollHeight.current);
    }

    return () => {
      html.removeAttribute('style');
      document.body.removeAttribute('style');
    };
  }, [isOpen]);

  return (
    <ModalBackdrop color={color} innerHeight={window.innerHeight}>
      {children}
    </ModalBackdrop>
  );
};

export default function ModalPortal({ color, isOpen, children }: Props) {
  if (!isOpen) return null;

  return (
    <Modal color={color} isOpen={isOpen}>
      {children}
    </Modal>
  );
}

const ModalBackdrop = styled.div<{ innerHeight: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2200;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ innerHeight }) => `${innerHeight}px`};
  //height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
`;
