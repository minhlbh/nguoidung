import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChanDoanComponent } from './ChanDoan.component';
import { TrieuChungService } from '../Services/TrieuChung.service';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { ChiTietComponent } from './ChiTiet/ChiTiet.component';
import { KetQuaComponent } from './KetQua/KetQua.component';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { NguiStickyModule } from '@ngui/sticky';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { StickyModule } from 'ng2-sticky-kit';

// import { TruncatePipe } from 'angular2-truncate';
import { ThongTinComponent } from './ThongTin/ThongTin.component';
import { KinhNghiemComponent } from './KinhNghiem/KinhNghiem.component';
import { DichVuComponent } from './DichVu/DichVu.component';
// import { StringHelper } from '../Helper/String';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  minScrollbarLength: 30
};
// Định nghĩa router riêng cho module này
const routing: Routes = [
    { path: '', component: ChanDoanComponent }
];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Routing,
        NguiAutoCompleteModule,
        NguiStickyModule,
        Ng2PageScrollModule,
        StickyModule,
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
    ],
    providers: [
        TrieuChungService,
        NgSwitch,
        NgSwitchCase,
        // StringHelper
    ],
    declarations: [
        ChanDoanComponent,
        ChiTietComponent,
        KetQuaComponent,
        ThongTinComponent,
        KinhNghiemComponent,
        DichVuComponent
    ]
})
export class ChanDoanModule { }
