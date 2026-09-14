// @ts-nocheck
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { useState, useEffect, lazy, Suspense } from 'react';
import { ApolloError } from 'apollo-boost';

import 'react-datepicker/dist/react-datepicker.css';

import { getCheckout } from '../../../apollo/queries/checkout';
import { TypedMutation } from '../../../apollo/types';
import { updateShippingMethod } from '../../../apollo/mutations/checkout';
import { Checkout as CheckoutData } from '../../../apollo/queries/types/Checkout';
import {
  updateShippingMethod as ShippingMethodData,
  updateShippingMethodVariables as ShippingMethodVariables,
  updateShippingMethod_checkoutShippingMethodUpdate_errors as ValidationError,
} from '../../../apollo/mutations/types/updateShippingMethod';

import { useUserProvider } from '../../../context/user';

import Loader from '../../common/PageDetails/Loader';
import ErrorMessage from '../../common/Errors';
import { ContinueBtn } from '../../common/Buttons';
import { GUEST_TOKEN_NAME } from '../../../constants';
import StandardShippingIcon from '../../../assets/images/icons/checkout/standard_shipping_icon.svg.tsx';
import {
  black,
  cocoBold,
  desktop,
  green,
  grey,
  noTablet,
  pink,
  platinum,
} from '../../../styles/constants';
import { ReactComponent as CheckIcon } from '../../../assets/images/icons/arrows/check_icon_fat_white.svg.tsx';

const DatePicker = lazy(() => import('react-datepicker'));

interface QueryProps {
  data: CheckoutData;
  loading: boolean;
  error?: ApolloError;
}

const UpdateShippingMethodMutation = TypedMutation<
  ShippingMethodData,
  ShippingMethodVariables
>(updateShippingMethod);

export default ({ changeSection }: { changeSection: (s: string) => void }) => {
  const token = localStorage.getItem(GUEST_TOKEN_NAME);

  const [isValid, setIsValid] = useState<any>(false);
  const [shippingDate, setShippingDate] = useState<any>();
  const [validationMsg, setValidationMsg] = useState('');
  const [isDateSelection, setIsDateSelection] = useState(false);
  const [shippingMethodId, setShippingMethodId] = useState('');

  const {
    state: { languages, currency, currentLanguage },
  } = useUserProvider();

  const { Checkout } = languages[currentLanguage];
  const { sections, generalErrorMessage } = Checkout;
  const { shippingMethod: shippingMethodProvider } = sections;
  const { shipping } = shippingMethodProvider;
  const { continueBtn: continueBtnProvider } = shipping;

  const getValidationMsg = (id: string, date: string, isDate: boolean) => {
    if (!id) return 'Select shipping method please';
    if (isDate && !date) return 'Select shipping date, please';

    return '';
  };

  useEffect(() => {
    setIsValid(
      !getValidationMsg(shippingMethodId, shippingDate, isDateSelection),
    );
    setValidationMsg('');
  }, [shippingDate, isDateSelection, shippingMethodId]);

  return (
    <Query
      query={getCheckout}
      variables={{ token, currency, lang: currentLanguage }}
    >
      {({ data, loading, error }: QueryProps) => {
        if (loading) return <Loader />;
        if (error) return <ErrorMessage>{generalErrorMessage}</ErrorMessage>;
        if (!data?.checkout?.billingAddress) changeSection('address');

        if (data?.checkout?.availableShippingMethods?.length) {
          const {
            id: checkoutId,
            availableShippingMethods: methods,
            shippingMethod,
            shippingPreferredDate,
          } = data.checkout;

          if (shippingMethod && !shippingMethodId) {
            setShippingMethodId(shippingMethod.id);

            if (shippingPreferredDate) {
              setShippingDate(new Date(shippingPreferredDate));
              setIsDateSelection(true);
            }
          }

          return (
            <UpdateShippingMethodMutation>
              {(checkoutShippingMethodUpdate, { loading: mutationLoading }) => (
                <>
                  {methods.map((method) => {
                    if (!method) return null;

                    const {
                      id,
                      name,
                      price,
                      hasPreferredDateSelection: dateSelection,
                    } = method;

                    const changeHandler = (e: any) => {
                      e.stopPropagation();

                      if (id !== shippingMethodId) {
                        setShippingMethodId(id);
                        setShippingDate(null);
                        setIsDateSelection(dateSelection);
                      }
                    };

                    const selected = id === shippingMethodId;

                    return (
                      <Wrapper key={id} onClick={changeHandler}>
                        <Radio
                          checked={selected}
                          type="radio"
                          name={name || 'radio'}
                          value={shippingMethodId}
                          disabled={mutationLoading}
                          onChange={() => {}}
                        />

                        <CustomRadio />

                        <Icon src={StandardShippingIcon} />

                        <Content>
                          <ShippingInfo>
                            <UpSpan>{name}</UpSpan>
                            <CapSpan>
                              {price?.localized || 'Free shipping'}
                            </CapSpan>
                          </ShippingInfo>

                          {dateSelection && (
                            <DateWrapper>
                              <Suspense fallback={<></>}>
                                <DatePicker
                                  minDate={new Date()}
                                  selected={shippingDate || new Date()}
                                  disabled={
                                    !shippingMethodId && shippingMethodId !== id
                                  }
                                  onChange={(date) => {
                                    setShippingDate(date);
                                  }}
                                />
                              </Suspense>
                            </DateWrapper>
                          )}

                          {(!selected || !isValid) && (
                            <CheckMark isTransparent={true} />
                          )}

                          {selected && isValid && (
                            <CheckMark isTransparent={false} />
                          )}
                        </Content>
                      </Wrapper>
                    );
                  })}

                  {validationMsg?.length > 0 && <Error>{validationMsg}</Error>}

                  <ContinueBtn
                    role="none"
                    onClick={async () => {
                      const msg = getValidationMsg(
                        shippingMethodId,
                        shippingDate,
                        isDateSelection,
                      );

                      if (msg) {
                        setValidationMsg(msg);
                      } else {
                        const variables: ShippingMethodVariables = {
                          lang: currentLanguage,
                          token,
                          currency,
                          checkoutId,
                          shippingMethodId,
                        };

                        if (shippingDate) {
                          const [ISODate] = shippingDate
                            .toISOString()
                            .split('T');

                          variables.date = ISODate;
                        }

                        try {
                          const res = await checkoutShippingMethodUpdate({
                            variables,
                          });

                          if (res?.data?.checkoutShippingMethodUpdate) {
                            const { checkout, errors } =
                              res.data.checkoutShippingMethodUpdate;

                            if (errors && errors.length) {
                              setValidationMsg(
                                errors.reduce(
                                  (sum: string, err: ValidationError) =>
                                    `${sum}  ${err.message}`,
                                  '',
                                ),
                              );
                            } else if (checkout) {
                              changeSection('checkout');
                            } else {
                              setValidationMsg(generalErrorMessage);
                            }
                          }
                        } catch (e) {
                          setValidationMsg(generalErrorMessage);
                        }
                      }
                    }}
                  >
                    {continueBtnProvider.start} {continueBtnProvider.end}
                  </ContinueBtn>
                </>
              )}
            </UpdateShippingMethodMutation>
          );
        }

        return <ErrorMessage>{shipping.errorMessage}</ErrorMessage>;
      }}
    </Query>
  );
};

const DateWrapper = styled.div`
  padding: 5px 0;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

const UpSpan = styled.span`
  text-align: justify;
  text-transform: uppercase;
`;

const CapSpan = styled.div`
  text-align: justify;
  text-transform: capitalize;
`;

const Error = styled.div`
  color: red;
`;

const CustomRadio = styled.div`
  position: relative;
  width: 24px;
  min-width: 24px;
  height: 24px;
  border: 1px solid ${platinum};
  border-radius: 15px;
  transition: all 0.15s ease-in-out;

  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background: transparent;
    display: block;
    transition: all 0.15s ease-in-out;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  border: 1px solid ${platinum};
  transition: all 0.15s ease-in-out;
  border-radius: 10px;
  width: 100%;

  &:hover {
    border-color: ${grey};
    transition: all 0.15s ease-in-out;
  }

  &:hover ${CustomRadio} {
    border-color: ${pink};
    transition: all 0.15s ease-in-out;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;

  @media ${noTablet} {
    flex-direction: column;
    width: 70%;
  }
`;

const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px 0;
  color: ${black};
  ${cocoBold};
  font-size: 12px;

  @media ${desktop} {
    font-size: 16px;
    width: 70%;
    max-width: 70%;
  }
`;

const CheckMark = styled(CheckIcon)<{ isTransparent: boolean }>`
  width: 30px;
  height: auto;
  margin: auto 0 auto auto;

  path {
    fill: ${({ isTransparent }) => (isTransparent ? 'white' : green)};
  }
`;

const Radio = styled.input`
  display: none;
  visibility: hidden;

  &:checked ~ ${CustomRadio} {
    border-color: ${pink};
  }

  &:checked ~ ${CustomRadio}:before {
    background-color: ${pink};
  }

  &:checked ~ select {
    display: inline-block;
  }
`;
