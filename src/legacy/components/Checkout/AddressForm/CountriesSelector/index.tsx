// @ts-nocheck
import React, { useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import { Query } from 'react-apollo';
import styled, { css } from 'styled-components';
import { getShopMenu } from '../../../../apollo/queries/shop';
import {
  getShopMenu as ShopMenuInterface,
  getShopMenu_shop_countries as Country,
} from '../../../../apollo/queries/types/getShopMenu';
import { ErrorMsg } from '../../CheckoutInput';
import {
  black,
  cocoBold,
  cocoRegular,
  green,
  grey,
  platinum,
  red,
} from '../../../../styles/constants';
import useClickOutside from '../../../../utils/hooks/ClickOutside';
import { useUserProvider } from '../../../../context/user';

export interface FakeEvent {
  target: {
    name: string;
    value: string;
  };
}

interface Props {
  name: string;
  label: string;
  error?: string;
  selected: string;
  updateValue: (e: React.ChangeEvent<HTMLInputElement> | FakeEvent) => void;
}

const CountriesSelector = ({
  name,
  label,
  error,
  selected,
  updateValue,
}: Props) => {
  const selectRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(null as Country[] | null);

  const openOptions = () => {
    if (!isOpen) setIsOpen(true);
  };

  const filterOptions = (initialOptions: Country[], query: string) => {
    if (query) {
      setOptions(
        initialOptions.filter((option) =>
          option.country
            .toLowerCase()
            .split(' ')
            .some((str) => Boolean(str.startsWith(query.toLowerCase()))),
        ),
      );
    } else {
      setOptions(initialOptions);
    }
  };

  const selectOption = (code: string) => {
    const e: FakeEvent = { target: { name, value: code } };
    updateValue(e);
    setIsOpen(false);
  };

  const getCountryCode = () => {
    if (isOpen && inputRef && inputRef.current) {
      if (options && options.length && inputRef.current.value) {
        const [first] = options;

        const fakeE: FakeEvent = {
          target: { name, value: first.code },
        };

        updateValue(fakeE);
      } else {
        updateValue({ target: { name, value: '' } });
      }
      setIsOpen(false);
    }
  };

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) getCountryCode();
  };

  useClickOutside(selectRef, getCountryCode);

  const {
    state: { currentLanguage },
  } = useUserProvider();

  return (
    <Query query={getShopMenu} variables={{ lang: currentLanguage }}>
      {({ data, loading }: { data: ShopMenuInterface; loading: boolean }) => {
        const countries: Country[] = [];

        if (data?.shop?.countries) {
          data.shop.countries.forEach((country) => {
            if (country) countries.push(country);
          });

          if (!options) setOptions(countries);
        }

        const selectedOption = countries.find(
          (country) => country.code === selected,
        );
        return (
          <Container ref={selectRef}>
            <Select>
              <Input
                ref={inputRef}
                type="text"
                isOpen={isOpen}
                isError={Boolean(error)}
                placeholder={label}
                autoComplete="new-password"
                onClick={openOptions}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (!isOpen) setIsOpen(true);
                  filterOptions(countries, e.target.value);
                }}
                onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
                  handleEnterKey(e);
                }}
              />

              {!isOpen && selected && (
                <SelectedOption
                  isError={Boolean(error)}
                  onClick={() => {
                    setIsOpen(true);
                    if (inputRef && inputRef.current) inputRef.current.focus();
                  }}
                >
                  {(selectedOption && selectedOption.country) || selected}

                  <Label selected={Boolean(selected)} isError={Boolean(error)}>
                    {label}
                  </Label>

                </SelectedOption>
              )}

              {isOpen && (
                <Options
                  onTouchStart={() => {
                    if (inputRef && inputRef.current) {
                      inputRef.current.blur();
                    }
                  }}
                >
                  {options && options.length > 0 ? (
                    options.map((option) => (
                      <Option
                        key={option.code}
                        selected={selected === option.code}
                        onClick={() => {
                          selectOption(option.code);
                        }}
                      >
                        <Name>{option.country}</Name>
                      </Option>
                    ))
                  ) : (
                    <Option>{loading ? 'Loading...' : 'No results'}</Option>
                  )}
                </Options>
              )}
            </Select>

            <ErrorMsg>{error}</ErrorMsg>
          </Container>
        );
      }}
    </Query>
  );
};

export default CountriesSelector;

const Container = styled.div`
  display: block;
`;

const commonStyles = css`
  width: 100%;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  font-size: 16px;
  color: ${black};
  ${cocoRegular};
`;

const inputStyles = css`
  height: 60px;
  padding: 0 15px;
  ${commonStyles}
`;

const Select = styled.div`
  width: 100%;
  position: relative;
`;

const Input = styled.input<{ isOpen: boolean; isError: boolean }>`
  ${inputStyles};
  display: flex;
  justify-items: center;
  background: transparent;
  border-color: ${(p) => (p.isError && !p.isOpen ? red : platinum)};

  &::placeholder {
    ${cocoBold};
    font-size: 12px;
    text-transform: uppercase;
    color: ${(p) => (p.isError && !p.isOpen ? red : grey)};
  }

  &:disabled {
    background: ${platinum};
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

const Options = styled.div`
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 60px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 20;
  -webkit-overflow-scrolling: touch;
  ${commonStyles};
  border-color: ${platinum};
`;

const Option = styled.div<{ selected?: boolean }>`
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid ${platinum};
  background-color: white;
  color: ${(p) => (p.selected ? green : black)};
  overflow-x: hidden;
  z-index: 20;

  :last-of-type {
    border-bottom: none;
  }

  :hover {
    background-color: ${platinum};
  }
`;

const SelectedOption = styled.div<{ isError: boolean }>`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: white;
  ${inputStyles};
  padding-top: 17px;
  border-color: ${(p) => (p.isError ? red : platinum)};
`;

const Name = styled.div`
  max-width: 80%;
  flex-basis: 80%;
  overflow: hidden;
`;

const Label = styled.label<{ selected: boolean; isError: boolean }>`
  position: absolute;
  top: ${(p) => (p.selected ? '14px' : '50%;')};
  left: 15px;
  transform: translateY(-50%);
  text-transform: uppercase;
  color: ${(p) => (p.isError ? red : grey)};
  font-size: ${(p) => (p.selected ? '12px' : '14px;')};
  ${cocoBold};
`;
