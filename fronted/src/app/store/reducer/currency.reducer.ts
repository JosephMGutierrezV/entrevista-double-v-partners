import { createReducer, on } from '@ngrx/store';
import * as currencyActions from '../actions/currency.actions';

export interface ICurrencyState {
  loaded: boolean;
  loading: boolean;
  error: any;
  currencys: any[];
}

export const initialCurrencyState: ICurrencyState = {
  loaded: false,
  loading: false,
  error: null,
  currencys: [],
};

const _reducerCurrency = createReducer(
  initialCurrencyState,
  on(currencyActions.loadCurrency, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(currencyActions.loadCurrencySuccess, (state, { currency }) => ({
    ...state,
    loading: false,
    loaded: true,
    currencys: currency,
  })),
  on(currencyActions.loadCurrencyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  }))
);

export function reducerCurrency(state: any, action: any) {
  return _reducerCurrency(state, action);
}
