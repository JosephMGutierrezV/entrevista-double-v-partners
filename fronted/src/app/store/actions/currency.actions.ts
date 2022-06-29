import { createAction, props } from '@ngrx/store';

export const loadCurrency = createAction('[Currency] Load Currency');

export const loadCurrencySuccess = createAction(
  '[Currency] Load Currency Success',
  props<{ currency: any[] }>()
);

export const loadCurrencyFailure = createAction(
  '[Currency] Load Currency Failure',
  props<{ error: any }>()
);
