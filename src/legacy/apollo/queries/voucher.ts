// @ts-nocheck
import { gql } from 'apollo-boost';

const checkVoucher = gql`
  query checkVoucher($code: String!, $token: UUID) {
    voucher(code: $code, token: $token) {
      id
      type
      endDate
      usageLimit
      used
      code
      discountValue
      discountValueType
      maxAmountSpent {
        amount
      }
      minAmountSpent {
        amount
      }
    }
  }
`;

export default checkVoucher;
