// @ts-nocheck
import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { BorderBtn } from '../../common/Buttons';
import { white, cocoBold } from '../../../styles/constants';

interface Props {
  children: ReactNode;
  close: () => void;
  closeParent: () => void;
}

export default ({ children, close, closeParent }: Props) => {
  return (
    <Container>
      <Msg>{children}</Msg>
      <BtnRow>
        <BorderBtn role="none" onClick={closeParent}>
          yes
        </BorderBtn>
        <BorderBtn onClick={close} role="none">
          no
        </BorderBtn>
      </BtnRow>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 20px);
  max-width: 500px;
  padding: 2%;
  background-color: ${white};
  border-radius: 20px;
`;

const Msg = styled.div`
  text-align: center;
  text-transform: uppercase;
  ${cocoBold};
  font-size: calc(0.45em + 1vmin);
  margin-bottom: 2%;
`;

const BtnRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
`;
