import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MonthlyProgressComponent } from '../monthly-progress.component';

@NgModule({
    imports: 
    [
        CommonModule,
        BrowserModule, 
        FormsModule,
        BrowserAnimationsModule, 
        MaterialModule.forRoot() 
    ],
    exports: [],
    declarations: [MonthlyProgressComponent],
    providers: [],
})
export class MonthlyProgressModule { }