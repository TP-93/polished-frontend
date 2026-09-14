// @ts-nocheck
import React, { useState } from 'react';
import styled from 'styled-components';

import { TypedMutation } from '../../apollo/types';
import { useUserProvider } from '../../context/user';

import { Input } from '../Checkout/CheckoutInput';
import { BtnBlackMedium } from '../common/Buttons';
import { changePassword } from '../../apollo/mutations/account';
import ErrorMessage, { SuccessMessage } from '../common/Errors';
import {
  changePasswordVariables as vars,
  changePassword_userPasswordChange as data,
  changePassword_userPasswordChange_errors as ValidationError,
} from '../../apollo/mutations/types/changePassword';

const TypedPasswordChangeMutation = TypedMutation<data, vars>(changePassword);

export default () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errs, setErrors] = useState('');
  const [msg, setMsg] = useState('');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { Account } = languages[currentLanguage];
  const {
    security: {
      oldPasswordPlaceholder,
      newPasswordPlaceholder,
      btnText,
      errorMessage: errorMessageProvider,
    },
  } = Account;

  return (
    <Container>
      <TypedPasswordChangeMutation>
        {(changePasswordFn: any, { loading: changePasswordLoading }: any) => (
          <Form
            onSubmit={async (e: any) => {
              e.preventDefault();

              if (errs) setErrors('');

              try {
                const res = await changePasswordFn({
                  variables: { oldPassword, newPassword },
                });

                if (res && res.data && res.data.userPasswordChange) {
                  const { errors, success } = res.data.userPasswordChange;

                  if (success) {
                    setMsg('Succes! Je wachtwoord is gewijzigd!');
                    setOldPassword('');
                    setNewPassword('');
                  } else if (errors && errors.length) {
                    setErrors(
                      errors.reduce(
                        (sum: string, err: ValidationError) =>
                          `${sum}  ${err.message}`,
                        '',
                      ),
                    );
                  }
                }
              } catch (error) {
                setErrors(errorMessageProvider);
              }
            }}
          >
            <Input
              title={oldPasswordPlaceholder}
              placeholder={oldPasswordPlaceholder}
              name="oldPassword"
              value={oldPassword}
              onChange={(e: any) => {
                if (errs) setErrors('');
                if (msg) setMsg('');
                setOldPassword(e.target.value);
              }}
              disabled={changePasswordLoading}
              type="password"
              required
            />
            <Input
              title={newPasswordPlaceholder}
              placeholder={newPasswordPlaceholder}
              name="newPassword"
              value={newPassword}
              onChange={(e: any) => {
                if (errs) setErrors('');
                if (msg) setMsg('');
                setNewPassword(e.target.value);
              }}
              disabled={changePasswordLoading}
              type="password"
              required
            />
            {errs && <ErrorMessage>{errs}</ErrorMessage>}
            {msg && <SuccessMessage>{msg}</SuccessMessage>}
            <Btn type="submit">{btnText}</Btn>
          </Form>
        )}
      </TypedPasswordChangeMutation>
    </Container>
  );
};

export const Container = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 0 15px;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 15px;
  padding: 15px;
`;

export const Btn = styled(BtnBlackMedium)`
  width: 100%;
  max-width: 450px;
`;
