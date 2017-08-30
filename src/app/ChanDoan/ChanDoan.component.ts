import { Component, OnInit } from '@angular/core';
import { Benh, TrieuChung, TrieuChungService } from '../Services/TrieuChung.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'app-chandoan',
    templateUrl: './ChanDoan.component.html',
    styleUrls: ['./ChanDoan.component.css']
})
export class ChanDoanComponent implements OnInit {

    dsTrieuChung: TrieuChung[] = [];
    dsTrieuChungCount = 0;
    dsTrieuChungSelected: TrieuChung[] = [];
    dsBenh: Benh[] = [];
    searchKey = new FormControl('');

    constructor(
        private trieuChungService: TrieuChungService
    ) {
        this.searchKey.valueChanges
            .debounceTime(400)
            .subscribe((event) => {
                // this.doSearch(event);
                // this.clickThuoc(null);
                console.log(event);
                if (event !== '') {
                    this.onSearchTrieuChung(event);
                } else {
                    // this.dsBenh
                    this.onClearAll();
                }

            });
    }

    ngOnInit() {

    }

    onClearAll() {
        console.log('clear');
        this.dsTrieuChung = [];
        this.dsTrieuChungCount = 0;
        // this.dsTrieuChungSelected = [];
        // this.dsBenh = [];
    }
    onClearSearch() {
        this.searchKey.patchValue('');
    }
    onSearchTrieuChung(keyword) {
        // console.log(keyword);
        this.trieuChungService.DSTrieuChung(keyword).subscribe(data => {
            this.dsTrieuChung = data.data;
            this.dsTrieuChungCount = data.count;
            // for (let index = 0; index < this.dsTrieuChung.length; index++) {
            //     // let element = this.dsTrieuChung[index];
            //     if (index >= 5) {
            //         // this.dsTrieuChung.splice(index, 1);
            //         this.dsTrieuChung.splice(index, 5);
            //     }
            // }
            console.log(this.dsTrieuChung);
        });
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
