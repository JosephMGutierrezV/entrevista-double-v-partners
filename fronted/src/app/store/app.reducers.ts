import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducer';

export interface AppState {
  products: reducers.IProductsState;
  currency: reducers.ICurrencyState;
}

export const appReducers: ActionReducerMap<AppState> = {
  products: reducers.reducerProducts,
  currency: reducers.reducerCurrency,
};
