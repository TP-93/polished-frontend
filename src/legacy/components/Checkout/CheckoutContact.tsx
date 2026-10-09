import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { isAuthenticated } from '../../apollo/queries/auth';
import { getCurrentUserInfo } from '../../apollo/queries/account';
import subscribeMutation from '../../apollo/mutations/subscription';
import { useUserProvider } from '../../context/user';
import User from '../TheHeader/User';
import CheckoutInput from './CheckoutInput';
import { BtnBase } from '../common/Buttons';

export default function CheckoutContact({ email, error, updateEmail, validateEmail, onUserLoaded }: any) {
  const { state: { currentLanguage } } = useUserProvider();
  const nl = currentLanguage === 'NL';
  const [loginOpen, setLoginOpen] = useState(false);
  const [optIn, setOptIn] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subscribe, { loading }] = useMutation(subscribeMutation);
  const auth = useQuery(isAuthenticated);
  const signedIn = Boolean(auth.data?.isLoggedIn);
  const user = useQuery(getCurrentUserInfo, { skip: !signedIn, fetchPolicy: 'network-only' });
  useEffect(() => {
    if (user.data?.me) onUserLoaded(user.data.me);
  }, [user.data?.me]);

  const subscribeEmail = async (checked: boolean) => {
    if (!checked || loading || subscribedEmail === email) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage(nl ? 'Vul een geldig e-mailadres in om je in te schrijven.' : 'Enter a valid email address to subscribe.');
      return;
    }
    try {
      const result = await subscribe({ variables: { input: { email } } });
      const response = result.data?.newsletterSubscribe;
      if (!response || response.errors?.length) throw new Error('subscription failed');
      setSubscribedEmail(email);
      setMessage('');
    } catch {
      setMessage(nl ? 'Inschrijven is niet gelukt. Vink opnieuw aan om het nogmaals te proberen.' : 'Subscription failed. Select the checkbox again to retry.');
    }
  };

  return (
    <Contact>
      <Heading>
        <h2>Contact</h2>
        {signedIn ? <span>{nl ? 'Ingelogd' : 'Signed in'}</span> : <TextAction type="button" onClick={() => setLoginOpen(!loginOpen)}>{nl ? 'Inloggen' : 'Sign in'}</TextAction>}
      </Heading>
      {loginOpen && !signedIn && <LoginPanel role="region" aria-label={nl ? 'Inloggen' : 'Sign in'}>
        <CloseAction type="button" aria-label={nl ? 'Sluiten' : 'Close'} onClick={() => setLoginOpen(false)}><X size={18} /></CloseAction>
        <User checkout closeDrawer={() => setLoginOpen(false)} />
      </LoginPanel>}
      {user.error && <p role="alert">{nl ? 'Je accountgegevens konden niet worden geladen.' : 'Your account details could not be loaded.'}</p>}
      <div onBlur={() => void subscribeEmail(optIn)}>
        <CheckoutInput type="email" label={nl ? 'E-mailadres' : 'Email'} name="email" id="email" value={email} error={error} updateValue={updateEmail} validate={validateEmail} autoComplete="email" />
      </div>
      <OptIn>
        <input type="checkbox" checked={optIn} disabled={loading || Boolean(email && subscribedEmail === email)} onChange={e => { setOptIn(e.target.checked); setMessage(''); void subscribeEmail(e.target.checked); }} />
        <span>{subscribedEmail === email && email ? (nl ? 'Je bent ingeschreven voor de nieuwsbrief.' : 'You are subscribed to the newsletter.') : (nl ? 'Schrijf mij in voor de nieuwsbrief.' : 'Sign me up for the newsletter.')}</span>
      </OptIn>
      {message && <p role="alert">{message}</p>}
    </Contact>
  );
}

const Contact = styled.section`
  margin-bottom: 32px;
  p { color: var(--destructive); font-size: 12px; margin-top: 8px; }
`;
const Heading = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px;
  h2 { font-size: 20px; margin: 0; }
  > span { font-size: 12px; color: var(--checkout-muted); }
`;
const TextAction = styled(BtnBase)`
  && { background: transparent; color: var(--checkout-text); border: 0; box-shadow: none; padding: 0; min-height: 32px; font-size: 13px; font-weight: normal; text-transform: none; text-decoration: underline; }
`;
const CloseAction = styled(TextAction)`position: absolute; top: 8px; right: 8px;`;
const LoginPanel = styled.div`
  position: relative; border: 1px solid var(--checkout-border); padding: 20px 12px; margin-bottom: 16px;
`;
const OptIn = styled.label`
  display: flex; align-items: flex-start; gap: 10px; font-size: 13px; cursor: pointer;
  input { width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px; accent-color: var(--checkout-text); }
`;