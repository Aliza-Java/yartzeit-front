import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'http://localhost:8080/member'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  saveMember(member: any): Observable<any> {
    return this.http.post(this.baseUrl, member);
  }
}