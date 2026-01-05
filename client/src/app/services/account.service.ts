import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { LoggedIn } from '../models/logged-in.model';
import { map, Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { JobSeekerRegister } from '../models/job-seeker-register.model';
import { EmployerRegister } from '../models/employer-register.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  http = inject(HttpClient);
  private readonly _baseApiUrl: string = environment.apiUrl + 'api/';
  platformId = inject(PLATFORM_ID);
  router = inject(Router);
  loggedInUserSig = signal<LoggedIn | null>(null);

  jobSeekerRegister(userInput: JobSeekerRegister): Observable<LoggedIn | null> {
    return this.http.post<LoggedIn>(this._baseApiUrl + 'account/register-job-seeker', userInput).pipe(
      map(res => {
        if (res) {
          this.setCurrentUser(res);

          this.router.navigateByUrl('advertisements');

          return res;
        }

        return null;
      })
    );
  }

  employerRegister(userInput: EmployerRegister): Observable<LoggedIn | null> {
    return this.http.post<LoggedIn>(this._baseApiUrl + 'account/register-employer ', userInput).pipe(
      map(res => {
        if (res) {
          this.setCurrentUser(res);

          this.router.navigateByUrl('create-advertisement');

          return res;
        }

        return null;
      })
    );
  }

  login(userInput: Login): Observable<LoggedIn | null> {
    return this.http.post<LoggedIn>(this._baseApiUrl + 'account/login', userInput).pipe(
      map(res => {
        if (res) {
          this.setCurrentUser(res);

          this.router.navigateByUrl('create-advertisement');

          return res;
        }
        return null;
      })
    );
  }

  authorizeLoggedInUser(): void {
    this.http.get<LoggedIn>(this._baseApiUrl + 'account').subscribe({
      next: (res) => {
        if (res)
          console.log(res);
        this.setCurrentUser(res);
      },
      error: (err) => {
        console.log(err.error);
        this.logout();
      }
    });
  }

  setCurrentUser(loggedIn: LoggedIn): void {
    this.setLoggedInUserRoles(loggedIn);

    this.loggedInUserSig.set(loggedIn);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('loggedInUser', JSON.stringify(loggedIn));
    }
  }

  setLoggedInUserRoles(loggedInUser: LoggedIn): void {
    loggedInUser.roles = [];

    const roles: string | string[] = JSON.parse(atob(loggedInUser.token.split('.')[1])).role;

    Array.isArray(roles) ? loggedInUser.roles = roles : loggedInUser.roles.push(roles);
  }

  logout(): void {
    this.loggedInUserSig.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }

    this.router.navigateByUrl('account/login');
  }
}