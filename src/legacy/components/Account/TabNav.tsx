// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { useUserProvider } from '../../context/user';
import { black, cocoBold, white } from '../../styles/constants';

interface Props {
  toggleState: any;
  activeTab: any;
}

const AccountTabNav = ({ toggleState, activeTab }: Props) => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Account: {
      Desktop: {
        acountCategory: { clientProfile, myOrders, security },
      },
    },
  } = languages[currentLanguage];

  const DATA_TAB = 'dataTab';
  const ORDER_TAB = 'orderTab';
  const SECURITY_TAB = 'securityTab';

  return (
    <TabMenu>
      <TabMenuItem
        role="none"
        id={DATA_TAB}
        onClick={toggleState}
        active={DATA_TAB === activeTab}
      >
        {clientProfile}
      </TabMenuItem>
      <TabMenuItem
        role="none"
        id={ORDER_TAB}
        onClick={toggleState}
        active={ORDER_TAB === activeTab}
      >
        {myOrders}
      </TabMenuItem>
      <TabMenuItem
        role="none"
        id={SECURITY_TAB}
        onClick={toggleState}
        active={SECURITY_TAB === activeTab}
      >
        {security}
      </TabMenuItem>
    </TabMenu>
  );
};

const TabMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 70%;
  height: 60px;
  margin: 0 auto 20px auto;
  background: ${black};
  border-radius: 10px;
  text-align: center;
`;

const TabMenuItem = styled.button<{ active: boolean }>`
  margin: 0 40px;
  border: none;
  background: none;
  ${cocoBold};
  font-size: 18px;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? `1px solid ${white}` : 'none')};
`;

// @ts-ignore
export default withRouter(AccountTabNav);
