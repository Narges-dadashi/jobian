import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Advertisement } from '../models/advertisement.model';
import { Observable } from 'rxjs';
import { AdvertisementResponse } from '../models/advertisement-response';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  private _http = inject(HttpClient);

  createAdvertisement(advertisement: Advertisement): Observable<AdvertisementResponse | null> {
    return this._http.post<AdvertisementResponse>('http://localhost:5000/api/advertisement/create-advertisement', advertisement);
  }
}