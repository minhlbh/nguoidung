import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';


const routes: Routes = [
    { path: '', loadChildren: './ChanDoan/ChanDoan.module#ChanDoanModule' }
];
const Routing: ModuleWithProviders = RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true });


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
