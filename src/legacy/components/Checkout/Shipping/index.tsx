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
import PickupPicker from './PickupPicker';
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

export default ({ changeSection, onePage = false, onDirty }: { changeSection: (s: string) => void; onePage?: boolean; onDirty?: () => void }) => {
  const token = localStorage.getItem(GUEST_TOKEN_NAME);

  const [isValid, setIsValid] = useState<any>(false);
  const [shippingDate, setShippingDate] = useState<any>();
  const [validationMsg, setValidationMsg] = useState('');
  const [isDateSelection, setIsDateSelection] = useState(false);
  const [shippingMethodId, setShippingMethodId] = useState('');
  const [pickupPoint, setPickupPoint] = useState('');
  const [isPickup, setIsPickup] = useState(false);

  const {
    state: { languages, currency, currentLanguage },
  } = useUserProvider();

  const { Checkout } = languages[currentLanguage];
  const { sections, generalErrorMessage } = Checkout;
  const { shippingMethod: shippingMethodProvider } = sections;
  const { shipping } = shippingMethodProvider;
  const { continueBtn: continueBtnProvider } = shipping;

  const getValidationMsg = (id: string, date: string, isDate: boolean, pickup = isPickup, point = pickupPoint) => {
    if (!id) return 'Select shipping method please';
    if (pickup && !point) return currentLanguage === 'NL' ? 'Kies een pakketpunt' : 'Select a parcel shop, please';
    if (isDate && !date) return 'Select shipping date, please';

    return '';
  };

  useEffect(() => {
    setIsValid(
      !getValidationMsg(shippingMethodId, shippingDate, isDateSelection),
    );
    setValidationMsg('');
  }, [shippingDate, isDateSelection, shippingMethodId, isPickup, pickupPoint]);

  return (
    <Query
      query={getCheckout}
      variables={{ token, currency, lang: currentLanguage }}
    >
      {({ data, loading, error }: QueryProps) => {
        if (loading) return <Loader />;
        if (error) return <ErrorMessage>{generalErrorMessage}</ErrorMessage>;
        if (!data?.checkout?.billingAddress && !onePage) changeSection('address');

        if (data?.checkout?.availableShippingMethods?.length) {
          const {
            id: checkoutId,
            availableShippingMethods: methods,
            shippingMethod,
            shippingPreferredDate,
            shippingPreferredPickupLocation,
            shippingAddress,
          } = data.checkout;

          if (shippingMethod && !shippingMethodId) {
            setShippingMethodId(shippingMethod.id);
            const current = methods.find((m) => m?.id === shippingMethod.id);
            if (current?.hasPreferredPickupLocationSelection) {
              setIsPickup(true);
              setPickupPoint(shippingPreferredPickupLocation || '');
            }

            if (shippingPreferredDate) {
              setShippingDate(new Date(shippingPreferredDate));
              setIsDateSelection(true);
            }
          }

          return (
            <UpdateShippingMethodMutation>
              {(checkoutShippingMethodUpdate, { loading: mutationLoading }) => {
                const saveMethod = async (methodId = shippingMethodId, date = shippingDate, dateSelection = isDateSelection, pickup = isPickup, point = pickupPoint) => {
                      const msg = getValidationMsg(
                        methodId,
                        date,
                        dateSelection,
                        pickup,
                        point,
                      );

                      if (msg) {
                        setValidationMsg(msg);
                      } else {
                        const variables: ShippingMethodVariables = {
                          lang: currentLanguage,
                          token,
                          currency,
                          checkoutId,
                          shippingMethodId: methodId,
                        };
                        if (pickup && point) variables.pickupPoint = point;

                        if (date) {
                          const [ISODate] = date
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
                    };
                return <>
                  <Group>
                  {methods.map((method) => {
                    if (!method) return null;

                    const {
                      id,
                      name,
                      price,
                      hasPreferredDateSelection: dateSelection,
                      hasPreferredPickupLocationSelection: pickupSelection,
                    } = method;

                    const changeHandler = (e: any) => {
                      e.stopPropagation();
                      if (mutationLoading) return;
                      if (id !== shippingMethodId || onePage) {
                        if (id === shippingMethodId && (dateSelection || pickupSelection)) return;
                        onDirty?.();
                        setShippingMethodId(id);
                        setShippingDate(null);
                        setIsDateSelection(dateSelection);
                        setIsPickup(!!pickupSelection);
                        setPickupPoint('');
                        if (onePage && !dateSelection && !pickupSelection) void saveMethod(id, null, false, false, '');
                      }
                    };

                    const selected = id === shippingMethodId;
                    const amount = price?.amount;
                    const priceLabel = !price || amount === 0 ? (currentLanguage === 'NL' ? 'Gratis' : 'Free') : price.localized;

                    return (
                      <Option key={id} data-selected={selected}>
                        <Row onClick={changeHandler}>
                          <Dot data-active={selected} />
                          <Name>{name}</Name>
                          <Price>{priceLabel}</Price>
                        </Row>
                        {selected && dateSelection && (
                          <DateWrapper>
                            <Suspense fallback={<></>}>
                              <DatePicker
                                minDate={new Date()}
                                selected={shippingDate || new Date()}
                                onChange={(date) => {
                                  setShippingDate(date);
                                  onDirty?.();
                                  if (onePage && date) void saveMethod(id, date, true);
                                }}
                              />
                            </Suspense>
                          </DateWrapper>
                        )}
                        {selected && pickupSelection && (
                          <PickupPicker
                            lang={currentLanguage}
                            country={shippingAddress?.country?.code || 'NL'}
                            postalCode={shippingAddress?.postalCode || ''}
                            houseNumber={shippingAddress?.houseNumber ? String(shippingAddress.houseNumber) : ''}
                            selected={pickupPoint}
                            onSelect={(_p, label) => {
                              onDirty?.();
                              setPickupPoint(label);
                              if (onePage) void saveMethod(id, null, false, true, label);
                            }}
                          />
                        )}
                      </Option>
                    );
                  })}
                  </Group>

                  {validationMsg?.length > 0 && <Error>{validationMsg}</Error>}

                  {!onePage && <ContinueBtn
                    role="none"
                    onClick={() => saveMethod()}
                  >
                    {continueBtnProvider.start} {continueBtnProvider.end}
                  </ContinueBtn>}
                </>;
              }}
            </UpdateShippingMethodMutation>
          );
        }

        return <ErrorMessage>{shipping.errorMessage}</ErrorMessage>;
      }}
    </Query>
  );
};

const DateWrapper = styled.div`
  padding: 0 16px 16px 48px;
`;

const Group = styled.div`
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const Option = styled.div`
  & + & { border-top: 1px solid #e6e6e6; }
  &[data-selected='true'] { background: #fafafa; }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  cursor: pointer;
  font-size: 14px;
  color: #000;
`;

const Dot = styled.span`
  width: 16px; min-width: 16px; height: 16px; border-radius: 50%;
  border: 1px solid #bdbdbd; background: #fff;
  transition: border 0.15s ease;
  &[data-active='true'] { border: 5px solid #000; }
`;

const Name = styled.span` flex: 1; `;
const Price = styled.span` font-weight: 600; white-space: nowrap; `;

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
