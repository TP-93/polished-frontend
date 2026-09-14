// @ts-nocheck
import styled from 'styled-components';

import {
  grey,
  white,
  desktop,
  cocoBold,
  platinum,
  lightBlack,
  raisinBlack,
} from '../../../styles/constants';

export const BtnBase = styled.button`
  font-family: 'Coco Gothic', Arial, sans-serif;
  font-weight: bold;
  border-radius: 6px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
`;

export const BtnBlackBig = styled(BtnBase)`
  background-color: ${lightBlack};
  color: ${white};
  font-size: 14px;
  border: none;
  height: 50px;
  width: 450px;
  &:hover {
    background-color: ${grey};
    transition: all 0.15s ease-in-out;
  }
`;

export const BtnBlackMedium = styled(BtnBase)`
  background: ${lightBlack};
  color: ${white};
  font-size: 12px;
  border: none;
  height: 40px;
  width: 450px;
  max-width: 100%;
  &:hover {
    background-color: ${grey};
    transition: all 0.15s ease-in-out;
  }

  @media ${desktop} {
    font-size: 16px;
  }

  &:disabled {
    background-color: ${grey};
  }
`;

export const BtnWhiteMedium = styled(BtnBase)`
  background-color: ${white};
  color: ${lightBlack};
  font-size: 12px;
  border: 1px solid ${lightBlack};
  height: 40px;
  width: 450px;
  max-width: 100%;
  &:hover {
    color: ${grey};
    transition: all 0.15s ease-in-out;
  }

  @media ${desktop} {
    font-size: 16px;
  }
`;

export const BtnBlackMediumMargin = styled(BtnBlackMedium)`
  margin: 0 15px;
  justify-self: center;
`;

export const BtnWhiteBig = styled(BtnBase)`
  background-color: ${white};
  color: ${lightBlack};
  font-size: 14px;
  border: 1px solid ${lightBlack};
  height: 50px;
  width: 450px;

  &:hover {
    color: ${grey};
    transition: all 0.15s ease-in-out;
  }

  @media ${desktop} {
    font-size: 16px;
  }
`;

export const BorderBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  outline: none;
  border: 2px solid ${raisinBlack};
  border-radius: 5px;
  background: transparent;
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
  transition: 0.2s;
  cursor: pointer;

  &:hover,
  &:active {
    background: ${raisinBlack};
    color: ${white};
  }
`;

export const ContinueBtn = styled(BtnBlackMedium)`
  align-self: flex-end;
  width: 100%;
  margin: 1.5rem 0;
  padding: 0 2rem;
  ${cocoBold};
  color: #fff;
  font-size: calc(0.35em + 1vmin);
  border-radius: 50px;
  background-color: #3e6ae1;

  &:hover {
    opacity: 0.8;
    background-color: #3e6ae1;
  }

  &:disabled {
    cursor: not-allowed;
    background: ${platinum};
  }
`;
