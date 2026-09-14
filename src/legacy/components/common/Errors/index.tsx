// @ts-nocheck
import styled from 'styled-components';

import { cocoBold, red, green } from '../../../styles/constants';

const ErrorMessage = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: ${red};
  ${cocoBold};
`;

export const SuccessMessage = styled(ErrorMessage)`
  color: ${green};
`;

export default ErrorMessage;
