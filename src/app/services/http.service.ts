import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  //private baseUrl = 'http://localhost:8080/shul/member'; // local
  //private baseUrl = 'https://ec2-13-60-6-160.eu-north-1.compute.amazonaws.com/shul/member'; // production
  private baseUrl = 'https://api.elcmembers.online/shul/member'; // production

  constructor(private http: HttpClient) {}

  saveMember(member: any): Observable<any> {
    return this.http.post(this.baseUrl, member);
  }
}