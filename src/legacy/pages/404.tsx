// @ts-nocheck
import styled from 'styled-components';

import { useUserProvider } from '../context/user';

import PageWrapper from '../components/common/PageDetails/PageWrapper';
import { cocoBlack, cocoBold } from '../styles/constants';

export default () => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const { NotFound } = languages[currentLanguage];
  const { msg } = NotFound;

  return (
    <PageWrapper>
      <ErrorWrapper>
        <ErrorNumber>404</ErrorNumber>
        <Msg>{msg}</Msg>
      </ErrorWrapper>
    </PageWrapper>
  );
};

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 8vh);
`;

const ErrorNumber = styled.h1`
  ${cocoBlack};
  text-align: center;
  font-size: 100px;
`;

const Msg = styled.div`
  ${cocoBold};
  text-align: center;
  font-size: 32px;
  text-transform: uppercase;
`;
