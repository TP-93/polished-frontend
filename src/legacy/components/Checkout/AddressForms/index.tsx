// @ts-nocheck
import React, { Component } from 'react';
import styled from 'styled-components';

import { UserContext } from '../../../context/user';

import ErrorMessage from '../../common/Errors';
import { ContinueBtn } from '../../common/Buttons';
import { TypedMutation } from '../../../apollo/types';
import { updateCheckoutAddresses } from '../../../apollo/mutations/checkout';

import {
  updateCheckoutAddressesVariables,
  updateCheckoutAddresses as UpdateChekcoutAddressData,
} from '../../../apollo/mutations/types/updateCheckoutAddresses';
import {
  createCheckout_checkoutCreate_errors as ServerError,
  createCheckout_checkoutCreate_quantityErrors as ServerQuantityError,
  createCheckout_checkoutCreate_billingAddressErrors as ServerBillingAddressError,
  createCheckout_checkoutCreate_shippingAddressErrors as ServerShippingAddressError,
} from '../../../apollo/mutations/types/createCheckout';

import AddressForm from '../AddressForm/index';
import CheckoutInput from '../CheckoutInput';
import { emailRegExp } from '../../../utils/regExps/emailRegExp';
import ShippingCheckbox from '../ShippingCheckbox';
import AgreementCheckbox from '../AgreementCheckbox';
import {
  Address,
  AddressErrors,
  ShippingAddress,
  ShippingAddressErrors,
  blankAddress,
  blankAddressErrors,
  blankShippingAddress,
  blankShippingAddressErrors,
} from '../../../interfaces/checkout';
import { cocoBold } from '../../../styles/constants';
import { OrderLine } from '../../../interfaces/product';
import { FakeEvent } from '../AddressForm/CountriesSelector';
import { AddressInput } from '../../../../types/globalTypes';
import { GUEST_TOKEN_NAME } from '../../../constants';
import { updateCurrentUser } from '../../../apollo/mutations/account';
import {
  loggedUserUpdateVariables,
  loggedUserUpdate as UserData,
} from '../../../apollo/mutations/types/loggedUserUpdate';

const UserUpdateMutation = TypedMutation<UserData, loggedUserUpdateVariables>(
  updateCurrentUser,
);

const UpdateAddressesMutation = TypedMutation<
  UpdateChekcoutAddressData,
  updateCheckoutAddressesVariables
>(updateCheckoutAddresses);

const transformAddress = (address: Address | ShippingAddress): AddressInput => {
  const copy: AddressInput = {
    ...address,
    houseNumber: Number(address.houseNumber),
    phone: String(address.phone),
  };
  // @ts-ignore
  delete copy.__typename;
  // @ts-ignore
  delete copy.id;

  return copy;
};

export const compareAddresses = (
  address?: Address | null,
  shippingAddress?: ShippingAddress | null,
): boolean => {
  if (!address || !shippingAddress) return false;

  return Object.keys(address).every(
    // @ts-ignore
    (key) => address[key] === shippingAddress[key],
  );
};

interface FormProps {
  email: string;
  emailError: string;
  sameAddress: boolean;
  address: Address;
  addressErrors: AddressErrors;
  shippingAddress: ShippingAddress;
  shippingErrors: ShippingAddressErrors;
  networkError: string;
}

interface State {
  agree: boolean;
  formIsValid: boolean;
  sameAddress: boolean;
  email: string;
  emailError?: string;
  address: Address;
  addressErrors?: AddressErrors;
  shippingAddress?: ShippingAddress;
  shippingErrors?: ShippingAddressErrors;
  networkError?: string;
}

interface Props {
  account?: boolean;
  checkoutId?: string;
  checkoutEmail?: string;
  openNextSection: () => void;
  cacheUserData: ({
    email,
    address,
    shippingAddress,
    sameAddress,
  }: {
    sameAddress: boolean;
    email: string;
    address: Address;
    shippingAddress: ShippingAddress;
  }) => void;
  orderLines: OrderLine[];
  checkoutAddress?: Address | null;
  checkoutShippingAddress?: ShippingAddress | null;
  cachedEmail?: string;
  cachedAddress?: Address;
  cachedShippingAddress?: ShippingAddress;
  showQuantityErrors: (errors: (ServerQuantityError | null)[]) => void;
  personalDataAgreed?: boolean;
}

class AddressForms extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // @ts-ignore
    this.countryExceptions = ['Japan', 'JP'];
  }

  static contextType = UserContext;

  state = {
    agree: false,

    formIsValid: false,
    sameAddress: true,

    email: '',
    emailError: '',

    address: blankAddress,
    addressErrors: blankAddressErrors,

    shippingAddress: blankShippingAddress,
    shippingErrors: blankShippingAddressErrors,

    networkError: '',
  };

  componentDidMount() {
    const {
      cachedEmail,
      checkoutEmail,
      cachedAddress,
      checkoutAddress,
      personalDataAgreed,
      cachedShippingAddress,
      checkoutShippingAddress,
    } = this.props;

    if (cachedEmail || cachedAddress || cachedShippingAddress) {
      this.setState({
        email: cachedEmail || '',
        address: cachedAddress ? { ...cachedAddress } : blankAddress,
        shippingAddress: cachedShippingAddress
          ? { ...cachedShippingAddress }
          : blankShippingAddress,
        agree: Boolean(personalDataAgreed),
        sameAddress: compareAddresses(cachedAddress, cachedShippingAddress),
      });
    } else if (checkoutAddress && checkoutShippingAddress) {
      this.setState({
        email: checkoutEmail || '',
        address: { ...checkoutAddress },
        shippingAddress: { ...checkoutShippingAddress },
        sameAddress: compareAddresses(checkoutAddress, checkoutShippingAddress),
        agree: Boolean(personalDataAgreed),
      });
    }
  }

  componentWillUnmount() {
    const { cacheUserData } = this.props;
    const { email, address, shippingAddress, sameAddress } = this.state;

    cacheUserData({ email, address, shippingAddress, sameAddress });
  }

  // validation utils

  checkNumbers = (number: string) => {
    const regex = new RegExp(/^[0-9]*$/gm);
    return regex.test(number);
  };

  checkLetters = (suffix: string) => {
    const regex = new RegExp(/^[A-Za-z]+$/);
    return regex.test(suffix);
  };

  checkEmail = (email: string) => {
    const pattern = emailRegExp;
    return pattern.test(email);
  };

  checkPostCode = (postalCode: string) => {
    const regex = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;
    return regex.test(postalCode);
  };

  // validation

  validateEmail = () => {
    const { email } = this.state;

    // @ts-ignore
    const { state } = this.context;
    const { languages, currentLanguage } = state;
    const { Account } = languages[currentLanguage];
    const { otherValidErrors } = Account;
    const { email: emailProvider } = otherValidErrors;

    if (email) {
      if (this.checkEmail(email)) {
        this.setState({
          emailError: '',
        });
      } else {
        this.setState({
          formIsValid: false,
          emailError: emailProvider.notValid,
        });
      }
    } else {
      this.setState({
        formIsValid: false,
        emailError: emailProvider.emptyEmail,
      });
    }
  };

  validateInput = (
    value: string,
    name: string,
    key: 'addressErrors' | 'shippingErrors',
  ) => {
    const { address, shippingAddress, addressErrors, shippingErrors } =
      this.state;
    const errors =
      key === 'addressErrors' ? { ...addressErrors } : { ...shippingErrors };
    const data = key === 'addressErrors' ? address : shippingAddress;

    let formIsValid = true;

    // @ts-ignore
    const { state } = this.context;
    const { languages, currentLanguage } = state;
    const { Account } = languages[currentLanguage];
    const { otherValidErrors } = Account;
    const {
      firstName: firstNameText,
      lastName: lastNameText,
      postalCode: postalCodeText,
      houseNumber: houseNumberText,
      houseNumberAddition: houseNumberAdditionText,
      country: countryText,
      phone: phoneText,
      street: streetText,
    } = otherValidErrors;

    switch (name) {
      case 'firstName':
        if (!value) {
          formIsValid = false;
          errors[name] = firstNameText.emptyFirstName;
        } else {
          errors[name] = '';
        }
        break;
      case 'lastName':
        if (!value) {
          formIsValid = false;
          errors[name] = lastNameText.emptyLastName;
        } else {
          errors[name] = '';
        }
        break;
      case 'postalCode':
        if (!value) {
          formIsValid = false;
          errors[name] = postalCodeText.emptyPostalCode;
        } else if (data.country === 'NL' && !this.checkPostCode(value)) {
          formIsValid = false;
          errors[name] = postalCodeText.notValid;
        } else {
          errors[name] = '';
        }
        break;
      case 'houseNumber':
        if (!value) {
          formIsValid = false;
          errors[name] = houseNumberText.emptyHouseNumber;
        } else if (!this.checkNumbers(value)) {
          formIsValid = false;
          errors[name] = postalCodeText.notValid;
        } else {
          errors[name] = '';
        }
        break;
      case 'houseNumberAddition':
        if (value && !this.checkLetters(value)) {
          formIsValid = false;
          errors[name] = houseNumberAdditionText.notValid;
        } else {
          errors[name] = '';
        }
        break;
      case 'country':
        if (!value) {
          formIsValid = false;
          errors[name] = countryText.emptyCountry;
        } else {
          errors[name] = '';
          if (!data.postalCode) {
            formIsValid = false;
            errors.postalCode = postalCodeText.emptyPostalCode;
          } else if (value === 'NL' && !this.checkPostCode(data.postalCode)) {
            formIsValid = false;
            errors.postalCode = postalCodeText.notValid;
          } else {
            errors.postalCode = '';
          }
        }
        break;
      case 'phone':
        if (!value) {
          formIsValid = false;
          errors[name] = phoneText.emptyPhone;
        } else {
          errors[name] = '';
        }
        break;
      case 'streetAddress1':
        if (!value) {
          formIsValid = false;
          errors[name] = streetText.emptyStreet;
        } else {
          errors[name] = '';
        }
        break;
      default:
        break;
    }
    // this.setState({ [key]: errors, formIsValid });

    if (key === 'addressErrors') {
      this.setState({ addressErrors: errors, formIsValid });
    } else if (key === 'shippingErrors') {
      this.setState({ shippingErrors: errors, formIsValid });
    }

    return formIsValid;
  };

  validateAddressInput = (name: string, value: string) => {
    this.validateInput(name, value, 'addressErrors');
  };

  validateShippingAddressInput = (name: string, value: string) => {
    this.validateInput(name, value, 'shippingErrors');
  };

  validateAddressSubmit = (data: 'address' | 'shippingAddress') => {
    const { state } = this;

    // @ts-ignore
    const { state: stateContext } = this.context;
    const { languages, currentLanguage } = stateContext;
    const { Account } = languages[currentLanguage];
    const { otherValidErrors } = Account;
    const {
      phone: phoneText,
      street: streetText,
      country: countryText,
      lastName: lastNameText,
      firstName: firstNameText,
      postalCode: postalCodeText,
      houseNumber: houseNumberText,
      houseNumberAddition: houseNumberAdditionText,
    } = otherValidErrors;

    const errors: AddressErrors | ShippingAddressErrors = {};

    const blankErrors =
      data === 'address'
        ? { ...blankAddressErrors }
        : { ...blankShippingAddressErrors };

    if (!state[data].streetAddress1)
      errors.streetAddress1 = streetText.emptyStreet;
    if (!state[data].firstName) errors.firstName = firstNameText.emptyFirstName;
    if (!state[data].lastName) errors.lastName = lastNameText.emptyLastName;
    if (!state[data].country) errors.country = countryText.emptyCountry;
    if (!state[data].phone) errors.phone = phoneText.emptyPhone;

    if (!state[data].postalCode)
      errors.postalCode = postalCodeText.emptyPostalCode;
    else if (
      state[data].country === 'NL' &&
      !this.checkPostCode(state[data].postalCode)
    )
      errors.postalCode = postalCodeText.notValid;

    if (!state[data].houseNumber)
      errors.houseNumber = houseNumberText.emptyHouseNumber;
    else if (!this.checkNumbers(state[data].houseNumber))
      errors.houseNumber = houseNumberText.notValid;

    if (
      state[data].houseNumberAddition &&
      !this.checkLetters(state[data].houseNumberAddition)
    )
      errors.houseNumberAddition = houseNumberAdditionText.notValid;

    return {
      errors: {
        ...blankErrors,
        ...errors,
      },
      errorsNumber: Object.keys(errors).length,
    };
  };

  validateAddressesSubmit = () => {
    const { sameAddress, email } = this.state;

    // @ts-ignore
    const { state } = this.context;
    const { languages, currentLanguage } = state;
    const { Account } = languages[currentLanguage];
    const { otherValidErrors } = Account;
    const { email: emailProvider } = otherValidErrors;

    let emailError = '';

    if (!email) emailError = emailProvider.emptyEmail;
    else if (!this.checkEmail(email)) emailError = emailProvider.notValid;

    const { errors: addressErrors, errorsNumber: addressErrorsNumber } =
      this.validateAddressSubmit('address');

    let formIsValid = !addressErrorsNumber && !emailError;

    if (sameAddress) {
      this.setState({
        emailError,
        addressErrors,
        formIsValid,
      });
    } else {
      const { errors: shippingErrors, errorsNumber: shippingErrorsNumber } =
        this.validateAddressSubmit('shippingAddress');

      formIsValid =
        !addressErrorsNumber && !shippingErrorsNumber && !emailError;

      this.setState({
        emailError,
        addressErrors,
        shippingErrors,
        formIsValid,
        networkError: '',
      });
    }

    return formIsValid;
  };

  // form values handlers

  setAgree = () => {
    const { agree, networkError } = this.state;
    this.setState(() => this.setState({ agree: !agree }));

    if (networkError) this.setState({ networkError: '' });
  };

  updateEmail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    await this.setState({
      email: value,
    });

    this.validateEmail();
  };

  updateAddress = async (
    event: React.ChangeEvent<HTMLInputElement> | FakeEvent,
  ) => {
    const { value, name } = event.target;
    const { address } = this.state;

    if (name === 'postalCode') {
      await this.setState({
        address: {
          ...address,
          [name]: value.toUpperCase(),
        },
      });

      this.validateAddressInput(value.toUpperCase(), name);
    } else {
      await this.setState({
        address: {
          ...address,
          [name]: value,
        },
      });

      this.validateAddressInput(value, name);
    }
  };

  updateShippingAddress = async (
    event: React.ChangeEvent<HTMLInputElement> | FakeEvent,
  ) => {
    const { value, name } = event.target;
    const { shippingAddress } = this.state;

    await this.setState({
      shippingAddress: {
        ...shippingAddress,
        [name]: value,
      },
    });

    this.validateShippingAddressInput(value, name);
  };

  handleCheck = () => {
    const { sameAddress } = this.state;

    if (sameAddress) {
      this.setState({ sameAddress: false });
    } else {
      this.setState({
        sameAddress: true,
        shippingErrors: { ...blankShippingAddressErrors },
      });
    }
  };

  setServerErrors = ({
    serverAddressErrors,
    serverShippingAddressErrors,
  }: {
    serverAddressErrors?: ServerError[] | (ServerBillingAddressError | null)[];
    serverShippingAddressErrors?: (ServerShippingAddressError | null)[];
  }) => {
    const { sameAddress } = this.state;

    let networkError = '';

    // @ts-ignore
    const { state } = this.context;
    const { languages, currentLanguage } = state;
    const { Account } = languages[currentLanguage];
    const { networkErrorMessage } = Account;

    if (!sameAddress && serverAddressErrors && serverShippingAddressErrors) {
      const addressErrors: { [key: string]: string } = {};
      const shippingErrors: { [key: string]: string } = {};

      const notNullAddressErrors: ServerError[] | ServerBillingAddressError[] =
        [];
      const notNullShippingErrors: ServerShippingAddressError[] = [];

      serverAddressErrors.forEach((e: any) => {
        if (e) notNullAddressErrors.push(e);
      });

      serverShippingAddressErrors.forEach((e: any) => {
        if (e) notNullShippingErrors.push(e);
      });

      const addressErrorFields = notNullAddressErrors.map(
        (serverError) => serverError.field,
      );

      const shippingErrorFields = notNullShippingErrors.map(
        (serverError) => serverError.field,
      );

      addressErrorFields.forEach((name) => {
        if (name) {
          const found: ServerError | undefined = notNullAddressErrors.find(
            (serverError: ServerError) => serverError.field === name,
          );

          if (found?.field && found?.message) {
            addressErrors[found.field] = found.message;
          }
        }
      });

      shippingErrorFields.forEach((name) => {
        if (name) {
          const found: ServerError | undefined = notNullShippingErrors.find(
            (serverError: ServerError) => serverError.field === name,
          );

          if (found?.field && found?.message) {
            shippingErrors[found.field] = found.message;
          } else {
            networkError = networkErrorMessage;
          }
        }
      });

      this.setState({
        addressErrors,
        shippingErrors,
        networkError,
      });
    } else if (serverAddressErrors) {
      const notNullErrors: ServerError[] | ServerBillingAddressError[] = [];

      serverAddressErrors.forEach((e: any) => {
        if (e) notNullErrors.push(e);
      });

      const errorFields = notNullErrors.map((serverError) => serverError.field);
      const addressErrors: { [key: string]: string } = {};

      errorFields.forEach((name) => {
        if (name) {
          const found: ServerError | undefined = notNullErrors.find(
            (serverError: ServerError) => serverError.field === name,
          );

          if (found?.field && found?.message) {
            addressErrors[found.field] = found.message;
          } else {
            networkError = networkErrorMessage;
          }
        }
      });

      this.setState({ addressErrors, networkError });
    } else if (!sameAddress && serverShippingAddressErrors) {
      const notNullErrors: ServerError[] | ServerBillingAddressError[] = [];

      serverShippingAddressErrors.forEach((e: any) => {
        if (e) notNullErrors.push(e);
      });

      const errorFields = notNullErrors.map((serverError) => serverError.field);
      const shippingErrors: { [key: string]: string } = {};

      errorFields.forEach((name) => {
        if (name) {
          const found: ServerError | undefined = notNullErrors.find(
            (serverError: ServerError) => serverError.field === name,
          );

          if (found && found.field && found.message) {
            shippingErrors[found.field] = found.message;
          } else {
            networkError = networkErrorMessage;
          }
        }
      });

      this.setState({ shippingErrors, networkError });
    }
  };

  setServerEmailError = (errors: ServerError[] | null) => {
    // @ts-ignore
    const { state } = this.context;
    const { languages, currentLanguage } = state;
    const { Account } = languages[currentLanguage];
    const { security } = Account;

    if (errors?.length) {
      const emailError = errors.find((error) => {
        if (error) return error.field === 'email';
        return false;
      });

      if (emailError?.message) {
        this.setState({ emailError: emailError.message });
      } else {
        this.setState({ networkError: security.errorMessage });
      }

      return false;
    }

    return true;
  };

  renderForms = ({
    email,
    emailError,
    sameAddress,
    address,
    addressErrors,
    shippingErrors,
    shippingAddress,
    networkError,
  }: FormProps) => {
    // @ts-ignore
    const { state } = this.context;

    const { languages, currentLanguage } = state;
    const { Account, Checkout } = languages[currentLanguage];
    const { profile } = Account;
    const { countryError } = Checkout;

    // @ts-ignore
    const exceptions: any = this.countryExceptions;

    return (
      <>
        <CheckoutInput
          type="email"
          label={profile.emailPlaceholder}
          name="email"
          id="email"
          value={email}
          error={emailError}
          validate={this.validateEmail}
          updateValue={this.updateEmail}
        />

        <AddressForm
          address={address}
          errors={addressErrors}
          updateValue={this.updateAddress}
          validate={this.validateAddressInput}
        />

        {(exceptions.includes(address.country) ||
          exceptions.includes(shippingAddress.country)) && (
          <ErrorMessage>{countryError.replace('-name-', 'Japan')}</ErrorMessage>
        )}

        <ShippingCheckbox
          sameAddress={sameAddress}
          handleCheck={this.handleCheck}
        />

        {!sameAddress && (
          <>
            <Title>{profile.isSameAddress.title}</Title>

            <CheckoutInput
              type="text"
              label={profile.isSameAddress.companyName}
              name="companyName"
              error={shippingErrors.companyName}
              updateValue={this.updateShippingAddress}
              validate={this.validateShippingAddressInput}
              value={shippingAddress.companyName}
            />

            <AddressForm
              address={shippingAddress}
              errors={shippingErrors}
              updateValue={this.updateShippingAddress}
              validate={this.validateShippingAddressInput}
            />
          </>
        )}

        <div>
          <ErrorMessage>{networkError}</ErrorMessage>
        </div>
      </>
    );
  };

  render() {
    const {
      agree,
      email,
      emailError,
      address,
      addressErrors,
      sameAddress,
      shippingAddress,
      shippingErrors,
      networkError,
    } = this.state;

    const { account, checkoutId, openNextSection } = this.props;
    const {
      // @ts-ignore
      state: { currency, currentLanguage },
    } = this.context;

    // @ts-ignore
    const exceptions: any = this.countryExceptions;

    return account ? (
      <div>
        {this.renderForms({
          email,
          emailError,
          address,
          addressErrors,
          sameAddress,
          shippingAddress,
          shippingErrors,
          networkError,
        })}

        <AgreementCheckbox agree={agree} setAgree={this.setAgree} />

        <UserUpdateMutation>
          {(loggedUserUpdate, { loading }) => {
            // @ts-ignore
            const { state } = this.context;
            const { languages } = state;
            const { Account } = languages[currentLanguage];
            const { profile, security } = Account;

            return (
              <ContinueBtn
                role="none"
                disabled={
                  loading ||
                  exceptions.includes(address.country) ||
                  exceptions.includes(shippingAddress.country)
                }
                onClick={async () => {
                  if (!agree) {
                    this.setState({
                      networkError: profile.agreementCheckbox,
                    });

                    return;
                  }

                  const defaultBillingAddress = transformAddress(address);

                  try {
                    const res = await loggedUserUpdate({
                      variables: {
                        input: {
                          email,
                          personalDataAgreed: true,
                          defaultBillingAddress,
                          defaultShippingAddress: sameAddress
                            ? defaultBillingAddress
                            : transformAddress(shippingAddress),
                        },
                      },
                    });

                    if (res?.data?.loggedUserUpdate) {
                      const {
                        errors,
                        billingAddressErrors,
                        shippingAddressErrors,
                      } = res.data.loggedUserUpdate;

                      if (billingAddressErrors) {
                        this.setServerErrors({
                          serverAddressErrors: billingAddressErrors,
                        });
                      }

                      if (shippingAddressErrors && !sameAddress) {
                        this.setServerErrors({
                          serverShippingAddressErrors: shippingAddressErrors,
                        });
                      }

                      if (errors) this.setServerEmailError(errors);
                    } else {
                      this.setState({ networkError: security.errorMessage });
                    }
                  } catch (_) {
                    this.setState({ networkError: security.errorMessage });
                  }
                }}
              >
                {profile.continueBtn}
              </ContinueBtn>
            );
          }}
        </UserUpdateMutation>
      </div>
    ) : (
      <UpdateAddressesMutation>
        {(updateAddresses, { loading: addressesLoading }) => {
          // @ts-ignore
          const { state } = this.context;
          const { languages } = state;
          const { Checkout } = languages[currentLanguage];
          const {
            sections: { shippingMethod },
          } = Checkout;
          const {
            shipping: { continueBtn },
          } = shippingMethod;

          return (
            <>
              {this.renderForms({
                email,
                emailError,
                address,
                addressErrors,
                sameAddress,
                shippingAddress,
                shippingErrors,
                networkError,
              })}

              <ContinueBtn
                role="none"
                type="submit"
                disabled={
                  addressesLoading ||
                  exceptions.includes(address.country) ||
                  exceptions.includes(shippingAddress.country)
                }
                onClick={async () => {
                  if (this.validateAddressesSubmit()) {
                    const guestToken = localStorage.getItem(GUEST_TOKEN_NAME);

                    const billingAddress: AddressInput = {
                      ...address,
                      houseNumber: Number(address.houseNumber),
                    };

                    const transformedShippingAddress: AddressInput = {
                      ...shippingAddress,
                      houseNumber: Number(shippingAddress.houseNumber),
                    };

                    if (checkoutId) {
                      // YES, IT DOES
                      // @ts-ignore
                      delete billingAddress.__typename;
                      // @ts-ignore
                      delete transformedShippingAddress.__typename;

                      try {
                        const res = await updateAddresses({
                          variables: {
                            email,
                            lang: currentLanguage,
                            currency,
                            token: guestToken,
                            checkoutId,
                            billingAddress,
                            shippingAddress:
                              sameAddress || !shippingAddress.firstName
                                ? billingAddress
                                : transformedShippingAddress,
                          },
                        });

                        if (
                          res?.data?.checkoutEmailUpdate &&
                          res?.data?.checkoutBillingAddressUpdate &&
                          res?.data?.checkoutShippingAddressUpdate
                        ) {
                          const { errors } =
                            res.data.checkoutBillingAddressUpdate;

                          const { checkout, errors: serverShippingErrors } =
                            res.data.checkoutShippingAddressUpdate;

                          const { errors: emailErrors } =
                            res.data.checkoutEmailUpdate;

                          const emailIsValid =
                            this.setServerEmailError(emailErrors);

                          if (errors?.length && serverShippingErrors?.length) {
                            this.setServerErrors({
                              serverAddressErrors: errors,
                              serverShippingAddressErrors: serverShippingErrors,
                            });
                          } else if (errors?.length) {
                            this.setServerErrors({
                              serverAddressErrors: errors,
                            });
                          } else if (serverShippingErrors?.length) {
                            this.setServerErrors({
                              serverShippingAddressErrors: serverShippingErrors,
                            });
                          } else if (checkout && emailIsValid) {
                            if (sameAddress || !shippingAddress.firstName) {
                              await this.setState({
                                shippingAddress: {
                                  ...address,
                                  companyName: '',
                                },
                              });
                            }

                            openNextSection();
                          } else {
                            this.setState({
                              networkError: 'Er is iets fout gegaan',
                            });
                          }
                        }
                      } catch (e: any) {
                        if (e?.message)
                          this.setState({ networkError: e.message });
                        else
                          this.setState({
                            networkError: 'Er is iets fout gegaan',
                          });
                      }
                    }
                  }
                }}
              >
                {continueBtn.start}
                {continueBtn.end}
              </ContinueBtn>
            </>
          );
        }}
      </UpdateAddressesMutation>
    );
  }
}

AddressForms.contextType = UserContext;

const Title = styled.h3`
  ${cocoBold};
  font-size: 24px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export default AddressForms;
