import { Component, inject, OnInit } from '@angular/core';
import { AdvertisementResponse } from '../../../models/advertisement-response';
import { PaginationParams } from '../../../models/helpers/paginationParams.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../../models/helpers/pagination';
import { PaginatedResult } from '../../../models/helpers/paginatedResult';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AdvertisementCardComponent } from '../advertisement-card/advertisement-card.component';
import { AdvertisementService } from '../../../services/advertisement.service';

@Component({
  selector: 'app-advertisement-list',
  standalone: true,
  imports: [
    AdvertisementCardComponent,
    MatCardModule, MatIconModule, MatPaginatorModule
  ],
  templateUrl: './advertisement-list.component.html',
  styleUrl: './advertisement-list.component.scss'
})
export class AdvertisementListComponent implements OnInit {
  private advertisementService = inject(AdvertisementService);

  advertisements: AdvertisementResponse[] = [];
  paginationParams: PaginationParams | undefined;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent | undefined;
  pagination: Pagination | undefined;

  ngOnInit(): void {
    this.paginationParams = new PaginationParams();

    this.getAllAdvertisements();
  }

  getAllAdvertisements(): void {
    if (this.paginationParams)
      this.advertisementService.getAllAdvertisements(this.paginationParams).subscribe({
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
    if (this.paginationParams) {
      if (e.pageSize !== this.paginationParams.pageSize)
        e.pageIndex = 0;

      this.pageEvent = e;
      this.paginationParams.pageSize = e.pageSize;
      this.paginationParams.pageNumber = e.pageIndex + 1;

      this.getAllAdvertisements();
    }
  }
}