import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Login } from '../../../models/login.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule, ReactiveFormsModule,
    MatCardModule,
    MatButtonModule, MatFormFieldModule, MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  accountService = inject(AccountService);
  fB = inject(FormBuilder);

  loginFg = this.fB.group({
    emailCtrl: ['', [Validators.required, Validators.email]],
    passwordCtrl: ['']
  })

  get EmailCtrl(): FormControl {
    return this.loginFg.get('emailCtrl') as FormControl;
  }

  get PasswordCtrl(): FormControl {
    return this.loginFg.get('passwordCtrl') as FormControl;
  }

  login(): void {
    let userInput: Login = {
      email: this.EmailCtrl.value,
      password: this.PasswordCtrl.value
    }

    this.accountService.login(userInput).subscribe();
  }
}