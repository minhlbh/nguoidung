import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-kinhnghiem',
    templateUrl: './KinhNghiem.component.html',
    styleUrls: ['./KinhNghiem.component.css']
})
export class KinhNghiemComponent implements OnInit, OnChanges {
    @Input() BenhID: string;
    loading = true;
    constructor() { }

    ngOnInit() {
    }
    ngOnChanges(changes: SimpleChanges) {



    }

}
