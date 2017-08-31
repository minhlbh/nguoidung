import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChanDoanComponent } from './ChanDoan.component';
import { TrieuChungService } from '../Services/TrieuChung.service';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { ChiTietComponent } from './ChiTiet/ChiTiet.component';

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
        NguiAutoCompleteModule
    ],
    providers: [
        TrieuChungService
    ],
    declarations: [
        ChanDoanComponent,
        ChiTietComponent
    ]
})
export class ChanDoanModule { }
