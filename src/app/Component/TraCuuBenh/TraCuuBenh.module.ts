//
// ─── MODULE ─────────────────────────────────────────────────────────────────────
//
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { NguiStickyModule } from '@ngui/sticky';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { StickyModule } from 'ng2-sticky-kit';
import { ShareModule } from '../../Share/Share.module';


//
// ─── COMPONENTS ─────────────────────────────────────────────────────────────────
//
import { TraCuuBenhComponent } from './TraCuuBenh.component';

//
// ─── SERVICES ───────────────────────────────────────────────────────────────────
//
import { BenhService } from '../../Services/Benh.service';

// Định nghĩa router riêng cho module này
const routing: Routes = [
    { path: '', component: TraCuuBenhComponent }
];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);

@NgModule({
    // import modules
    imports: [
        CommonModule,
        NguiAutoCompleteModule,
        NguiStickyModule,
        Ng2PageScrollModule,
        StickyModule,
        ShareModule,
        FormsModule,
        ReactiveFormsModule,
        Routing
    ],
    // declare components
    declarations: [
        TraCuuBenhComponent,
    ],
    // declare services
    providers: [
        BenhService
    ]
})
export class TraCuuBenhModule { }
