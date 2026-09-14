// @ts-nocheck
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { TypedMutation } from '../../../apollo/types';
import { deleteVoucher } from '../../../apollo/mutations/checkout';
import {
  deleteVoucherVariables,
  deleteVoucher as DeleteVoucherData,
} from '../../../apollo/mutations/types/deleteVoucher';
import {
  red,
  black,
  cocoBold,
  platinum,
  cocoRegular,
  desktop,
} from '../../../styles/constants';

import Finish from '../CheckoutFinish/Finish';
import { BtnBlackMedium } from '../../common/Buttons';
import { useUserProvider } from '../../../context/user';
import { GUEST_TOKEN_NAME } from '../../../constants';
import { ReactComponent as DeleteIcon } from '../../../assets/images/icons/trash_icon.svg.tsx';

interface Props {
  fixed?: boolean;
  route?: string;
  isOpen?: boolean;
  onClick?: () => void;
  refetch?: () => void;
  checkoutId?: string;
  totalPrice?: string | null;
  voucherCode?: string | null;
  cartDiscount?: string | null;
  changeSection?: (section: string) => void;
  shippingPrice?: string | null;
  subtotalPrice: string | null;
  discountAmount?: string | null;
  isBillingAddress?: boolean;
  shippingMethodId?: string | null;
}

const DeleteMutationVoucher = TypedMutation<
  DeleteVoucherData,
  deleteVoucherVariables
>(deleteVoucher);

export default ({
  route,
  fixed,
  isOpen,
  onClick,
  refetch,
  checkoutId,
  voucherCode,
  cartDiscount,
  changeSection,
  shippingPrice,
  subtotalPrice,
  discountAmount,
  totalPrice = '',
  isBillingAddress,
  shippingMethodId,
}: Props) => {
  const [errorMsg, setErrorMsg] = useState('');

  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Cart: {
      checkoutSummary: {
        title,
        total,
        finish,
        subTotal,
        shipping,
        btnPayText,
        discountCode,
        packageDiscount,
      },
    },
  } = languages[currentLanguage];

  return (
    <CheckoutSummaryWrapper fixed={fixed}>
      {!fixed && <Title>{title}</Title>}

      {(!fixed || (fixed && isOpen)) && (
        <>
          <Entry>
            <Key>{subTotal}</Key>
            <PosValue>{subtotalPrice}</PosValue>
          </Entry>

          {!!shippingPrice && (
            <Entry>
              <Key>{shipping}</Key>
              <PosValue>{shippingPrice}</PosValue>
            </Entry>
          )}

          {!!cartDiscount && (
            <Entry>
              <SuccessMessage>{packageDiscount}</SuccessMessage>
              <DeleteIcon />
              <SuccessMessage>-{cartDiscount}</SuccessMessage>
            </Entry>
          )}

          {!!voucherCode && (
            <>
              <Entry>
                <FlexItems>
                  <FlexWrapper>
                    <SuccessMessage>
                      {`${discountCode} "${voucherCode}"`}
                    </SuccessMessage>
                    <DeleteMutationVoucher>
                      {(deleteVoucherCb, { loading }) => {
                        if (loading)
                          return <SuccessMessage>...</SuccessMessage>;

                        return (
                          <IconWrapper>
                            <DeleteVoucherIcon
                              onClick={async () => {
                                const token =
                                  localStorage.getItem(GUEST_TOKEN_NAME);

                                try {
                                  if (checkoutId) {
                                    const res = await deleteVoucherCb({
                                      variables: {
                                        checkoutId,
                                        token,
                                      },
                                    });

                                    if (
                                      res?.data?.checkoutDeleteVoucher?.success
                                    ) {
                                      if (refetch) refetch();
                                    }
                                  }
                                } catch {
                                  setErrorMsg(finish.errorMessage);
                                }
                              }}
                            />
                          </IconWrapper>
                        );
                      }}
                    </DeleteMutationVoucher>
                  </FlexWrapper>
                  <SuccessMessage>{`-${discountAmount}`}</SuccessMessage>
                </FlexItems>
              </Entry>
              <ErrorMessage>{errorMsg}</ErrorMessage>
            </>
          )}
        </>
      )}

      <EntryTotal fixed={fixed}>
        <KeyBold>{total}</KeyBold>
        <KeyBold>{totalPrice || subtotalPrice}</KeyBold>
      </EntryTotal>

      {route && (
        <Link to={route}>
          <Button fixed={fixed}>{btnPayText}</Button>
        </Link>
      )}

      {onClick && (
        <Finish
          id={checkoutId}
          isBillingAddress={isBillingAddress}
          changeSection={changeSection}
          shippingMethodId={shippingMethodId}
        />
      )}
    </CheckoutSummaryWrapper>
  );
};

const CheckoutSummaryWrapper = styled.div<{ fixed?: boolean }>`
  max-width: 100%;
  padding: ${({ fixed }) => (fixed ? '2px 15px' : '15px')};
  border: 2px solid ${platinum};
  border-radius: 10px;
`;

const Title = styled.h3`
  ${cocoBold};
  font-size: 14px;
  color: ${black};
  text-transform: uppercase;
  margin: 0 0 10px 0;

  @media ${desktop} {
    font-size: 18px;
  }
`;

const Entry = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EntryTotal = styled(Entry)<{ fixed?: boolean }>`
  margin-top: ${({ fixed }) => (fixed ? '0' : '40px')};
`;

const Key = styled.span`
  ${cocoRegular};
  color: ${black};
  font-size: 12px;
  margin-bottom: 10px;
  text-transform: uppercase;

  @media ${desktop} {
    font-size: 18px;
  }
`;

const PosValue = styled(Key)`
  color: ${black};
`;

const SuccessMessage = styled(Key)`
  color: green;
  margin-bottom: 0;
`;

const ErrorMessage = styled(Key)`
  color: red;
  margin-bottom: 0;
`;

const KeyBold = styled(Key)`
  ${cocoBold}
`;

const Button = styled(BtnBlackMedium)<{ fixed?: boolean }>`
  width: 100%;
  margin-top: ${({ fixed }) => (fixed ? '0' : '10px')};
`;

const FlexItems = styled.div`
  display: flex;
  flex-basis: 100%;
  justify-content: space-between;
  align-items: center;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DeleteVoucherIcon = styled(DeleteIcon)`
  width: 20px;
  cursor: pointer;
  height: auto;

  path {
    fill: ${red};
  }

  @media (max-width: 1366px) {
    width: 15px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;

  @media (max-width: 1366px) {
    margin-right: 30px;
  }
`;
