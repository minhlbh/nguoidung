import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TrieuChungService } from '../../Services/TrieuChung.service';

@Component({
    selector: 'app-thongtin',
    templateUrl: './ThongTin.component.html',
    styleUrls: ['./ThongTin.component.css']
})
export class ThongTinComponent implements OnInit, OnChanges {
    @Input() BenhID: string;
    loading = true;
    testdata: any;

    constructor(
        private trieuChungService: TrieuChungService

    ) { }

    ngOnInit() {

    }
    ngOnChanges(changes: SimpleChanges) {

        this.trieuChungService.TinFromBenhID(this.BenhID).subscribe(
            data => {
                console.log(data);
                // this.loading = false;
                this.testdata = data;
            },
            error => {
                this.testdata = error.Message;
                console.log(error);
            }
        );

    }

}
