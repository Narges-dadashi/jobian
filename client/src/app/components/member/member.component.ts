import { Component, Input } from '@angular/core';
import { Member } from '../../models/member.model';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [
    CommonModule, MatCardModule
  ],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent {
  @Input('memberInput') memberIn: Member | undefined;
  apiUrl = environment.apiUrl;
}