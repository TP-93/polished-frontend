// @ts-nocheck
import React, { useContext, createContext } from 'react';

import contextProviderFactory from '../contextCreator';
import LanguagesMap, { MultiLanguages } from '../languages';

interface ActionProps {
  type: string;
  payload?: any;
}

interface UserProviderProps {
  children: JSX.Element[] | JSX.Element;
}

interface UserState {
  user: {
    // city: string;
    email: string;
    phone: string;
    // street: string;
    // country: string;
    // lastName: string;
    // firstName: string;
    // postalCode: string;
  };
  currency: string;
  languages: MultiLanguages;
  isPageScrolled: boolean;
  currentLanguage: string;
  isSubsButtonVisible: boolean;
  drawerState: {
    type: string;
    open: boolean;
  };
}

const storageCurrency = 'curr';

export const storageLanguage = 'lang';

const localStorageCurrency = localStorage.getItem(storageCurrency);
const localStorageLanguage = localStorage.getItem(storageLanguage);

const userInitState: UserState = {
  user: {
    // city: '',
    email: '',
    phone: '',
    // street: '',
    // country: '',
    // lastName: '',
    // firstName: '',
    // postalCode: '',
  },
  currency: localStorageCurrency || 'EUR',
  languages: LanguagesMap,
  isPageScrolled: false,
  currentLanguage: localStorageLanguage || 'EN',
  isSubsButtonVisible: false,
  drawerState: {
    type: '',
    open: false,
  },
};

export const userReducer = (state: UserState, action: ActionProps) => {
  switch (action.type) {
    case 'TRIGGER_DRAWER': {
      return { ...state, drawerState: { ...action.payload } };
    }
    case 'SAVE_USER_DATA': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'CHANGE_CURRENCY': {
      localStorage.setItem(storageCurrency, action.payload);

      return { ...state, currency: action.payload };
    }
    case 'CHANGE_LANGUAGE': {
      if (action.payload !== 'EN' && action.payload !== 'NL') {
        localStorage.setItem(storageLanguage, 'EN');

        return { ...state, currentLanguage: 'EN' };
      }

      localStorage.setItem(storageLanguage, action.payload);

      return { ...state, currentLanguage: action.payload };
    }
    case 'CHANGE_POPUP_VISIBILIY': {
      return { ...state, isSubsButtonVisible: action.payload };
    }
    case 'TOGGLE_SCROLL_STATUS': {
      return { ...state, isPageScrolled: action.payload };
    }

    default:
      return state;
  }
};

export const UserContext = createContext<UserState>(userInitState);

const RawUserProvider = contextProviderFactory(UserContext);

export const useUserProvider: () => any = () => useContext(UserContext);

export const UserProvider = ({ children }: UserProviderProps) => (
  <RawUserProvider initialState={userInitState} reducer={userReducer}>
    {children}
  </RawUserProvider>
);
