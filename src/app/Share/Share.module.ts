// module
import { NgModule } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// components
import { ThongTinComponent } from './ThongTin/ThongTin.component';
import { KinhNghiemComponent } from './KinhNghiem/KinhNghiem.component';
import { DichVuComponent } from './DichVu/DichVu.component';
import { ChiTietComponent } from './ChiTiet/ChiTiet.component';
import { KetQuaComponent } from './KetQua/KetQua.component';

// services
import { TrieuChungService } from '../Services/TrieuChung.service';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    minScrollbarLength: 30
};

@NgModule({
    imports: [
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
    ],
    declarations: [
        ChiTietComponent,
        KetQuaComponent,
        ThongTinComponent,
        KinhNghiemComponent,
        DichVuComponent
    ],
    exports: [
        PerfectScrollbarModule,
        ChiTietComponent,
        KetQuaComponent,
        ThongTinComponent,
        KinhNghiemComponent,
        DichVuComponent

    ],
    providers: [
        NgSwitch,
        NgSwitchCase,
        TrieuChungService

    ]
})
export class ShareModule { }
