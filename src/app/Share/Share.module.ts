// module
import { NgModule } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    minScrollbarLength: 30
};

@NgModule({
    imports: [
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
    ],
    declarations: [

    ],
    exports: [
        PerfectScrollbarModule

    ],
    providers: [
        NgSwitch,
        NgSwitchCase,

    ]
})
export class ShareModule { }
