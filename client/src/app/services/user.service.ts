import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/helpers/apiResponse.model';
import { JobSeekerUpdate } from '../models/job-seeker-update.model';
import { EmployerUpdate } from '../models/employer-update.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _http = inject(HttpClient);
  private readonly _apiUrl = environment.apiUrl + 'api/user/';

  updateUser(userInput: JobSeekerUpdate): Observable<ApiResponse> {
    return this._http.put<ApiResponse>(this._apiUrl + 'update-job-seeker', userInput);
  }

  updateEmployer(userInput: EmployerUpdate): Observable<ApiResponse> {
    return this._http.put<ApiResponse>(this._apiUrl + 'update-employer', userInput);
  }

  setMainPhoto(url_165: string): Observable<ApiResponse> {
    let queryParams = new HttpParams().set('photoUrlIn', url_165);

    return this._http.put<ApiResponse>(this._apiUrl + 'set-main-photo', null, {
      params: queryParams
    });
  }

  deletePhoto(url_165: string): Observable<ApiResponse> {
    let queryParams = new HttpParams().set('photoUrlIn', url_165);

    return this._http.put<ApiResponse>(this._apiUrl + 'delete-photo', null, {
      params: queryParams
    });
  }
}