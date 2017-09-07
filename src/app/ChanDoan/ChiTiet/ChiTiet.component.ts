import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TrieuChungService } from '../../Services/TrieuChung.service';
import { Benh } from '../../Share/Model';


@Component({
    selector: 'app-chitiet',
    templateUrl: './ChiTiet.component.html',
    styleUrls: ['./ChiTiet.component.css']
})
export class ChiTietComponent implements OnInit, OnChanges {

    @Input() BenhID: string;

    benh: Benh;
    loading = true;

    constructor(
        private trieuChungService: TrieuChungService

    ) { }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {

        this.trieuChungService.ChiTietBenhFromID(this.BenhID).subscribe(
            data => {
                console.log(data);
                this.loading = false;
                this.benh = data;
            },
            error => {
                // this.testdata = error.Message;
                console.log(error);
                this.loading = false;
            }
        );


    }

}
