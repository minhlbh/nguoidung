// module
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { NguiStickyModule } from '@ngui/sticky';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { StickyModule } from 'ng2-sticky-kit';
import { ShareModule } from '../Share/Share.module';

// components
import { ChanDoanComponent } from './ChanDoan.component';

// pipe and services
import { TrieuChungService } from '../Services/TrieuChung.service';
// import { TruncatePipe } from 'angular2-truncate';


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
        ShareModule
    ],
    providers: [
        TrieuChungService,
    ],
    declarations: [
        ChanDoanComponent,

    ]
})
export class ChanDoanModule { }
