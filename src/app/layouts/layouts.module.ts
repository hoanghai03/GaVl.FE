import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { HorizontalTopbarComponent } from './horizontal-topbar/horizontal-topbar.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { LayoutComponent } from './layout.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../core/services/language.service';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TwoColumnComponent } from './two-column/two-column.component';
import { TwoColumnSidebarComponent } from './two-column-sidebar/two-column-sidebar.component';

@NgModule({
  declarations: [ 
    FooterComponent,
    SidebarComponent,
    TopbarComponent,
    HorizontalComponent,
    HorizontalTopbarComponent,
    RightsidebarComponent,
    LayoutComponent,
    TwoColumnComponent,
    TwoColumnSidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SimplebarAngularModule,
    TranslateModule,
    NgbDropdownModule,
    NgbNavModule,
  ],
  providers: []
})
export class LayoutsModule { }
