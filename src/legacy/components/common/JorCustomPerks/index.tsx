// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { useUserProvider } from '../../../context/user';

import checkIcon from '../../../assets/images/icons/arrows/checkbox_black.svg.tsx';
import { black, cocoRegular } from '../../../styles/constants';

const JorCustomPerks = () => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { Cart } = languages[currentLanguage];
  const {
    jorCustomPerks: { perk1, perk2, perk3, perk4, perk5, perk6, perk7 },
  } = Cart;

  return (
    <PerksList>
      <ListItem>
        {perk1.perk1Start} <strong>{perk1.perk1End}</strong>
      </ListItem>
      <ListItem>
        <strong>{perk2.perk2Start}</strong> {perk2.perk2End}
      </ListItem>
      <ListItem>
        <strong>{perk3.perk3Start}</strong> {perk3.perk3End}
      </ListItem>
      <ListItem>
        {perk4.perk4Start} <strong>{perk4.perk4End}</strong>
      </ListItem>
      <ListItem>
        {perk5.perk5Start} <strong>{perk5.perk5End}</strong>
      </ListItem>
      <ListItem>
        {perk6.perk6Start} <strong>{perk6.perk6End}</strong>
      </ListItem>
      <ListItem>
        {perk7.perk7Start} <strong>{perk7.perk7End}</strong>
      </ListItem>
    </PerksList>
  );
};

const PerksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 30px 0 20px 0;
`;

const ListItem = styled.li`
  ${cocoRegular};
  color: ${black};
  padding-left: 2em;
  position: relative;
  font-size: calc(0.2em + 1vmin);
  line-height: calc(0.6em + 1vmin);

  &::before {
    content: url(${checkIcon});
    width: 16px;
    height: 16px;
    display: block;
    position: absolute;
    top: -1px;
    left: 0;
  }
`;

export default JorCustomPerks;
