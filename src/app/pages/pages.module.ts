import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbToastModule
} from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CountToModule } from 'angular-count-to';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { LightboxModule } from 'ngx-lightbox';

// Load Icons
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Pages Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { AppsModule } from "./apps/apps.module";

import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbToastModule,
    FlatpickrModule.forRoot(),
    CountToModule,
    NgApexchartsModule,
    LeafletModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    PagesRoutingModule,
    NgxUsefulSwiperModule,
    LightboxModule,
    QRCodeModule,
    AppsModule,
  ],
  providers: [
  ],
})
export class PagesModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
