// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { useUserProvider } from '../../../context/user';

import {
  grey,
  black,
  desktop,
  cocoBold,
  AbsoluteCenter,
} from '../../../styles/constants';
import Icon from '../../../assets/images/icons/arrows/check_icon_fat_black.svg.tsx';

interface Props {
  sameAddress: boolean;
  handleCheck: () => void;
}

const ShippingCheckbox = ({ sameAddress, handleCheck }: Props) => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { Account } = languages[currentLanguage];

  const {
    profile: { shippingCheckbox: shippingCheckboxProvider },
  } = Account;

  return (
    <Wrapper>
      <Label>
        <Checkbox
          checked={sameAddress}
          onChange={handleCheck}
          type="checkbox"
          name="invoiceAddress"
          id="invoiceAddress"
        />

        <CustomCheckbox>
          <CheckMark src={Icon} />
        </CustomCheckbox>

        <Text>{shippingCheckboxProvider}</Text>
      </Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px 0 10px 0;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
`;

export const CustomCheckbox = styled.div`
  width: 24px;
  height: 24px;
  min-width: 24px;
  border: 1px solid ${black};
  margin-right: 15px;
  background: transparent;
  position: relative;
`;

export const CheckMark = styled.img`
  width: 16px;
  height: auto;
  ${AbsoluteCenter};
  display: none;
`;

export const Checkbox = styled.input`
  display: none;
  visibility: hidden;
  position: absolute;
  &:checked ~ ${CustomCheckbox} img {
    display: block;
  }
`;

const Text = styled.span`
  ${cocoBold};
  font-size: 12px;
  color: ${grey};
  text-transform: uppercase;

  @media ${desktop} {
    font-size: 16px;
  }
`;

export default ShippingCheckbox;
