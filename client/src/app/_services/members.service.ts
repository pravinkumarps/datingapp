import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private httpClient: HttpClient) {

  }

  getMembers(): Observable<Member[]> {
    if (this.members.length > 0) {
      return of(this.members);
    }
    return this.httpClient.get<Member[]>(this.baseUrl + 'users')
      .pipe(
        map(members => {
          this.members = members;
          return members;
        })
      );
  }

  getMember(userName: string) {
    const member = this.members.find(x => x.userName === userName);
    if (member !== undefined) {
      return of(member);
    }
    return this.httpClient.get<Member>(this.baseUrl + 'users/' + userName);
  }

  updateMember(member: Member) {
    return this.httpClient.put(this.baseUrl + 'users', member)
      .pipe(
        map(() => {
          const index = this.members.indexOf(member);
          this.members[index] = member;
        })
      );
  }


}
