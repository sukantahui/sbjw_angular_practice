import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MaterialModule } from './core/material.module';



import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductComponent } from './pages/product/product.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { HomeComponent } from './pages/home/home.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PictureCarouselComponent } from './pages/home/picture-carousel/picture-carousel.component';
import { CustomerListComponent } from './pages/customer/customer-list/customer-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthComponent } from './pages/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import {AuthInterceptorInterceptor} from './services/auth-interceptor.interceptor';
import { OwnerComponent } from './pages/owner/owner.component';
import {NgxPrintModule} from 'ngx-print';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { UpdateSncakBarComponent } from './pages/customer/update-sncak-bar/update-sncak-bar.component';
import { ConfirmationDialogComponent } from './common/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    CustomerComponent,
    HomeComponent,
    PictureCarouselComponent,
    CustomerListComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    OwnerComponent,
    UpdateSncakBarComponent,
    ConfirmationDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPrintModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
