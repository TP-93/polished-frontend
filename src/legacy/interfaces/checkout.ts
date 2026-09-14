// @ts-nocheck
export interface Bank {
  id: number;
  name: string;
}

export interface PaymentProvider {
  id: number;
  name: string;
  logo: string;
}

export interface Product {
  id: number;
  image: string;
  type: string;
  name: string;
  color: string;
  quantity: number;
  size: string;
  price: number;
  discount: boolean;
  discountPercentage: number;
  discountPrice: number;
}

export const blankAddress = {
  firstName: '',
  lastName: '',
  postalCode: '',
  city: '',
  countryArea: '',
  country: '',
  phone: '',
  streetAddress1: '',
  houseNumberAddition: '',
  houseNumber: '',
};

export interface Address {
  firstName: string;
  lastName: string;
  postalCode: string;
  city: string;
  country: string;
  countryArea: string;
  phone: string | number | null;
  streetAddress1: string;
  houseNumberAddition: string;
  houseNumber: string | number | null;
}

export const blankShippingAddress = {
  companyName: '',
  ...blankAddress,
};

export const blankAddressErrors = {
  firstName: '',
  lastName: '',
  postalCode: '',
  city: '',
  countryArea: '',
  country: '',
  phone: '',
  streetAddress1: '',
  houseNumber: '',
  houseNumberAddition: '',
};

export interface AddressErrors {
  firstName?: string;
  lastName?: string;
  postalCode?: string;
  houseNumber?: string;
  streetAddress1?: string;
  city?: string;
  countryArea?: string;
  country?: string;
  phone?: string;
  houseNumberAddition?: string;
}

export interface ShippingAddress extends Address {
  companyName: string;
}

export const blankShippingAddressErrors = {
  companyName: '',
  ...blankAddressErrors,
};

export interface ShippingAddressErrors extends AddressErrors {
  companyName?: string;
}
