import { Injectable } from '@angular/core';
import { PaginationParams } from '../models/helpers/paginationParams.model';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../models/helpers/paginatedResult';
import { AdvertisementResponse } from '../models/advertisement-response';
import { environment } from '../../environments/environment.development';
import { PaginationHandler } from '../extensions/paginationHandler';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly _baseApiUrl: string = environment.apiUrl + 'api/advertisement';
  private _paginationHandler = new PaginationHandler();

  getAllAdvertisements(paginationParams: PaginationParams): Observable<PaginatedResult<AdvertisementResponse[]>> {
    let params = new HttpParams();

    params = params.append('pageSize', paginationParams.pageSize);
    params = params.append('pageNumber', paginationParams.pageNumber);

    return this._paginationHandler.getPaginatedResult<AdvertisementResponse[]>(this._baseApiUrl + 'get-all', params);
  }
}