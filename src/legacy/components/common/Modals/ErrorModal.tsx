// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { BorderBtn } from '../Buttons';
import { white, cocoBold } from '../../../styles/constants';

interface Props {
  errorMsg: string;
  close: () => void;
}

export default ({ errorMsg, close }: Props) => {
  return (
    <Container>
      <Msg>{errorMsg}</Msg>
      <BtnRow>
        <BorderBtn role="none" onClick={close}>
          OK
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
  padding: 20px;
  margin: 10px;
  background-color: ${white};
  border-radius: 20px;
`;

const Msg = styled.div`
  ${cocoBold};
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  margin-bottom: 20px;
`;

const BtnRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;
