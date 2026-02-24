import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Advertisement } from '../models/advertisement.model';
import { Observable } from 'rxjs';
import { AdvertisementResponse } from '../models/advertisement-response';
import { PaginationHandler } from '../extensions/paginationHandler';
import { PaginatedResult } from '../models/helpers/paginatedResult';
import { AdvertisementParams } from '../models/helpers/advertisement-params';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  private _http = inject(HttpClient);
  private _paginationHandler = new PaginationHandler();

  createAdvertisement(advertisement: Advertisement): Observable<AdvertisementResponse | null> {
    return this._http.post<AdvertisementResponse>('http://localhost:5000/api/advertisement/create-advertisement', advertisement);
  }

  getAllAdvertisements(advertisementParams: AdvertisementParams): Observable<PaginatedResult<AdvertisementResponse[]>> {
    const params = this.getHttpParams(advertisementParams);

    return this._paginationHandler.getPaginatedResult<AdvertisementResponse[]>('http://localhost:5000/api/advertisement/get-all', params);
  }

  private getHttpParams(advertisementParams: AdvertisementParams): HttpParams {
    let params = new HttpParams();

    if (advertisementParams) {
      params = params.append('search', advertisementParams.search);
      params = params.append('orderBy', advertisementParams.orderBy);
    }

    return params;
  }
}