// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import Icon from '../../../assets/images/icons/arrows/check_icon_fat_black.svg.tsx';
import { CustomCheckbox, CheckMark, Checkbox } from '../ShippingCheckbox';
import { cocoRegular, grey } from '../../../styles/constants';
import { useUserProvider } from '../../../context/user';

export default ({
  agree,
  setAgree,
}: {
  agree: boolean;
  setAgree: () => void;
}) => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { Account } = languages[currentLanguage];
  const { profile } = Account;

  return (
    <Flex>
      <Checkbox
        checked={agree}
        onChange={setAgree}
        type="checkbox"
        name="agreement"
        id="agree"
      />

      <CustomCheckbox>
        <CheckMark src={Icon} />
      </CustomCheckbox>
      <Text>{profile.agreementCheckbox}</Text>
    </Flex>
  );
};

const Flex = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Text = styled.span`
  ${cocoRegular};
  font-size: 13px;
  color: ${grey};
  margin-top: 3px;
`;
