// @ts-nocheck
import { Col, Row } from 'styled-bootstrap-grid';
import { ApolloConsumer } from 'react-apollo';
import React, { Fragment } from 'react';

import { useUserProvider } from '../../../context/user';

import CheckoutInput from '../CheckoutInput';
import { getAddressByPostcode } from '../../../apollo/queries/account';
import { Address, AddressErrors } from '../../../interfaces/checkout';
import CountriesSelector, { FakeEvent } from './CountriesSelector';

interface Props {
  address: Address;
  errors: AddressErrors;
  updateValue: (e: React.ChangeEvent<HTMLInputElement> | FakeEvent) => void;
  validate: (name: string, value: string) => void;
}

const AddressForm = ({ address, errors, updateValue, validate }: Props) => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();

  const { Account } = languages[currentLanguage];

  const {
    profile: {
      cityPlaceholder,
      phonePlaceholder,
      streetPlaceholder,
      countryPlaceholder,
      lastNamePlaceholder,
      postCodePlaceholder,
      additionPlaceholder,
      firstNamePlaceholder,
      houseNumberPlaceholder,
      countryAreaPlaceHolder,
    },
  } = Account;

  return (
    <ApolloConsumer>
      {(client) => (
        <Fragment>
          <CheckoutInput
            type="text"
            label={firstNamePlaceholder}
            name="firstName"
            updateValue={updateValue}
            error={errors.firstName}
            validate={validate}
            value={address.firstName}
          />

          <CheckoutInput
            type="text"
            label={lastNamePlaceholder}
            name="lastName"
            updateValue={updateValue}
            error={errors.lastName}
            validate={validate}
            value={address.lastName}
          />

          <Row>
            <Col md={5}>
              <CheckoutInput
                type="text"
                label={postCodePlaceholder}
                name="postalCode"
                updateValue={updateValue}
                error={errors.postalCode}
                validate={validate}
                value={address.postalCode}
              />
            </Col>

            <Col md={4}>
              <CheckoutInput
                type="number"
                label={houseNumberPlaceholder}
                name="houseNumber"
                updateValue={updateValue}
                error={errors.houseNumber}
                validate={validate}
                value={address.houseNumber ? String(address.houseNumber) : ''}
              />
            </Col>

            <Col md={3}>
              <CheckoutInput
                type="text"
                label={additionPlaceholder}
                name="houseNumberAddition"
                updateValue={updateValue}
                error={errors.houseNumberAddition}
                validate={validate}
                value={address.houseNumberAddition}
                autoComplete="new-password"
              />
            </Col>
          </Row>

          <CheckoutInput
            type="text"
            label={streetPlaceholder}
            name="streetAddress1"
            updateValue={updateValue}
            validate={validate}
            value={address.streetAddress1}
            error={errors.streetAddress1}
            onFocus={async (target: EventTarget & HTMLInputElement) => {
              if (address.postalCode && address.houseNumber) {
                try {
                  const res = await client.query({
                    query: getAddressByPostcode,
                    variables: {
                      postCode: address.postalCode,
                      houseNumber: address.houseNumber,
                      addition: address.houseNumberAddition,
                    },
                  });

                  if (res?.data?.addressApi) {
                    const { country, city, streetName } = res.data.addressApi;

                    if (country)
                      updateValue({
                        target: { value: country, name: 'country' },
                      });

                    if (city)
                      updateValue({
                        target: { value: city, name: 'city' },
                      });

                    if (streetName)
                      updateValue({
                        target: { value: streetName, name: 'streetAddress1' },
                      });

                    target.blur();
                  }
                } catch (_) {
                  return null;
                }
              }

              return null;
            }}
          />

          <CheckoutInput
            type="text"
            label={cityPlaceholder}
            name="city"
            error={errors.city}
            updateValue={updateValue}
            value={address.city}
          />

          <CheckoutInput
            type="text"
            label={countryAreaPlaceHolder}
            name="countryArea"
            error={errors.countryArea}
            updateValue={updateValue}
            value={address.countryArea}
          />

          <CountriesSelector
            label={countryPlaceholder}
            name="country"
            error={errors.country}
            updateValue={updateValue}
            selected={address.country}
          />

          <CheckoutInput
            type="text"
            label={phonePlaceholder}
            name="phone"
            updateValue={updateValue}
            error={errors.phone}
            validate={validate}
            value={address.phone ? String(address.phone) : ''}
          />
        </Fragment>
      )}
    </ApolloConsumer>
  );
};

export default AddressForm;
