// @ts-nocheck
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import BigEmail from '../../assets/images/icons/subscribe/big_email_subscription_icon.png';
import { TypedMutation } from '../../apollo/types';
import subscribeMutation from '../../apollo/mutations/subscription';
import CloseSubscription from '../../assets/images/icons/subscribe/close_subscription.png';
import SubscriptionModalBg from '../../assets/images/mocks/sub_popup_bg_desktop.png';
import SubscriptionModalBgXs from '../../assets/images/mocks/sub_popup_bg_mobile.png';
import {
  newsletterSubscribe as MutationData,
  newsletterSubscribeVariables as MutationVars,
} from '../../apollo/mutations/types/newsletterSubscribe';

import { useUserProvider } from '../../context/user';
import {
  tablet,
  noTablet,
  cocoBold,
  desktop,
  cocoRegular,
  noDesktop,
} from '../../styles/constants';
import ErrorMessage, { SuccessMessage } from './Errors';

const SubscribeMutation = TypedMutation<MutationData, MutationVars>(
  subscribeMutation,
);

interface Props {
  hideModal: () => void;
}

export default function SubscriptionPopup({ hideModal }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { Subscription } = languages[currentLanguage];

  const {
    title,
    loadBtn,
    failedMsg,
    subContent: { subTitle, subItem1, subItem2, subItem3 },
    errorMsgTxt,
    subButtonPopup,
    errorSuccessMsg,
    emailPlaceholder,
  } = Subscription;

  const onChangeHandler = () => {
    if (errorMsg) setErrorMsg('');
    if (successMsg) setSuccessMsg('');
  };

  return (
    <SubscriptionPopupWrapper>
      <CloseBtn onClick={hideModal}>
        <CloseIcon src={CloseSubscription} />
      </CloseBtn>

      <AlignCenter>
        <Content>
          <BigEmailIcon src={BigEmail} />
          <Title>{title}</Title>
          <Ul>
            <Subtitle>{subTitle}</Subtitle>
            <Li>- {subItem1}</Li>
            <Li>- {subItem2}</Li>
            <Li>- {subItem3}</Li>
          </Ul>
        </Content>

        <SubscribeBlock>
          <SubscribeMutation>
            {(newsletterSubscribe, { loading, error }) => {
              if (error) setErrorMsg(errorMsgTxt);

              return (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    if (ref && ref.current) {
                      const res = await newsletterSubscribe({
                        variables: {
                          input: {
                            email: ref.current.value,
                          },
                        },
                      });

                      if (res?.data?.newsletterSubscribe) {
                        const { errors } = res.data.newsletterSubscribe;

                        if (errors && errors.length > 0) {
                          setErrorMsg(errorMsgTxt);
                        } else {
                          setSuccessMsg(errorSuccessMsg);

                          setTimeout(() => {
                            hideModal();
                          }, 2000);
                        }
                      } else {
                        setErrorMsg(failedMsg);
                      }
                    }
                  }}
                >
                  <InputGroup>
                    <Input
                      ref={ref}
                      type="email"
                      name="newsLetter"
                      required
                      placeholder={emailPlaceholder}
                      onChange={onChangeHandler}
                    />
                    <Button type="submit" role="none" disabled={loading}>
                      {loading ? loadBtn : subButtonPopup}
                    </Button>
                  </InputGroup>
                </form>
              );
            }}
          </SubscribeMutation>
        </SubscribeBlock>

        {errorMsg.length > 0 && <ErrorMessage>{errorMsg}</ErrorMessage>}

        {successMsg.length > 0 && <Msg>{successMsg}</Msg>}
      </AlignCenter>
    </SubscriptionPopupWrapper>
  );
}

const SubscriptionPopupWrapper = styled.div`
  position: relative;
  max-width: 90vw;
  min-height: fit-content;
  background: url(${SubscriptionModalBg}), linear-gradient(black, black);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  ${cocoBold};
  text-transform: uppercase;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.16);
  color: #ffffff;

  @media ${tablet} {
    width: 1000px;
    height: 600px;
    padding: 83px 20px 0;
  }

  @media ${noTablet} {
    max-width: 80vw;
    padding: 41px 0 10px 0;
    background: url(${SubscriptionModalBgXs}), linear-gradient(black, black);
    background-size: cover;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5vh;
  height: 5vh;
  cursor: pointer;
  border: 1px solid #707070;
  box-shadow: 10px 10px 6px rgba(0, 0, 0, 0.16);
  border-radius: 50%;
  background-color: #ffffff;
`;

const CloseIcon = styled.img`
  width: 2.5vh;
  height: 2.5vh;
`;

const Content = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const AlignCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BigEmailIcon = styled.img`
  width: 5vh;
  height: 3vh;
  margin-bottom: 2rem;

  @media ${desktop} {
    width: 8vh;
    height: 5vh;
    margin-bottom: 6rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 3rem;
  font-size: calc(1em + 1vmin);

  @media ${noDesktop} {
    font-size: calc(0.8em + 1vmin);
  }
`;

const Ul = styled.ul`
  margin: 0;
  font-weight: 400;
  font-size: calc(0.6em + 1vmin);
`;

const Li = styled.li`
  margin-bottom: 1rem;
`;

const Subtitle = styled.span`
  display: block;
  margin-bottom: 1rem;
`;

const SubscribeBlock = styled.div`
  width: 100%;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  flex-grow: 1;
  width: 100%;
  height: 80px;
  padding-left: 1rem;
  ${cocoRegular};
  border-radius: 100px;
  border: 1px solid #707070;
  outline: none;
  background-color: #ffffff;
  color: black;
  font-size: calc(1em + 1vmin);

  @media ${noTablet} {
    font-size: calc(0.5em + 1vmin);
  }

  @media (max-width: 560px) {
    height: 41px;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  width: 250px;
  height: 60px;
  border-radius: 100px;
  background-color: #151515;
  ${cocoBold};
  font-size: calc(1em + 1vmin);
  color: #f6f6f6;
  text-transform: uppercase;
  border: none;
  text-align: center;
  cursor: pointer;

  @media ${noTablet} {
    right: 11px;
    width: 200px;
    font-size: calc(0.5em + 1vmin);
  }

  @media (max-width: 560px) {
    width: 100px;
    height: 31px;
  }
`;

const Msg = styled(SuccessMessage)`
  font-size: calc(0.4em + 1vmin);
`;
