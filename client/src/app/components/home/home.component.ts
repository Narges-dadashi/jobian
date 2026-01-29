import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from '../footer/footer.component';
import { AdvertisementListComponent } from '../advertisement/advertisement-list/advertisement-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AdvertisementListComponent, FooterComponent,
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}