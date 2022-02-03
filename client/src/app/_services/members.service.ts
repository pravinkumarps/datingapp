import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';



@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {

  }

  getMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(userName: string) {
    return this.httpClient.get<Member>(this.baseUrl + 'users/' + userName);
  }


}
