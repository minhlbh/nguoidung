import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TrieuChungService } from '../../Services/TrieuChung.service';
@Component({
    selector: 'app-dichvu',
    templateUrl: './DichVu.component.html',
    styleUrls: ['./DichVu.component.css']
})
export class DichVuComponent implements OnInit, OnChanges {

    @Input() BenhID: string ;
    loading = true;
    testdata: any;

    constructor(
        private trieuChungService: TrieuChungService
    ) {

    }

    ngOnInit() {

    }
    ngOnChanges(changes: SimpleChanges) {

        this.trieuChungService.DichVuFromBenhID(this.BenhID).subscribe(
            data => {
                // console.log(data);
                this.loading = false;
                this.testdata = data;
            },
            error => {
                this.testdata = error.Message;
                // console.log(error);
                this.loading = false;
            }
        );

    }

}
