import { Component, OnInit, trigger, transition, style, animate, group } from '@angular/core';
import { TrieuChung, Benh } from '../../Share/Model';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { PageScrollConfig } from 'ng2-page-scroll';
import { Observable } from 'rxjs/Observable';
import StringHelper from '../../Helper/String';
import { BenhService } from '../../Services/Benh.service';

@Component({
    selector: 'app-tracuubenh',
    templateUrl: './TraCuuBenh.component.html',
    styleUrls: ['./TraCuuBenh.component.css'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [   // :enter is alias to 'void => *'
                style({ opacity: 0 }),
                animate(50, style({ opacity: 1 }))
            ]),
            transition(':leave', [   // :leave is alias to '* => void'
                animate(50, style({ opacity: 0 }))
            ])
        ]),
        trigger('new', [
            transition(':enter', [   // :enter is alias to 'void => *'
                style({ opacity: 0 }),
                animate(50, style({ opacity: 1 })),
                group([
                    animate(50, style({ opacity: 1, backgroundColor: '#cfd8dc' })),
                    animate('.5s .5s ease', style({ backgroundColor: '#cfd8dc' })),
                    // animate(500, style({ backgroundColor: 'transparent' }))
                ])
            ])
        ])
    ]
})
export class TraCuuBenhComponent implements OnInit {

    dsBenh: Benh[] = [];
    soBenhDaLoad = 0;
    dsBenhCount = 0;
    searchKey = new FormControl('');
    loading = false;
    benh = <Benh>{};

    constructor(
        private benhService: BenhService,
        private _sanitizer: DomSanitizer,
        public http: Http,
        // private stringHelper: StringHelper
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

        // load ds benh
        this.soBenhDaLoad = 50;
        this.benhService.DsBenh(this.soBenhDaLoad).subscribe(data => {
            this.dsBenh = data.DsBenh;
            this.dsBenhCount = data.TongSoLuong;
        });
    }

    ngOnInit() { }



    //
    // ─── AUTO COMPLETE ──────────────────────────────────────────────────────────────
    //
    observableSource = (keyword: any): Observable<any[]> => {
        if (keyword) {
            this.loading = true;
            return this.benhService.SearchBenh(keyword);
        } else {
            return Observable.of([]);
        }

    }

    // set html elements for autocomplete list
    autocompleListFormatter = (data: any): SafeHtml => {
        const html = `<span style="display:block">${data.Name}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }
    // ────────────────────────────────────────────────────────────────────────────────
    // clear options
    onClearAll() {
        this.dsBenh = [];
        this.dsBenhCount = 0;
    }

    // clear search
    onClearSearch() {
        this.searchKey.patchValue('');
        this.onClearAll();
    }

    //
    // ─── SEARCH BENH ────────────────────────────────────────────────────────────────
    //
    onSearchBenh(keyword) {
        if (keyword) {
            this.loading = true;
            // call api tìm kiếm bệnh
            this.benhService.SearchBenh(keyword).subscribe(data => {
                if (data.length === 1 || data[0]._id === keyword._id) {
                    console.log(data[0]);
                    this.onShowBenh(data[0]);
                    this.loading = false;
                    this.searchKey.patchValue('');
                    this.dsBenh = data;
                    this.dsBenh.splice(0, 1);
                } else {
                    this.dsBenh = data;
                    this.dsBenhCount = data.length;
                    this.loading = false;
                    this.dsBenh.forEach(tc => {
                        if (
                            // tslint:disable-next-line:max-line-length
                            StringHelper.bodauTiengViet(tc.Name).toLowerCase() === StringHelper.bodauTiengViet(keyword).toLowerCase()
                        ) {
                            console.log(tc);
                            this.searchKey.patchValue('');
                            this.dsBenh.splice(this.dsBenh.indexOf(tc), 1);
                            this.onShowBenh(tc);
                        }
                    });
                }
            });
        } else {
            // load ds benh
            this.benhService.DsBenh(this.soBenhDaLoad).subscribe(data => {
                this.dsBenh = data.DsBenh;
                this.dsBenhCount = data.TongSoLuong;
            });
        }
    }
    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── SHOW CHI TIET ──────────────────────────────────────────────────────────────
    //

    onShowBenh(benh: Benh) {
        this.benh = benh;
    }

    //
    // ─── LOAD MORE BENH ─────────────────────────────────────────────────────────────
    //

    loadMore() {
        this.soBenhDaLoad += 50;
        // load ds benh
        this.benhService.DsBenh(this.soBenhDaLoad).subscribe(data => {
            this.dsBenh = data.DsBenh;
            this.dsBenhCount = data.TongSoLuong;
        });
    }
}
