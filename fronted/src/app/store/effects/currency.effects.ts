import { ServiceService } from './../../services/service.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as actions from '../actions';

@Injectable()
export class CurrencyEffects {
  constructor(private actions$: Actions, private service: ServiceService) {}

  loadCurrency$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.currency.loadCurrency),
      mergeMap(() =>
        this.service.getCurrency().pipe(
          map((resp) =>
            actions.currency.loadCurrencySuccess({ currency: resp })
          ),
          catchError((err) =>
            of(actions.currency.loadCurrencyFailure({ error: err }))
          )
        )
      )
    )
  );
}
