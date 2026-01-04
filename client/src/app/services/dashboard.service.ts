import { Injectable } from '@angular/core';
import { PaginationParams } from '../models/helpers/paginationParams.model';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../models/helpers/paginatedResult';
import { AdvertisementResponse } from '../models/advertisement-response';
import { PaginationHandler } from '../extensions/paginationHandler';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private _paginationHandler = new PaginationHandler();

  getAllAdvertisements(paginationParams: PaginationParams): Observable<PaginatedResult<AdvertisementResponse[]>> {
    let params = new HttpParams();

    params = params.append('pageSize', paginationParams.pageSize);
    params = params.append('pageNumber', paginationParams.pageNumber);

    return this._paginationHandler.getPaginatedResult<AdvertisementResponse[]>('http://localhost:5000/api/advertisement/get-all', params);
  }
}