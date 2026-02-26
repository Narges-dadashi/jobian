import { Component, inject, OnInit } from '@angular/core';
import { AdvertisementResponse } from '../../../models/advertisement-response';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../../models/helpers/pagination';
import { PaginatedResult } from '../../../models/helpers/paginatedResult';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';
import { AdvertisementService } from '../../../services/advertisement.service';
import { AdvertisementParams } from '../../../models/helpers/advertisement-params';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-advertisement-list',
  standalone: true,
  imports: [
    AdvertisementCardComponent, FormsModule, ReactiveFormsModule,
    MatCardModule, MatIconModule, MatPaginatorModule, MatSelectModule, MatSliderModule
  ],
  templateUrl: './advertisement-list.component.html',
  styleUrl: './advertisement-list.component.scss'
})
export class AdvertisementListComponent implements OnInit {
  private _fB = inject(FormBuilder);
  private advertisementService = inject(AdvertisementService);
  advertisements: AdvertisementResponse[] | undefined;
  advertisementParams: AdvertisementParams | undefined;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent | undefined;
  pagination: Pagination | undefined;

  ngOnInit(): void {
    this.advertisementParams = new AdvertisementParams();

    this.getAllAdvertisements();
  }

  getAllAdvertisements(): void {
    if (this.advertisementParams)
      this.advertisementService.getAllAdvertisements(this.advertisementParams).subscribe({
        next: (response: PaginatedResult<AdvertisementResponse[]>) => {
          if (response.body) {
            this.advertisements = response.body;
          }

          if (response.pagination) {
            this.pagination = response.pagination;
          }

          console.log('Data received:', this.advertisements);
          console.log('Pagination info:', this.pagination);
          // if (response.body && response.pagination) {
          //   this.advertisements = response.body;
          //   this.pagination = response.pagination;
          // }
        }
      })
    error: (err: any) => console.error(err)
  }

  handlePageEvent(e: PageEvent): void {
    if (this.advertisementParams) {
      if (e.pageSize !== this.advertisementParams.pageSize)
        e.pageIndex = 0;

      this.pageEvent = e;
      this.advertisementParams.pageSize = e.pageSize;
      this.advertisementParams.pageNumber = e.pageIndex + 1;

      this.getAllAdvertisements();
    }
  }
}