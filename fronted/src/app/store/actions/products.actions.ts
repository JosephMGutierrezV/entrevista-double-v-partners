import { createAction, props } from '@ngrx/store';
import { IRequestProductsWithCurrency } from 'src/app/interfaces/interfaces';

export const loadSkuProducts = createAction('[Products] Load SKU Products');

export const loadSkuProductsSuccess = createAction(
  '[Products] Load SKU Products Success',
  props<{ products: any[] }>()
);

export const loadSkuProductsFailure = createAction(
  '[Products] Load SKU Products Failure',
  props<{ error: any }>()
);

export const loadProductsWithCurrency = createAction(
  '[Products] Load Products With Currency',
  props<{ request: IRequestProductsWithCurrency }>()
);

export const loadProductsWithCurrencySuccess = createAction(
  '[Products] Load Products With Currency Success',
  props<{ product: any[] }>()
);

export const loadProductsWithCurrencyFailure = createAction(
  '[Products] Load Products With Currency Failure',
  props<{ error: any }>()
);
