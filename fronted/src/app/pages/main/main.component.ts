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

  public listsProducts: any[] = [];

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
    this.subscriptions.push(
      this.store.select('products').subscribe(({ products }) => {
        this.listsProducts = products;
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
    if (event) {
      if (
        this.selectedSku !== '' &&
        this.selectedSku !== undefined &&
        this.selectedSku !== null
      ) {
        const request = {
          sku: this.selectedSku,
          currency: event.value,
        };
        this.store.dispatch(
          actions.products.loadProductsWithCurrency({ request })
        );
      }
    }
  }

  onClick(name: string) {
    this.listsProducts = this.listsProducts.map((product) => {
      if (product.name === name) {
        return { ...product, isSelected: !product.isSelected };
      }
      return product;
    });
  }

  onClickUpdate(product: any) {
    const valueNewTasa = (<HTMLInputElement>(
      document.getElementById(product.name + 'Value')
    )).value;

    const request = {
      sku: this.selectedSku,
      currency: this.selectedCurrency ? this.selectedCurrency : 'COP',
    };

    this.store.dispatch(actions.products.loadProductsWithCurrency({ request }));

    setTimeout(() => {
      if (valueNewTasa) {
        this.listsProducts = this.listsProducts.map((product) => {
          if (product.name === product.name) {
            const newPrice = product.price * parseFloat(valueNewTasa);
            return { ...product, price: newPrice };
          }
          return product;
        });
      }
    }, 250);
  }
}
