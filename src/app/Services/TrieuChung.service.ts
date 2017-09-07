import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class TrieuChungService {

    constructor(
        private http: Http
    ) {

    }

    DSTrieuChung(keyword): Observable<any> {
        return this.http.get(`${environment.apiUrl}CSDLYT/SearchTrieuChung?term=${keyword}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    BenhFromTrieuChung(icds): Observable<any> {

        return this.http.post(`${environment.apiUrl}CSDLYT/Benh_From_TCIDS`, icds, null)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    DichVuFromBenhID(id: string): Observable<any> {
        return this.http.get(`${environment.apiUrl}CSDLYT/DichVu_by_BenhID?id=${id}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    TinFromBenhID(id: string): Observable<any> {
        return this.http.get(`${environment.apiUrl}CSDLYT/Tin_by_BenhID?id=${id}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    ChiTietBenhFromID(id: string): Observable<any> {
        return this.http.get(`${environment.apiUrl}CSDLYT/ChiTietBenh?id=${id}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }


}

