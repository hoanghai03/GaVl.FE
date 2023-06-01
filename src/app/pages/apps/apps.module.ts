import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbTooltipModule, NgbDropdownModule, NgbAccordionModule, NgbProgressbarModule, NgbNavModule, NgbPaginationModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Emoji Picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';

// Calendar package
import { FullCalendarModule } from '@fullcalendar/angular';

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';
// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';
// Ck Editer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// Counter
import { CountToModule } from 'angular-count-to';
// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// Load Icon
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

//  Drag and drop
import { DndModule } from 'ngx-drag-drop';

// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';

// NG2 Search Filter
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// drag and droup row table
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';

// Component Pages
import { AppsRoutingModule } from "./apps-routing.module";
// import { SharedModule } from '../../shared/shared.module';
import { ChatComponent } from './chat/chat.component';

import { DatePipe } from '@angular/common';


// Mask
import { NgxMaskModule } from 'ngx-mask';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { GenQrComponent } from './gen-qr/gen-qr.component';
import { QRCodeModule } from 'angular2-qrcode';

@NgModule({
  declarations: [
    ChatComponent,
    GenQrComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbProgressbarModule,
    NgbNavModule,
    NgbPaginationModule,
    NgbCollapseModule,
    FeatherModule.pick(allIcons),
    FullCalendarModule,
    FlatpickrModule.forRoot(),
    SimplebarAngularModule,
    CKEditorModule,
    CountToModule,
    NgApexchartsModule,
    LeafletModule,
    AppsRoutingModule,
    // SharedModule,
    PickerModule,
    DndModule,
    NgSelectModule,
    DragDropModule,
    MatTableModule,
    FlexLayoutModule,
    Ng2SearchPipeModule,
    NgxUsefulSwiperModule,
    QRCodeModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    DatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppsModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
