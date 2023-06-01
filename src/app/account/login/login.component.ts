import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable,  Subject,  timer } from 'rxjs';
import { first, map,  switchMap, tap } from "rxjs/operators";
import { Auth } from 'src/app/models/auth/auth';
import { JwtModel } from 'src/app/models/auth/jwt';
import { Router } from '@angular/router';
import { ToastService } from './toast-service';
import { AuthenticationService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
      // Login Form
  loginForm : FormGroup;
  submitted = false;
  fieldTextType!: boolean;
  formSubmit$ = new Subject<any>();
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,private router: Router,public toastService: ToastService) {
    this.loginForm = this.formBuilder.group({
        username: [
                '', 
                Validators.compose([
                  Validators.required,
                  Validators.minLength(6)
                ])
              ],
        password: ['', 
                Validators.compose([
                  Validators.required
                ])
              ],
        code2: ['', 
              Validators.compose([
                Validators.required
              ])
            ],
      });
  }

  ngOnInit(): void {
  }

  onSubmit() : void {
    this.authenticationService.login(this.f['username'].value,this.f['password'].value,this.f['code2'].value).pipe(first()).subscribe(
      (data: any) => {
        if(!data.isValid) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('expiration', data.expiration);
          localStorage.setItem('id', data.id);
          localStorage.setItem('username', data.username);
          this.router.navigate(['']);
        } else {
          this.toastService.show("Sai tài khoản hoặc mật khẩu, nhập lại đi bro", { classname: 'bg-danger text-white', delay: 15000 });
        }
      }
    )
  }

    /**
     * Password Hide/Show
     */
    toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
    }
}
