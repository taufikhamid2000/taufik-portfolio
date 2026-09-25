'use client';

import { createContext, useContext } from 'react';
import { PES_DICT, type PesDict } from '../pes-i18n';
import type { PesLocale } from '../types';

const LocaleContext = createContext<PesLocale>('en');

export const PesLocaleProvider = LocaleContext.Provider;

/** Current PES UI language. */
export function useLocale(): PesLocale {
  return useContext(LocaleContext);
}

/** Translated UI strings for the current PES language. */
export function useT(): PesDict {
  return PES_DICT[useContext(LocaleContext)];
}
