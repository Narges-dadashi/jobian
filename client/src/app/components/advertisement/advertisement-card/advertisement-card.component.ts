import { Component, Input } from '@angular/core';
import { AdvertisementResponse } from '../../../models/advertisement-response';
import { environment } from '../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-advertisement-card',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatIconModule, MatButtonModule, 
    MatTooltipModule
  ],
  templateUrl: './advertisement-card.component.html',
  styleUrl: './advertisement-card.component.scss'
})
export class AdvertisementCardComponent {
  @Input('advertisementInput') advertisementIn: AdvertisementResponse | undefined;
  apiUrl = environment.apiUrl;
}