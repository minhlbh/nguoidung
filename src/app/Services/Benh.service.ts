import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BenhService {

    public baseUrl = environment.apiUrl;
    constructor(
        private http: Http
    ) {}

    // get danh sach benh
    DsBenh(soluong: number) {
        return this.http.get(`${this.baseUrl}CSDLYT/DanhSachBenh?soluong=${soluong}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    // get chi tiet benh
    ChiTietBenhFromID(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}CSDLYT/ChiTietBenh?id=${id}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    // get search benh result
    SearchBenh(term: string) {
        return this.http.get(`${this.baseUrl}CSDLYT/SearchBenh?term=${term}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

}
