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
    dsBenhCount = 0;
    dsBenhSelected: Benh[] = [];
    dsBenhGoiY: Benh[] = [];
    searchKey = new FormControl('');
    loading = false;
    // loading_dsBenh = false;
    // loading_dsBenhGoiY = false;
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
        this.benhService.DsBenh(50).subscribe(data => {
            this.dsBenh = data.DsBenh;
            this.dsBenhCount = data.TongSoLuong;
        });
    }

    ngOnInit() { }

    //
    // ─── FUNCTION FOR SEARCH BOX ────────────────────────────────────────────────────
    //

    // auto-complete
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

    // search benh
    onSearchBenh(keyword) {
        console.log(keyword);
        if (keyword) {
            this.loading = true;
            // call api tìm kiếm bệnh
            this.benhService.SearchBenh(keyword).subscribe(data => {
                console.log(data);
                if (data.length === 1 || data[0]._id === keyword._id) {
                    this.onAddBenh(data[0]);
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
                            this.onAddBenh(tc);
                        }
                    });
                }
            });
        } else {
            // load ds benh
            this.benhService.DsBenh(50).subscribe(data => {
                this.dsBenh = data.DsBenh;
                this.dsBenhCount = data.TongSoLuong;
            });
        }
    }
    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ─── HISTORY OF FINDING BENH ────────────────────────────────────────────────────
    //

    // add Benh to List of selected Benh
    onAddBenh(benh: Benh) {
        const i = this.dsBenh.indexOf(benh);
        this.dsBenh.splice(i, 1);
        this.dsBenhCount--;
        this.dsBenhSelected = [...this.dsBenhSelected, benh];
        const flags = new Set();
        this.dsBenhSelected = this.dsBenhSelected.filter(entry => {
            if (flags.has(entry._id)) {
                return false;
            }
            flags.add(entry._id);
            return true;
        });
        // this.onTimBenh();
    }

    // remove trieu chung from List of selected trieu chung
    onRemoveBenh(benh: Benh) {
        const i = this.dsBenhSelected.indexOf(benh);
        this.dsBenhSelected.splice(i, 1);
        this.dsBenhCount++;
        this.dsBenh = [...this.dsBenh, benh];
        // this.onTimBenh();
    }
    // ────────────────────────────────────────────────────────────────────────────────

    // buildBenh() {
    //     let icds = [];
    //     this.dsBenhSelected.forEach((icd, i) => {
    //         icds = [...icds, icd._id];
    //     });
    //     return icds;
    // }

    // onTimBenh() {
    //     if (this.dsBenhSelected.length === 0) {
    //         this.dsBenhGoiY = [];
    //         return;
    //     }

    //     this.loading_dsBenhGoiY = true;
    //     this.benhService.BenhFromTrieuChung(this.buildTrieuChung()).subscribe(
    //         data => {
    //             this.dsBenhGoiY = data;
    //             this.dsBenhGoiY.forEach(b => {
    //                 b.Score = 0;
    //                 this.dsBenhSelected.forEach(tr => {
    //                     if (JSON.stringify(b.dsBenh.Value).indexOf(tr._id) !== -1) {
    //                         b.Score += 1;
    //                     }
    //                 });
    //                 b.Score = (b.Score / b.dsBenh.Value.length) * 90;
    //                 this.loading_dsBenhGoiY = false;
    //             });

    //             this.dsBenhGoiY = this.dsBenhGoiY.sort((obj1, obj2) => {
    //                 if (obj1.Score < obj2.Score) {
    //                     return 1;
    //                 }
    //                 if (obj1.Score > obj2.Score) {
    //                     return -1;
    //                 }
    //                 return 0;
    //             });
    //             // console.log(this.dsBenhGoiY);

    //         },
    //         error => {
    //             // console.log(error);
    //             this.loading_dsBenhGoiY = false;
    //             this.dsBenhGoiY = [];
    //         }
    //     );
    // }
    onShowBenh(benh: Benh) {
        this.benh = benh;
    }
    // onScroll(e) {
    //     const tracker = e.target;
    //     console.log(window.scrollY, tracker.querySelector('ul').getBoundingClientRect().top); // querySelector('ul')

    // }

}
