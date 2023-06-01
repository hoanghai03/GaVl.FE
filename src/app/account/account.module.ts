import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountRoutingModule } from "./account-routing.module";
import { RegisterComponent } from './register/register.component';
import { AuthService } from "../services/auth.service";
import { AuthenticationService } from "../core/services/auth.service";
import { UserProfileService } from "../core/services/user.service";
import { ToastsContainer } from "./login/toasts-container.component";
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent ,
    ToastsContainer
   ],
  imports: [
    CommonModule,
    FormsModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    NgbToastModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: []
})
export class AccountModule { }
