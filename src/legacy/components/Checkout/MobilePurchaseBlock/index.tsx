// @ts-nocheck
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CheckoutSummary from '../CheckoutSummary';
import { white, greySmoke } from '../../../styles/constants';

import { ReactComponent as Slide } from '../../../assets/images/icons/arrows/checkbox_rounded_white.svg.tsx';

interface Props {
  route?: string;
  refetch: () => void;
  onClick?: () => void;
  totalPrice?: string | null;
  checkoutId?: string;
  voucherCode?: string | null;
  cartDiscount?: string | null;
  subtotalPrice: string | null;
  shippingPrice?: string | null;
  changeSection?: (section: string) => void;
  currentSection?: string;
  discountAmount?: string | null;
  isBillingAddress?: boolean;
  shippingMethodId?: string | null;
}

export default ({
  route,
  onClick,
  refetch,
  totalPrice,
  checkoutId,
  voucherCode,
  cartDiscount,
  subtotalPrice,
  shippingPrice,
  changeSection,
  currentSection,
  discountAmount,
  isBillingAddress,
  shippingMethodId,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (currentSection === 'checkout' && !isOpen) setIsOpen(true);
  }, [currentSection]);

  return (
    <PurchaseBlock open={isOpen}>
      <SlideButton open={isOpen} onClick={() => setIsOpen(!isOpen)} />

      <CheckoutSummary
        fixed
        route={route}
        isOpen={isOpen}
        onClick={onClick}
        refetch={refetch}
        checkoutId={checkoutId}
        totalPrice={totalPrice}
        voucherCode={voucherCode}
        cartDiscount={cartDiscount}
        changeSection={changeSection}
        subtotalPrice={subtotalPrice}
        shippingPrice={shippingPrice}
        discountAmount={discountAmount}
        isBillingAddress={isBillingAddress}
        shippingMethodId={shippingMethodId}
      />
    </PurchaseBlock>
  );
};

const PurchaseBlock = styled.div<{ open: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  width: 100%;
  max-width: 100%;
  border: 1px solid ${white};
  background-color: ${greySmoke};
  transition: all 0.15s ease-in-out;
`;

const SlideButton = styled(Slide)<{ open: boolean }>`
  position: absolute;
  top: -40px;
  left: calc(50% - 20px);
  width: 40px;
  transform: rotate(${({ open }) => (open ? '0' : '180deg')});
  transition: all 0.15s ease-in-out;
`;
