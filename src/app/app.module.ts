import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';


const routes: Routes = [
    { path: '', loadChildren: './ChanDoan/ChanDoan.module#ChanDoanModule' },
    { path: 'bacsy', loadChildren: './BacSy/BacSy.module#BacSyModule' },
    { path: 'tracuubenh', loadChildren: './Component/TraCuuBenh/TraCuuBenh.module#TraCuuBenhModule'}
];
const Routing: ModuleWithProviders = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false });


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        Routing,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
