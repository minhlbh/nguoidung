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

    DSTrieuChung(page): Observable<any> {
        // ...using get request
        return this.http.get(`${this.icdURL}?term=${page}`)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            // ...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}

export class TrieuChung {
    id: number;
    Name: String;
}
