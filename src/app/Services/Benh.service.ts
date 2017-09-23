import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BenhService {

    public baseUrl = environment.apiUrl;
    constructor(
        private http: Http
    ) { }

    //
    // ─── GET DANH SACH BENH ─────────────────────────────────────────────────────────
    //
    DsBenh(soluong: number) {
        return this.http.get(`${this.baseUrl}CSDLYT/DanhSachBenh?soluong=${soluong}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    //
    // ─── GET CHI TIET BENH ──────────────────────────────────────────────────────────
    //
    ChiTietBenhFromID(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}CSDLYT/ChiTietBenh?id=${id}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    //
    // ─── GET SEARCH BENH RESULT ─────────────────────────────────────────────────────
    //
    SearchBenh(term: string) {
        return this.http.get(`${this.baseUrl}CSDLYT/SearchBenh?term=${term}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
}
