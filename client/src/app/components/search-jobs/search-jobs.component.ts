import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-jobs',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './search-jobs.component.html',
  styleUrl: './search-jobs.component.scss'
})
export class SearchJobsComponent {

}