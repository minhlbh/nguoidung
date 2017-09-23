import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ThuocService {
    public baseUrl = environment.apiUrl;
    constructor(
        private http: Http
    ) { }

    //
    // ─── GET DANH SACH THUOC ────────────────────────────────────────────────────────
    //
    getThuoc(page: number): Observable<any> {
        // ...using get request
        return this.http.get(`${this.baseUrl}/CSDLYT/Thuoc_List?Trang=${page}&soluongmoitrang=50`)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    //
    // ─── SEARCH THUOC ───────────────────────────────────────────────────────────────
    //
    getSearchThuoc(key: String) {
        const searchUrl = `${this.baseUrl}/CSDLYT/Thuoc_List?Trang=1&searchTerm=${key}&soluongmoitrang=10`;
        return this.http.get(searchUrl)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
