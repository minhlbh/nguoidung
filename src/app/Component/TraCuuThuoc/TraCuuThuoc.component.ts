import { Component, OnInit, trigger, transition, style, animate, group } from '@angular/core';
import { ThuocService } from '../../Services/Thuoc.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { Thuoc } from '../../Share/Model';
import { FormControl } from '@angular/forms';
import { PageScrollConfig } from 'ng2-page-scroll';
import { Observable } from 'rxjs/Rx';
import StringHelper from '../../Helper/String';

@Component({
    selector: 'app-TraCuuThuoc',
    templateUrl: './TraCuuThuoc.component.html',
    styleUrls: ['./TraCuuThuoc.component.css'],
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
                ])
            ])
        ])
    ]
})
export class TraCuuThuocComponent implements OnInit {

    dsThuoc: Thuoc[] = [];
    page = 1;
    dsThuocCount = 0;
    searchKey = new FormControl('');
    loading = false;
    thuoc = <Thuoc>{};

    constructor(
        private thuocService: ThuocService,
        private _sanitizer: DomSanitizer,
        public http: Http,
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

        //
        // ─── LOAD DS THUOC ───────────────────────────────────────────────
        //
        this.thuocService.getThuoc(this.page).subscribe(data => {
            this.dsThuoc = data.dsThuoc;
            this.dsThuocCount = data.TongSoLuong;
        });
    }

    ngOnInit() { }



    //
    // ─── AUTO COMPLETE ──────────────────────────────────────────────────────────────
    //
    observableSource = (keyword: any): Observable<any[]> => {
        if (keyword) {
            this.loading = true;
            return this.thuocService.getSearchThuoc(keyword);
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
        this.dsThuoc = [];
        this.dsThuocCount = 0;
    }

    // clear search
    onClearSearch() {
        this.searchKey.patchValue('');
        this.onClearAll();
    }

    //
    // ─── SEARCH THUOC ────────────────────────────────────────────────────────────────
    //
    onSearchBenh(keyword) {
        if (keyword) {
            this.loading = true;
            // call api tìm kiếm thuốc
            this.thuocService.getSearchThuoc(keyword).subscribe(data => {
                if (data.length === 1 || data[0]._id === keyword._id) {
                    console.log(data[0]);
                    this.onShowBenh(data[0]);
                    this.loading = false;
                    this.searchKey.patchValue('');
                    this.dsThuoc = data;
                    this.dsThuoc.splice(0, 1);
                } else {
                    this.dsThuoc = data;
                    this.dsThuocCount = data.length;
                    this.loading = false;
                    this.dsThuoc.forEach(tc => {
                        if (
                            // tslint:disable-next-line:max-line-length
                            StringHelper.bodauTiengViet(tc.Name).toLowerCase() === StringHelper.bodauTiengViet(keyword).toLowerCase()
                        ) {
                            console.log(tc);
                            this.searchKey.patchValue('');
                            this.dsThuoc.splice(this.dsThuoc.indexOf(tc), 1);
                            this.onShowBenh(tc);
                        }
                    });
                }
            });
        } else {
            // load ds benh
            this.thuocService.getThuoc(this.page).subscribe(data => {
                this.dsThuoc = data.dsThuoc;
                this.dsThuocCount = data.TongSoLuong;
            });
        }
    }
    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── SHOW CHI TIET ──────────────────────────────────────────────────────────────
    //

    onShowBenh(thuoc: Thuoc) {
        this.thuoc = thuoc;
    }

    //
    // ─── LOAD MORE BENH ─────────────────────────────────────────────────────────────
    //

    loadMore() {
        this.page += 1;
        // load ds benh
        this.thuocService.getThuoc(this.page).subscribe(data => {
            this.dsThuoc = data.dsThuoc;
            this.dsThuocCount = data.TongSoLuong;
        });
    }
}
