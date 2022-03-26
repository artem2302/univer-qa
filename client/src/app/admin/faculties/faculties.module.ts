import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FacultiesComponent } from './faculties.component';
import { FacultiesRoutingModule } from './faculties-routing.module';

@NgModule({
    declarations: [
        FacultiesComponent
    ],
    imports: [
        CommonModule,
        FacultiesRoutingModule,
        HttpClientModule
    ]
})
export class FacultiesModule { }
