import { Component, OnInit } from '@angular/core';
import { Benh, TrieuChung, TrieuChungService } from '../Services/TrieuChung.service';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { style, state, animate, transition, trigger } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-chandoan',
    templateUrl: './ChanDoan.component.html',
    styleUrls: ['./ChanDoan.component.css'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [   // :enter is alias to 'void => *'
                style({ opacity: 0 }),
                animate(50, style({ opacity: 1 }))
            ]),
            transition(':leave', [   // :leave is alias to '* => void'
                animate(50, style({ opacity: 0 }))
            ])
        ])
    ]
})

export class ChanDoanComponent implements OnInit {
    dsTrieuChung: TrieuChung[] = [];
    dsTrieuChungCount = 0;
    dsTrieuChungSelected: TrieuChung[] = [];
    dsBenh: Benh[] = [];
    searchKey = new FormControl('');
    loading_autocomplate = false;
    loading_dsTrieuChung = false;

    constructor(
        private trieuChungService: TrieuChungService,
        private _sanitizer: DomSanitizer,
        public http: Http
    ) {

    }

    observableSource = (keyword: any): Observable<any[]> => {
        const url: string =
            'http://api.truongkhoa.com/api/CSDLYT/ICD_Suggest?term=' + keyword;

        if (keyword) {
            this.loading_autocomplate = true;
            return this.http.get(url)

                .map(res => {
                    const json = res.json();
                    this.loading_autocomplate = false;
                    return json;
                });
        } else {
            return Observable.of([]);
        }
    }

    autocompleListFormatter = (data: any): SafeHtml => {
        const html = `<span style="display:block">${data.Name}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }


    ngOnInit() {

    }

    onClearAll() {
        this.dsTrieuChung = [];
        this.dsTrieuChungCount = 0;
    }
    onClearSearch() {
        this.searchKey.patchValue('');
        this.onClearAll();
    }
    onSearchTrieuChung(keyword) {

        if (keyword) {
            this.loading_dsTrieuChung = true;
            this.trieuChungService.DSTrieuChung(keyword).subscribe(data => {
                this.dsTrieuChung = data.data;
                this.dsTrieuChungCount = data.count;
                this.loading_dsTrieuChung = false;
            });
        }

    }

    onAddTrieuChung(trieuChung: TrieuChung) {
        const i = this.dsTrieuChung.indexOf(trieuChung);
        this.dsTrieuChung.splice(i, 1);
        this.dsTrieuChungSelected = [...this.dsTrieuChungSelected, trieuChung];
        this.onTimBenh();
    }
    onRemoveTrieuChung(trieuChung: TrieuChung) {
        const i = this.dsTrieuChungSelected.indexOf(trieuChung);
        this.dsTrieuChungSelected.splice(i, 1);
        this.dsTrieuChung = [...this.dsTrieuChung, trieuChung];
        this.onTimBenh();
    }

    buildTrieuChung(): String {
        let icds = '';
        this.dsTrieuChungSelected.forEach((icd, i) => {
            icds += icd.Id + ' ';
        });
        return icds;
    }

    onTimBenh() {
        // this.buildTrieuChung
        this.trieuChungService.BenhFromTrieuChung(this.buildTrieuChung()).subscribe(
            data => {
                this.dsBenh = data;
            },
            error => {
                this.dsBenh = [];
            }
        );
    }


}
