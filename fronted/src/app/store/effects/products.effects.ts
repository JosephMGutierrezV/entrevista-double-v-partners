import { ServiceService } from './../../services/service.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as actions from '../actions';

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private service: ServiceService) {}

  loadSkuProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.products.loadSkuProducts),
      mergeMap(() =>
        this.service.getSkuProducts().pipe(
          map((resp) =>
            actions.products.loadSkuProductsSuccess({ products: resp })
          ),
          catchError((err) =>
            of(actions.products.loadSkuProductsFailure({ error: err }))
          )
        )
      )
    )
  );

  loadProductsWithCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.products.loadProductsWithCurrency),
      mergeMap((request: any) =>
        this.service.getProductsWithCurrency(request).pipe(
          map((resp: any[]) =>
            actions.products.loadProductsWithCurrencySuccess({ product: resp })
          ),
          catchError((err) =>
            of(actions.products.loadProductsWithCurrencyFailure({ error: err }))
          )
        )
      )
    )
  );
}
