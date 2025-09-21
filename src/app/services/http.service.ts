import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    //private baseUrl = 'http://localhost:8080/shul/'; // local
    private baseUrl = 'https://api.elcmembers.online/shul/'; // production

    constructor(private http: HttpClient) { }

    saveMember(member: any, editing: boolean): Observable<any> {
        if (editing)
            return this.http.put(`${this.baseUrl}member`, member, { withCredentials: true });
        else
            return this.http.post(`${this.baseUrl}member`, member, { withCredentials: true });
    }

    getMembers(): Observable<any> {
        return this.http.get(this.baseUrl + 'member');
    }

    generateLink(): Observable<any> {
        return this.http.post(`${this.baseUrl}member/generate`, {}, { withCredentials: true, responseType: 'text' as 'json' });
    }

    verifyCode(code: string): Observable<any> {
        return this.http.post(`${this.baseUrl}member/verify`, { code }, { withCredentials: true, responseType: 'text' });
    }

    getYartzeits(): Observable<any> {
        return this.http.get(`${this.baseUrl}print/yartzeits`, { withCredentials: true });
    }

    getParashot(): Observable<any> {
        return this.http.get(`${this.baseUrl}print/parashot`, { withCredentials: true });
    }

    getAnniversaries(): Observable<any> {
        return this.http.get(`${this.baseUrl}print/ann`, { withCredentials: true });
    }
}