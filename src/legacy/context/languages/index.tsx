// @ts-nocheck
import EN from './en';
import NL from './nl';

export interface MultiLanguages {
  [key: string]: object;
}

const multiLanguages: MultiLanguages = {
  EN,
  NL,
};

export default multiLanguages;
