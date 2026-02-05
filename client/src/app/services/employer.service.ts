import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Employer } from '../models/employer.model';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
  http = inject(HttpClient);

  private readonly _baseApiUrl: string = environment.apiUrl + 'api/employer/';

  getByUserName(userNameInput: string): Observable<Employer | undefined> {
    return this.http.get<Employer>(this._baseApiUrl + 'get-by-username/' + userNameInput);
  }
}