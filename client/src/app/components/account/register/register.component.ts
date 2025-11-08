import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { Register } from '../../../models/register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule, ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  accountService = inject(AccountService);
  fB = inject(FormBuilder);
  subscribedRegisterUser: Subscription | undefined;

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
      let user: Register = {
        email: this.EmailCtrl.value,
        userName: this.UserNameCtrl.value,
        password: this.PasswordCtrl.value,
        confirmPassword: this.ConfirmPasswordCtrl.value
      }

      this.subscribedRegisterUser = this.accountService.register(user).subscribe({
        next: (res) => console.log(res),
        error: (err) => console.log(err.error)
      })
    }
    else {
      this.passwordsNotMatch = true;
    }
  }
}