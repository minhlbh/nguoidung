import { Component, OnInit, Input } from '@angular/core';
import { Benh } from '../../Share/Model';

@Component({
    selector: 'app-ketqua',
    templateUrl: './KetQua.component.html',
    styleUrls: ['./KetQua.component.css']
})
export class KetQuaComponent implements OnInit {
    @Input() benh: Benh;

    constructor() { }

    ngOnInit() {
    }

}
