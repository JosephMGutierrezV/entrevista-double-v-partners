import { IRequestProductsWithCurrency } from './../../interfaces/interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Dropdown } from 'primeng/dropdown';
import { AppState } from 'src/app/store/app.reducers';
import * as actions from '../../store/actions';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('selectCurrency') selectCurrency!: Dropdown;

  public sku!: any[];

  public selectedSku: any;

  public currency!: any[];

  public selectedCurrency: any;

  public subscriptions: any[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(actions.currency.loadCurrency());
    this.subscriptions.push(
      this.store.select('currency').subscribe(({ currencys }) => {
        if (currencys.length !== 0) {
          this.currency = currencys;
          this.selectCurrency.value = currencys[1].code;
        }
      })
    );
    this.store.dispatch(actions.products.loadSkuProducts());
    this.subscriptions.push(
      this.store.select('products').subscribe(({ skus }) => {
        this.sku = skus;
      })
    );
  }

  onChangeSku(event: any) {
    if (event) {
      const request = {
        sku: event.value,
        currency: this.selectedCurrency ? this.selectedCurrency : 'COP',
      };
      this.store.dispatch(
        actions.products.loadProductsWithCurrency({ request })
      );
    }
  }

  onChangeCurrency(event: any) {
    console.log(event);
    console.log(this.selectedCurrency);
  }
}
