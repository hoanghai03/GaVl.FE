import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';

// Register Auth
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { UserProfileService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { filter, first, startWith, switchMap, take, tap } from 'rxjs/operators';
import { Observable, Subject, timer } from 'rxjs';
import { ToastService } from '../login/toast-service';

const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * Register Component
 */
export class RegisterComponent implements OnInit {
  formSubmit$ = new Subject<any>();
  // Login Form
  signupForm!: UntypedFormGroup;
  submitted = false;
  successmsg = false;
  error = '';
  // set the current year
  year: number = new Date().getFullYear();

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private authenticationService: AuthenticationService,public toastService: ToastService) { }

  ngOnInit(): void {
    this.initForm();
    this.formSubmit$.pipe(
      tap(() => this.signupForm.markAsDirty()),
      switchMap(()=>{
        return this.signupForm.statusChanges.pipe(
          startWith(this.signupForm.status),
          filter((status) => status !== "PENDING"),
          take(1)
        )
      }),
      filter(status => status === "VALID")
    ).subscribe(validateSuccessFul => this.onSubmit());
  }

  validateUsernameFromApi(control: AbstractControl): Observable<ValidationErrors | null> {
    return timer(3000).pipe(
      switchMap(() => {
        return this.authenticationService.getByUsername(control.value);
      })
    )
  }
  initForm() {
    /**
         * Form Validatyion
         */
    this.signupForm = this.formBuilder.group({
      username: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ]),
        this.validateUsernameFromApi.bind(this)
      ],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(PASSWORD_PATTERN)])],
      rePassword: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern(PASSWORD_PATTERN)])],
    },
    {
      validators: this.validateControlsValue('password', 'rePassword'),
    });
  }

  validateControlsValue(firstControlName: string, secondControlName: string) {
    return function (formGroup: UntypedFormGroup) {
      const password = formGroup.get(firstControlName)?.value;
      const confirmPassword = formGroup.get(secondControlName)?.value;
      return password === confirmPassword
        ? null
        : {
            valueNotMatch: {
              password,
              confirmPassword,
            },
          };
    };
  }

  /**
   * Register submit form
   */
  onSubmit() {
    this.submitted = true;

    //Register Api
    this.authenticationService.register(this.f['username'].value, this.f['password'].value, this.f['rePassword'].value).pipe(first()).subscribe(
      (data: any) => {
        if(data > 0) {
          // hiển thị thông báo đăng nhập thành công
          this.toastService.show("Tạo tài khoản thành công", { classname: 'bg-danger text-white', delay: 15000 });
          // chuyển link
          this.router.navigate(['/auth/login']);
        }
        else {
          // hiển thị thông báo đăng nhập thất bại
          this.toastService.show("Tạo tài khoản không thành công", { classname: 'bg-danger text-white', delay: 15000 });
        }
      })
  }

}
