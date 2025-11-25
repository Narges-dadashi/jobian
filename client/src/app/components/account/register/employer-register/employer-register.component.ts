import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from '../../../../services/account.service';
import { EmployerRegister } from '../../../../models/employer-register.model';

@Component({
  selector: 'app-employer-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule, ReactiveFormsModule
  ],
  templateUrl: './employer-register.component.html',
  styleUrl: './employer-register.component.scss'
})
export class EmployerRegisterComponent {
  accountService = inject(AccountService);
  fB = inject(FormBuilder);
  subscribedRegisterUser: Subscription | undefined;
  errors: string[] | undefined;

  passwordsNotMatch: boolean | undefined;

  ngOnDestroy(): void {
    this.subscribedRegisterUser?.unsubscribe();
  }

  registerFg = this.fB.group({
    companyEmailCtrl: ['', [Validators.required, Validators.email]],
    companyNameCtrl: ['', [Validators.required]],
    passwordCtrl: ['', [Validators.required]],
    confirmPasswordCtrl: ['', [Validators.required]]
  });

  get CompanyEmailCtrl(): FormControl {
    return this.registerFg.get('companyEmailCtrl') as FormControl;
  }

  get CompanyNameCtrl(): FormControl {
    return this.registerFg.get('companyNameCtrl') as FormControl;
  }

  get PasswordCtrl(): FormControl {
    return this.registerFg.get('passwordCtrl') as FormControl;
  }

  get ConfirmPasswordCtrl(): FormControl {
    return this.registerFg.get('confirmPasswordCtrl') as FormControl;
  }

  register(): void {
    if (this.PasswordCtrl.value === this.ConfirmPasswordCtrl.value) {
      let user: EmployerRegister = {
        companyEmail: this.CompanyEmailCtrl.value,
        companyName: this.CompanyNameCtrl.value,
        password: this.PasswordCtrl.value,
        confirmPassword: this.ConfirmPasswordCtrl.value
      }

      this.subscribedRegisterUser = this.accountService.employerRegister(user).subscribe({
        next: (res) => console.log(res),
        error: (err: HttpErrorResponse) => {
          if (err.error.errors) {
            this.errors = err.error.errors
          }
        }
      })
    }
    else {
      this.passwordsNotMatch = true;
    }
  }
}