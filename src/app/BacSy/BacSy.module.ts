import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';



import { BacSyComponent } from './BacSy.component';


// Định nghĩa router riêng cho module này
const routing: Routes = [
    { path: '', component: BacSyComponent }
];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);


@NgModule({
    imports: [
        CommonModule,
        Routing
    ],
    declarations: [BacSyComponent]
})
export class BacSyModule { }
