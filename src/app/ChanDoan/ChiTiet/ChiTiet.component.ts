import { Component, OnInit, Input, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { TrieuChungService } from '../../Services/TrieuChung.service';
import { Benh } from '../../Share/Model';
import { DOCUMENT} from '@angular/common';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';


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
        private trieuChungService: TrieuChungService,
        private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any
    ) { }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {

        this.trieuChungService.ChiTietBenhFromID(this.BenhID).subscribe(
            data => {
                // console.log(data);
                this.loading = false;
                this.benh = data;
                const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance(
                    {document: this.document, scrollTarget: '#Part', verticalScrolling: false}
                );
                this.pageScrollService.start(pageScrollInstance);
            },
            error => {
                // console.log(error);
                this.loading = false;
            }
        );


    }

}
