import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { JobSeeker } from '../models/job-seeker.model';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerService {
  http = inject(HttpClient);

  private readonly _baseApiUrl: string = environment.apiUrl + 'api/jobseeker/';

  getByUserName(userNameInput: string): Observable<JobSeeker | undefined> {
    return this.http.get<JobSeeker>(this._baseApiUrl + 'get-by-username/' + userNameInput);
  }
}