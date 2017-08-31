import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class TrieuChungService {

    private icdURL = `${environment.apiUrl}/CSDLYT/ICD_Search`;

    constructor(
        private http: Http
    ) {

    }

    DSTrieuChung(keyword): Observable<any> {
        // ...using get request
        return this.http.get(`${this.icdURL}?term=${keyword}`)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    BenhFromTrieuChung(icds): Observable<any> {
        return this.http.get(`${environment.apiUrl}CSDLYT/Benh_From_ICD?DsIdICD10=${icds}`)
        // ...and calling .json() on the response to return data
        .map((res: Response) => res.json())
        // ...errors if any
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}

