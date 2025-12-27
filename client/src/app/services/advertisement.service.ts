import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
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

  private readonly _baseApiUrl: string = environment.apiUrl + 'api/advertisement';
  private _paginationHandler = new PaginationHandler();

  createAdvertisement(advertisement: Advertisement): Observable<AdvertisementResponse | null> {
    return this._http.post<AdvertisementResponse>(this._baseApiUrl + 'advertisement/create-advertisement', advertisement);
  }

  getAllAdvertisements(paginationParams: PaginationParams): Observable<PaginatedResult<AdvertisementResponse[]>> {
    let params = new HttpParams();

    params = params.append('pageSize', paginationParams.pageSize);
    params = params.append('pageNumber', paginationParams.pageNumber);

    return this._paginationHandler.getPaginatedResult<AdvertisementResponse[]>(this._baseApiUrl + 'get-all', params);
  }
}