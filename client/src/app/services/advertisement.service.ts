import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Advertisement } from '../models/advertisement.model';
import { Observable } from 'rxjs';
import { AdvertisementResponse } from '../models/advertisement-response';
import { PaginationHandler } from '../extensions/paginationHandler';
import { PaginationParams } from '../models/helpers/paginationParams.model';
import { PaginatedResult } from '../models/helpers/paginatedResult';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  private _http = inject(HttpClient);
  private _paginationHandler = new PaginationHandler();

  createAdvertisement(advertisement: Advertisement): Observable<AdvertisementResponse | null> {
    return this._http.post<AdvertisementResponse>('http://localhost:5000/api/advertisement/create-advertisement', advertisement);
  }

  getAllAdvertisements(paginationParams: PaginationParams): Observable<PaginatedResult<AdvertisementResponse[]>> {
    let params = new HttpParams();

    params = params.append('pageSize', paginationParams.pageSize);
    params = params.append('pageNumber', paginationParams.pageNumber);

    return this._paginationHandler.getPaginatedResult<AdvertisementResponse[]>('http://localhost:5000/api/advertisement/get-all', params);
  }
}