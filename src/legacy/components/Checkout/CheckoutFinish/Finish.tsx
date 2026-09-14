// @ts-nocheck
import React, { useState } from 'react';
import styled from 'styled-components';

import { TypedMutation } from '../../../apollo/types';
import {
  finishCheckoutVariables,
  finishCheckout as FinishCheckoutData,
  finishCheckout_checkoutFinish_errors as ValidationError,
} from '../../../apollo/mutations/types/finishCheckout';
import { finishCheckout } from '../../../apollo/mutations/checkout';

import {
  AUTH_TOKEN_NAME,
  GUEST_TOKEN_NAME,
  KIOSK_API_RECORD,
  PREV_GUEST_TOKEN_NAME,
} from '../../../constants';
import { noTablet } from '../../../styles/constants';
import ErrorMessage from '../../common/Errors';
import { ContinueBtn } from '../../common/Buttons';
import { useUserProvider } from '../../../context/user';

const FinishCheckoutMutation = TypedMutation<
  FinishCheckoutData,
  finishCheckoutVariables
>(finishCheckout);

interface Props {
  id?: string;
  hideButton?: boolean;
  isBillingAddress?: boolean;
  shippingMethodId?: string | null;
  changeSection?: (section: string) => void;
}

export default function PurchaseButton({
  id,
  hideButton,
  changeSection,
  shippingMethodId,
  isBillingAddress,
}: Props) {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isTerminalTimeoutActive, toggleTerminalTimeoutStatus] =
    useState<boolean>(false);

  const token = localStorage.getItem(GUEST_TOKEN_NAME);

  const {
    state: { currency },
  } = useUserProvider();

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { Cart } = languages[currentLanguage];
  const { checkoutSummary } = Cart;
  const { finish } = checkoutSummary;

  const purchaseHandler = async (checkoutFinish: any) => {
    if (!id && changeSection) return changeSection('address');

    if (!isBillingAddress && changeSection) return changeSection('address');

    if (!shippingMethodId && changeSection) return changeSection('shipping');

    try {
      const vars: any = {
        lang: currentLanguage,
        token,
        currency,
        checkoutId: id,
      };

      if (localStorage.getItem(KIOSK_API_RECORD)) {
        vars.apiCode = localStorage.getItem(KIOSK_API_RECORD);
      }

      const res = await checkoutFinish({
        variables: vars,
      });

      if (res?.data?.checkoutFinish) {
        const {
          token: authToken,
          errors,
          paymentUrl,
        } = res.data.checkoutFinish;

        if (errors?.length) {
          let isTimeout: boolean = false;

          const errorText = errors.reduce(
            (sum: string, err: ValidationError) => {
              if (!isTimeout && err?.message?.includes('timeout')) {
                isTimeout = true;
              }

              return `${sum}  ${err.message}`;
            },
            '',
          );

          setErrorMsg(errorText);

          if (isTimeout) {
            toggleTerminalTimeoutStatus(true);

            setTimeout(function clearTerminalTimeout() {
              toggleTerminalTimeoutStatus(false);
            }, 15000);
          }
        } else if (paymentUrl) {
          localStorage.removeItem(GUEST_TOKEN_NAME);

          if (authToken) {
            localStorage.setItem(AUTH_TOKEN_NAME, authToken);
            localStorage.setItem(PREV_GUEST_TOKEN_NAME, String(token));
          }

          window.location.href = paymentUrl;
        } else {
          setErrorMsg(finish.errorMessage);
        }
      }
    } catch (e: any) {
      setErrorMsg(finish.errorMessage);
    }

    return null;
  };

  return (
    <Wrapper hide={hideButton}>
      <ErrorMessage>{errorMsg}</ErrorMessage>

      <FinishCheckoutMutation>
        {(checkoutFinish, { loading: mutationLoading }) => {
          return (
            <ContinueBtn
              role="none"
              disabled={mutationLoading || isTerminalTimeoutActive}
              onClick={() => purchaseHandler(checkoutFinish)}
            >
              {finish.continueBtnText}
            </ContinueBtn>
          );
        }}
      </FinishCheckoutMutation>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ hide?: boolean }>`
  @media ${noTablet} {
    display: ${(p) => (p.hide ? 'none' : 'block')};
  }
`;
