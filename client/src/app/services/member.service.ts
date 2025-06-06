import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  http = inject(HttpClient);

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>('http://localhost:5000/api/member/get-all');
  }
}