// @ts-nocheck
import { useRef, useState } from 'react';
import queryString from 'query-string';
import { TypedMutation } from '../apollo/types';
import { saveNewPassword } from '../apollo/mutations/account';
import {
  saveNewPassword as Result,
  saveNewPasswordVariables as Vars,
} from '../apollo/mutations/types/saveNewPassword';
import { Input } from '../components/Checkout/CheckoutInput';
import { Container, Form, Btn } from '../components/Account/PasswordForm';
import ErrorMessage from '../components/common/Errors';
import PageWrapper from '../components/common/PageDetails/PageWrapper';
import PageTitle from '../components/common/PageDetails/PageTitle';
import { useUserProvider } from '../context/user';

const RequestNewPassword = TypedMutation<Result, Vars>(saveNewPassword);

interface Props {
  history: History;
  location: Location;
}

export default ({ history, location }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [err, setErr] = useState('');

  const data: { token?: string; uid?: string } = queryString.parse(
    location.search,
  );

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const {
    CreateNewPassword: { title, placeholder, errorMessage, createNewPassBtn },
  } = languages[currentLanguage];

  return (
    <PageWrapper>
      <PageTitle title={title} />

      <RequestNewPassword>
        {(save, { error, loading }) => {
          if (error) setErr(errorMessage);
          return (
            <Container>
              <Form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const { uid, token } = data;
                  if (inputRef && inputRef.current && uid && token) {
                    try {
                      const res = await save({
                        variables: {
                          newPassword: inputRef.current.value,
                          token,
                          uid,
                        },
                      });

                      if (
                        res &&
                        res.data &&
                        res.data.userPasswordChangeWithToken
                      ) {
                        const { errors, success } =
                          res.data.userPasswordChangeWithToken;
                        // @ts-ignore
                        if (success) history.push('/login?newPassword');
                        if (errors && errors.length) {
                          setErr(
                            errors.reduce(
                              (sum: string, er) => `${sum}  ${er.message}`,
                              '',
                            ),
                          );
                        } else setErr(errorMessage);
                      } else setErr(errorMessage);
                    } catch (_) {
                      setErr(errorMessage);
                    }
                  }
                }}
              >
                <Input
                  ref={inputRef}
                  title={placeholder}
                  placeholder={placeholder}
                  name="newPassword"
                  type="password"
                  required
                  disabled={loading}
                  onChange={() => {
                    if (err) setErr('');
                  }}
                />
                <ErrorMessage>{err}</ErrorMessage>
                <Btn type="submit" disabled={loading}>
                  {createNewPassBtn}
                </Btn>
              </Form>
            </Container>
          );
        }}
      </RequestNewPassword>
    </PageWrapper>
  );
};
