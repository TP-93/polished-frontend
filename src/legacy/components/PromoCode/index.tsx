// @ts-nocheck
import React, { useState } from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { ApolloError } from 'apollo-boost';
import { useDebouncedCallback } from 'use-debounce';

import {
  black,
  silver,
  cocoBold,
  platinum,
  cocoRegular,
} from '../../styles/constants';
import checkVoucher from '../../apollo/queries/voucher';
import { BtnBlackMedium } from '../common/Buttons/index';
import { useUserProvider } from '../../context/user';
import { GUEST_TOKEN_NAME } from '../../constants';
import { checkVoucher as Data } from '../../apollo/queries/types/checkVoucher';
import ErrorMessage, { SuccessMessage } from '../common/Errors';

interface Props {
  border?: boolean;
  refetch: () => void;
}

interface ResultQuery {
  data: Data;
  error?: ApolloError;
  loading: boolean;
}

const PromoCode = ({ border = true, refetch }: Props) => {
  const token = localStorage.getItem(GUEST_TOKEN_NAME);

  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [skipQuery, setSkipQuery] = useState(true);
  const [skipRequest, setSkipRequest] = useState('');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { Cart } = languages[currentLanguage];
  const { promoCode } = Cart;
  const { errors, couponcodePlaceholder, submitBtnText } = promoCode;

  const debouncedSumbit = useDebouncedCallback(() => {
    if (code && code !== skipRequest) {
      setSkipQuery(false);
      if (errorMsg) setErrorMsg('');
      if (successMsg) setSuccessMsg('');
    } else {
      setErrorMsg(errors.vaucherError);
      setTimeout(() => setErrorMsg(''), 1000);
    }
  }, 1000);

  const inputHandler = (e: any) => {
    setCode(e.target.value);

    if (errorMsg.length) setErrorMsg('');
    if (successMsg.length) setSuccessMsg('');
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    debouncedSumbit();
  };

  const onErrorHandler = () => {
    setSkipQuery(true);

    setErrorMsg(errors.vaucherError);
  };

  const onCompleteHandler = (data: any) => {
    if (data?.voucher) {
      setSuccessMsg(errors.shopingCartError);
      setTimeout(() => refetch(), 1000);
      setSkipRequest(code);
      setTimeout(() => setSuccessMsg(''), 1000);
    }

    if (!data?.voucher && code.length) {
      setErrorMsg(errors.vaucherError);
      setSkipRequest(code);
      setTimeout(() => setErrorMsg(''), 1000);
    }
    setSkipQuery(true);
  };

  return (
    <Query
      query={checkVoucher}
      variables={{ code, token }}
      skip={skipQuery}
      onError={onErrorHandler}
      onCompleted={onCompleteHandler}
      fetchPolicy="network-only"
    >
      {({ loading }: ResultQuery) => {
        return (
          <PromoCodeWrapper onSubmit={submitHandler}>
            <ErrorMessage>{errorMsg}</ErrorMessage>

            <SuccessMessage>{successMsg}</SuccessMessage>

            <InputGroup border={border}>
              <Field
                placeholder={couponcodePlaceholder}
                required
                disabled={loading}
                onChange={inputHandler}
              />

              <Submit type="submit" disabled={loading}>
                {submitBtnText}
              </Submit>
            </InputGroup>
          </PromoCodeWrapper>
        );
      }}
    </Query>
  );
};

export default PromoCode;

const PromoCodeWrapper = styled.form`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 10px;
  border: ${(p: { border: boolean }) => (p.border ? 2 : 0)}px solid ${platinum};
`;

const Field = styled.input`
  width: 70%;
  height: 40px;
  ${cocoRegular};
  font-size: 0.9rem;
  border: none;
  border-bottom: 2px solid ${black};
  color: ${black};

  &::placeholder {
    ${cocoRegular};
    color: ${silver};
    font-size: 0.9rem;
    text-transform: uppercase;
  }

  &:focus {
    outline: none;
  }
`;

const Submit = styled(BtnBlackMedium)`
  width: 25%;
  ${cocoBold};
  color: #fff;
  font-size: calc(0.35em + 1vmin);
  border-radius: 50px;
  background-color: #3e6ae1;

  &:hover {
    opacity: 0.8;
    background-color: #3e6ae1;
  }
`;
