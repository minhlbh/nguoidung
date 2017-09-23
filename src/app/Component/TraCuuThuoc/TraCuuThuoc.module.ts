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
// ─── COMPONENT ──────────────────────────────────────────────────────────────────
//
import { TraCuuThuocComponent } from './TraCuuThuoc.component';

//
// ─── SERVICES ───────────────────────────────────────────────────────────────────
//
import { ThuocService } from '../../Services/Thuoc.service';

@NgModule({
    // import modules
    imports: [
        CommonModule
    ],
    // declare components
    declarations: [
        TraCuuThuocComponent
    ],
    // declare services
    providers: [
        ThuocService
    ]
})
export class TraCuuThuocModule { }
