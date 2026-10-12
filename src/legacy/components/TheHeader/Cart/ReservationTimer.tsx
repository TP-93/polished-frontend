// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { cocoRegular, cocoBold } from '../../../styles/constants';
import { useUserProvider } from '../../../context/user';

const DURATION = 10 * 60; // 10 minutes, in seconds
const STORAGE_KEY = 'jc-cart-reservation-start';

function getRemaining() {
  let start = Number(sessionStorage.getItem(STORAGE_KEY));

  if (!start || Number.isNaN(start) || Date.now() - start >= DURATION * 1000) {
    start = Date.now();
    sessionStorage.setItem(STORAGE_KEY, String(start));
  }

  const elapsed = Math.floor((Date.now() - start) / 1000);
  return Math.max(DURATION - elapsed, 0);
}

const ReservationTimer = () => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const {
    Cart: {
      checkoutSummary: { reservationText, reservationSuffix },
    },
  } = languages[currentLanguage];

  const [remaining, setRemaining] = React.useState(getRemaining);

  React.useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');

  return (
    <Wrapper>
      {reservationText}{' '}
      <Time>
        {mm}:{ss}
      </Time>{' '}
      {reservationSuffix}
    </Wrapper>
  );
};

const Wrapper = styled.p`
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 8px 12px;
  background: var(--cart-timer-background);
  text-align: center;
  ${cocoRegular};
  color: var(--cart-timer-foreground);
  font-size: 0.7rem;
  line-height: 1.5;
`;

const Time = styled.span`
  ${cocoBold};
  font-variant-numeric: tabular-nums;
`;

export default ReservationTimer;
