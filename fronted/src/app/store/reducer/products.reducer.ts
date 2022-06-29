import { createReducer, on } from '@ngrx/store';
import * as productsActions from '../actions/products.actions';

export interface IProductsState {
  loaded: boolean;
  loading: boolean;
  error: any;
  sku: string;
  products: any[];
  skus: string[];
  currency: string;
}

export const initialProductsState: IProductsState = {
  loaded: false,
  loading: false,
  error: null,
  sku: '',
  skus: [],
  products: [],
  currency: 'COP',
};

const _reducerProducts = createReducer(
  initialProductsState,
  on(productsActions.loadSkuProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(productsActions.loadSkuProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    loaded: true,
    skus: products,
  })),
  on(productsActions.loadSkuProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(productsActions.loadProductsWithCurrency, (state, { request }) => ({
    ...state,
    loading: true,
    error: null,
    sku: request.sku,
    currency: request.currency,
  })),
  on(productsActions.loadProductsWithCurrencySuccess, (state, { product }) => ({
    ...state,
    loading: false,
    loaded: true,
    products: product,
  })),
  on(productsActions.loadProductsWithCurrencyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  }))
);

export function reducerProducts(state: any, action: any) {
  return _reducerProducts(state, action);
}
