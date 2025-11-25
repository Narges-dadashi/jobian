import { Component, inject } from '@angular/core';
import { AccountService } from '../../../../services/account.service';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { JobSeekerRegister } from '../../../../models/job-seeker-register.model';

@Component({
  selector: 'app-job-seeker-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule, ReactiveFormsModule
  ],
  templateUrl: './job-seeker-register.component.html',
  styleUrl: './job-seeker-register.component.scss'
})
export class JobSeekerRegisterComponent {
  accountService = inject(AccountService);
  fB = inject(FormBuilder);
  subscribedRegisterUser: Subscription | undefined;
  errors: string[] | undefined;

  passwordsNotMatch: boolean | undefined;

  ngOnDestroy(): void {
    this.subscribedRegisterUser?.unsubscribe();
  }

  registerFg = this.fB.group({
    emailCtrl: ['', [Validators.required, Validators.email]],
    userNameCtrl: ['', [Validators.required]],
    passwordCtrl: ['', [Validators.required]],
    confirmPasswordCtrl: ['', [Validators.required]]
  });

  get EmailCtrl(): FormControl {
    return this.registerFg.get('emailCtrl') as FormControl;
  }

  get UserNameCtrl(): FormControl {
    return this.registerFg.get('userNameCtrl') as FormControl;
  }

  get PasswordCtrl(): FormControl {
    return this.registerFg.get('passwordCtrl') as FormControl;
  }

  get ConfirmPasswordCtrl(): FormControl {
    return this.registerFg.get('confirmPasswordCtrl') as FormControl;
  }

  register(): void {
    if (this.PasswordCtrl.value === this.ConfirmPasswordCtrl.value) {
      let user: JobSeekerRegister = {
        email: this.EmailCtrl.value,
        userName: this.UserNameCtrl.value,
        password: this.PasswordCtrl.value,
        confirmPassword: this.ConfirmPasswordCtrl.value
      }

      this.subscribedRegisterUser = this.accountService.jobSeekerRegister(user).subscribe({
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