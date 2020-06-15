import { Injectable } from '@angular/core';
import {PriceCode} from '../models/priceCode.model';
import {ProductCategory} from '../models/productCategory.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PriceCodeResponse} from './price-code.service';

export interface ProductCategoryResponse{
  success: number;
  data: ProductCategory[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  productCategories: ProductCategory[] = [];
  productCategorySubject = new Subject<ProductCategory[]>();
  constructor(private http: HttpClient) {
    this.http.get('http://127.0.0.1:8000/api/productCategory')
      .subscribe((response: ProductCategoryResponse) => {
        const {data} = response;
        this.productCategories = data;
        this.productCategorySubject.next([...this.productCategories]);
      });
  }
  getProductCategoryUpdateListener(){
    return this.productCategorySubject.asObservable();
  }
}
