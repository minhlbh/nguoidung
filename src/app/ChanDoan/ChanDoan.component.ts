import { Component, OnInit } from '@angular/core';
import { TrieuChung, TrieuChungService } from '../Services/TrieuChung.service';

@Component({
    selector: 'app-chandoan',
    templateUrl: './ChanDoan.component.html',
    styleUrls: ['./ChanDoan.component.css']
})
export class ChanDoanComponent implements OnInit {

    dsTrieuChung: TrieuChung[] = [];
    dsTrieuChungSelected: TrieuChung[] = [];

    constructor(
        private trieuChungService: TrieuChungService
    ) { }

    ngOnInit() {
        this.trieuChungService.DSTrieuChung('a').subscribe(data => {
            this.dsTrieuChung = data;
            for (let index = 0; index < this.dsTrieuChung.length; index++) {
                // let element = this.dsTrieuChung[index];
                if (index >= 5) {
                    // this.dsTrieuChung.splice(index, 1);
                    this.dsTrieuChung.splice(index, 5);
                }
            }
            console.log(this.dsTrieuChung);
        });
    }

    onAddTrieuChung(trieuChung: TrieuChung) {
        const i = this.dsTrieuChung.indexOf(trieuChung);
        this.dsTrieuChung.splice(i, 1);
        this.dsTrieuChungSelected = [...this.dsTrieuChungSelected, trieuChung];
    }
    onRemoveTrieuChung(trieuChung: TrieuChung) {
        const i = this.dsTrieuChungSelected.indexOf(trieuChung);
        this.dsTrieuChungSelected.splice(i, 1);
        this.dsTrieuChung = [...this.dsTrieuChung, trieuChung];
    }

    buildTrieuChung() {

    }



}
