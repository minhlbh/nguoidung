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
        return this.http.get(`${environment.apiUrl}CSDLYT/SearchTrieuChung?term=${keyword}`)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    BenhFromTrieuChung(icds): Observable<any> {
        // const body = new FormData();
        // body.append('ids', icds);
        // const headers = new Headers();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // const options = new RequestOptions({ headers: headers });

        return this.http.post(`http://localhost:5001/api/CSDLYT/Benh_From_TCIDS`, icds, null)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}

