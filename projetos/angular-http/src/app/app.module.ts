import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AngularHttpRoutingModule } from './elements/angular-http-element/angular-http-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    AngularHttpRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppModule { }
