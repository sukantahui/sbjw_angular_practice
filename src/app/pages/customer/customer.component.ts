import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../models/customer.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UpdateSncakBarComponent} from './update-sncak-bar/update-sncak-bar.component';
import {Observable} from 'rxjs';
import {AuthResponseData} from '../../services/auth.service';

// @ts-ignore
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customers: Customer[];
  customer: Customer;
  currentEerror: {status: number, message: string, statusText: string};

  constructor(public customerService: CustomerService, private http: HttpClient, private _snackBar: MatSnackBar) {
    console.log('Customer Component calls');
  }

  onCustomerInsert(){
    // this.customerService.setData({id: 1061, name: 'Sujata Barai Station Para', address: 'Station Para', phone: '9232458905'});
    // tslint:disable-next-line:max-line-length
    this.http.post('https://angular-test-db-67686.firebaseio.com/customers.json',
      {name: 'Sandip Dhara', address: 'Barrackpore Shibtala', phone: '5236458905'})
      .subscribe((response) => {
      });
  }

  ngOnInit(): void {
     // this.customers = this.customerService.getCustomers();
     this.customerForm = this.customerService.customerForm;
     // this.customerService.getCustomerUpdateListener();
  }

  onGetCustomers() {
    // tslint:disable-next-line:no-unused-expression
  }

  onSubmit() {
    console.log(this.customerForm.value);
    this.customerService.saveCustomer(this.customerForm.value);
  }

  myCustomValidation(control: FormControl): {[s: string]: boolean } {
      return {customError: true};
  }

  fillFormForUpdate($event){
    this.customerForm.setValue($event);
  }

  clearCustomerForm() {
    this.customerForm.reset();
  }

  // this function will update the customer
  updateCustomer() {
    let updateObserable = new Observable<any>();
    updateObserable = this.customerService.updateCustomer(this.customerForm.value);


    updateObserable.subscribe((response) => {
      if (response.success == 1){
        this._snackBar.openFromComponent(UpdateSncakBarComponent, {
          duration: 4000, data: {message: 'Hello World!'}
        });
      }
      this.currentEerror = null;
    }, (error) => {
      console.log('error occured ');
      console.log(error);
      this.currentEerror = error;
      this._snackBar.openFromComponent(UpdateSncakBarComponent, {
        duration: 4000, data: {message: error.message}
      });
    });

    // console.log(updateObserable);

  }
}
