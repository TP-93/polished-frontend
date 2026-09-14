// @ts-nocheck
import styled from 'styled-components';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useUserProvider } from '../../../context/user';

import { cocoBold } from '../../../styles/constants';
import { ReactComponent as ArrowLeft } from '../../../assets/images/icons/arrows/left_arrow_icon_black.svg.tsx';

interface Props {
  onClick?: any;
}

const BackButton = ({ onClick }: Props) => {
  const history = useHistory();

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { backBtn } = languages[currentLanguage];

  const backBtnHandler = () => {
    // @ts-ignore
    history.goBack();
  };

  const handler = onClick || backBtnHandler;

  return (
    <Button onClick={handler}>
      <LeftArrow />
      <span>{backBtn}</span>
    </Button>
  );
};

export default BackButton;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 4vh;
  max-height: 4vh;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  color: #fff;
  user-select: none;
  text-transform: uppercase;
  ${cocoBold};
  font-size: calc(0.35em + 1vmin);

  &:disabled {
    opacity: 0.5;
  }

  > span {
    padding-left: 5px;
  }
`;

const LeftArrow = styled(ArrowLeft)`
  height: 2vh;
`;

export const BackBtnWrapper = styled.div<{ leftAlign?: string }>`
  position: absolute;
  top: 0;
  left: ${({ leftAlign }) => leftAlign || '85px'};
  z-index: 90;
  padding: 5px 10px;
  cursor: pointer;

  > button {
    color: #000;
    background-color: transparent;
  }
`;
