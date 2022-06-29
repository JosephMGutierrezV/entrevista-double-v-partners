import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRequestProductsWithCurrency } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  getSkuProducts() {
    return this.http
      .get(`${environment.API_URL}/api/products/get-sku-products`)
      .pipe(map((resp: any) => resp['products']));
  }

  getCurrency() {
    return this.http
      .get(`${environment.API_URL}/api/currency/get-currency`)
      .pipe(map((resp: any) => resp['data']));
  }

  getProductsWithCurrency(request: IRequestProductsWithCurrency) {
    return this.http
      .get(
        `${environment.API_URL}/api/products/get-products/${request.sku}/${request.currency}`
      )
      .pipe(map((resp: any) => resp['product']));
  }
}
