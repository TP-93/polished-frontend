// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

import { BorderBtn } from '../../common/Buttons';
import { white, cocoBold } from '../../../styles/constants';

interface Props {
  msg: string;
  close: () => void;
  closeParent: () => void;
}

export default ({ msg, close, closeParent }: Props) => {
  const router = useHistory();
  const { id, slug } = useParams<any>();

  const confirmHandler = () => {
    closeParent();

    if (slug) router.replace(`/product/${slug}`);

    if (id) router.replace(`/my-designs/${id}`);
  };

  return (
    <Container>
      <Msg>{msg}</Msg>
      <BtnRow>
        <BorderBtn role="none" onClick={confirmHandler}>
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
  border-radius: 20px;
  background-color: ${white};
`;

const Msg = styled.div`
  margin-bottom: 2%;
  text-align: center;
  text-transform: uppercase;
  ${cocoBold};
  font-size: calc(0.45em + 1vmin);
`;

const BtnRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
`;
