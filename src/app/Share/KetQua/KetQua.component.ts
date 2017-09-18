import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Benh } from '../../Share/Model';

@Component({
    selector: 'app-ketqua',
    templateUrl: './KetQua.component.html',
    styleUrls: ['./KetQua.component.css'],

})
export class KetQuaComponent implements OnInit, OnChanges {
    @Input() benh: Benh;

    tab = 'CHITIETBENH';

    constructor(
    ) { }

    ngOnInit() {
        this.tab = 'CHITIETBENH';
    }
    ngOnChanges(changes: SimpleChanges) {

        this.tab = 'CHITIETBENH';


    }

}
