// @ts-nocheck
import React from 'react';
import { useMutation } from 'react-apollo';
import styled, { css } from 'styled-components';

import subscribeMutation from '../../apollo/mutations/subscription';

import { useUserProvider } from '../../context/user';

import validateEmail from '../../utils/regExps/emailRegExp';
import { cocoRegular, desktop } from '../../styles/constants';

export default function NewsLetter() {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { Footer } = languages[currentLanguage];
  const {
    subscribeBtn,
    inputPlaceHolder,
    subscribeFormTitle: { title1, title2, loading: loadingText, title3 },
  } = Footer;

  const [msg, setMsg] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [isInvalidEmail, setIsInvalidEmail] = React.useState<boolean>(false);

  const [newsSubscribeRequest, { loading }] = useMutation(subscribeMutation, {
    onCompleted: (data) => {
      if (data?.newsletterSubscribe) {
        const { errors } = data.newsletterSubscribe;

        if (errors?.length) {
          setMsg(title2);
        } else {
          setMsg(title3);
          setIsInvalidEmail(false);
          // @ts-ignore
          window.dataLayer.push({
            event: 'new_subscriber',
          });
        }
      } else {
        setMsg(title2);
      }
    },
  });
  const submitHandler = async (e: any) => {
    e.preventDefault();

    const isValidEmail = validateEmail(email);

    if (isValidEmail) {
      const variables = {
        input: {
          email,
        },
      };

      await newsSubscribeRequest({ variables });
    } else {
      setIsInvalidEmail(true);
    }
  };

  return (
    <Form>
      <Label>
        {(() => {
          if (loading) return loadingText;
          if (msg) return msg;
          return title1;
        })()}
      </Label>

      <InputGroup>
        <Input
          type="email"
          name="newsLetter"
          value={email}
          error={isInvalidEmail}
          required
          disabled={loading}
          maxLength={100}
          placeholder={inputPlaceHolder}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const cleaned = event.target.value.replace(/\s/g, '');
            setEmail(cleaned);
          }}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              e.preventDefault(); // block spacebar
            }
          }}
          onPaste={(e) => {
            e.preventDefault();
            const pasted = e.clipboardData.getData('text');
            const cleaned = pasted.replace(/\s/g, '');
            setEmail(cleaned);
          }}
        />

        <Button role="none" disabled={loading} onClick={submitHandler}>
          {subscribeBtn}
        </Button>
      </InputGroup>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
`;

const textStyles = css`
  ${cocoRegular};
  color: #fff;
  font-size: 0.75rem;

  @media ${desktop} {
    font-size: calc(0.1em + 1vmin);
  }
`;

const Label = styled.p`
  margin: 1rem 0;
  ${textStyles};
  text-transform: uppercase;

  @media ${desktop} {
    margin-top: 0;
  }
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
  margin-top: 1rem;
`;

const Input = styled.input<{ error: any }>`
  flex-grow: 1;
  padding: 0.8rem;
  ${textStyles};
  border: ${({ error }) => (!error ? '1px solid #ffffffcc' : '1px solid red')};
  background-color: transparent;
`;

const Button = styled.button`
  padding: 0.8rem;
  ${textStyles};
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  color: #010101;
  border: none;
  font-size: 0.75rem;
  background-color: #fff;

  :disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }
`;
