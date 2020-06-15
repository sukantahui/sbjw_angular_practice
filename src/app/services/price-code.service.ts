import { Injectable } from '@angular/core';
import {PriceCode} from '../models/priceCode.model';
import {Product} from '../models/product.model';
import {Subject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

export interface PriceCodeResponse{
  success: number;
  data: PriceCode[];
}

@Injectable({
  providedIn: 'root'
})
export class PriceCodeService {
  priceCodes: PriceCode[] = [];
  priceCodeSubject = new Subject<PriceCode[]>();

  constructor(private http: HttpClient) {
    this.http.get('http://127.0.0.1:8000/api/priceCodes')
      .subscribe((response: PriceCodeResponse) => {
        const {data} = response;
        this.priceCodes = data;
        this.priceCodeSubject.next([...this.priceCodes]);
      });
  }
  getPriceCodeUpdateListener(){
    return this.priceCodeSubject.asObservable();
  }
}
