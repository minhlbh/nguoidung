import { Component, OnInit } from '@angular/core';
import { TrieuChungService } from '../Services/TrieuChung.service';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { style, state, animate, transition, trigger } from '@angular/core';
import { Benh, TrieuChung } from '../Share/Model';
import { PageScrollConfig } from 'ng2-page-scroll';

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
    benh = <Benh>{};

    constructor(
        private trieuChungService: TrieuChungService,
        private _sanitizer: DomSanitizer,
        public http: Http
    ) {
        PageScrollConfig.defaultScrollOffset = 12;
        PageScrollConfig.defaultEasingLogic = {
            ease: (t: number, b: number, c: number, d: number): number => {
                // easeInOutExpo easing
                if (t === 0) { return b; }
                if (t === d) { return b + c; }
                if ((t /= d / 2) < 1) {
                    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                }
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        };
    }

    observableSource = (keyword: any): Observable<any[]> => {
        const url: string =
            'http://api.truongkhoa.com/api/CSDLYT/SearchTrieuChung?term=' + keyword;

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
        // console.log(keyword);
        if (keyword) {
            this.loading_dsTrieuChung = true;
            this.trieuChungService.DSTrieuChung(keyword).subscribe(data => {
                // console.log(data);
                if (data.length === 1 || data[0]._id === keyword._id) {
                    this.onAddTrieuChung(data[0]);
                    this.loading_dsTrieuChung = false;
                    this.searchKey.patchValue('');


                    this.dsTrieuChung = data;
                    this.dsTrieuChung.splice(0, 1);


                } else {
                    this.dsTrieuChung = data;
                    this.dsTrieuChungCount = data.length;
                    this.loading_dsTrieuChung = false;
                }

            });

        }

    }

    onAddTrieuChung(trieuChung: TrieuChung) {
        const i = this.dsTrieuChung.indexOf(trieuChung);
        this.dsTrieuChung.splice(i, 1);
        this.dsTrieuChungSelected = [...this.dsTrieuChungSelected, trieuChung];
        const flags = new Set();
        this.dsTrieuChungSelected = this.dsTrieuChungSelected.filter(entry => {
            if (flags.has(entry._id)) {
                return false;
            }
            flags.add(entry._id);
            return true;
        });
        this.onTimBenh();
    }

    onRemoveTrieuChung(trieuChung: TrieuChung) {
        const i = this.dsTrieuChungSelected.indexOf(trieuChung);
        this.dsTrieuChungSelected.splice(i, 1);
        this.dsTrieuChung = [...this.dsTrieuChung, trieuChung];
        this.onTimBenh();
    }

    buildTrieuChung() {
        let icds = [];
        this.dsTrieuChungSelected.forEach((icd, i) => {
            icds = [...icds, icd._id];
        });
        return icds;
    }

    onTimBenh() {
        // this.buildTrieuChung
        this.trieuChungService.BenhFromTrieuChung(this.buildTrieuChung()).subscribe(
            data => {
                this.dsBenh = data;
                // console.log(this.dsBenh);
                // var sort = [];
                this.dsBenh.forEach(b => {
                    b.Score = 0;
                    this.dsTrieuChungSelected.forEach(tr => {
                        if (JSON.stringify(b.DsTrieuChung.Value).indexOf(tr._id) !== -1) {
                            b.Score += 1;
                        }
                    });
                    b.Score = (b.Score / b.DsTrieuChung.Value.length) * 90;
                });

                this.dsBenh = this.dsBenh.sort((obj1, obj2) => {
                    if (obj1.Score < obj2.Score) {
                        return 1;
                    }
                    if (obj1.Score > obj2.Score) {
                        return -1;
                    }
                    return 0;
                });
                // console.log(this.dsBenh);

            },
            error => {
                // console.log(error);
                this.dsBenh = [];
            }
        );
    }
    onShowBenh(benh: Benh) {
        this.benh = benh;
    }

}
