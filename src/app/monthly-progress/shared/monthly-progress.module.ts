import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MonthlyProgressComponent } from '../monthly-progress.component';
import { MonthlyTasksDialogComponent } from '../monthly-tasks-dialog/monthly-tasks-dialog.component';
import { MonthlyTasksListComponent } from '../monthly-tasks-list/monthly-tasks-list.component';
import { MonthlyTasksItemComponent } from '../monthly-tasks-item/monthly-tasks-item.component';

import { MonthlyTasksDataService } from '../shared/monthly-tasks-data.service';

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
    declarations: 
    [
        MonthlyProgressComponent,
        MonthlyTasksDialogComponent,
        MonthlyTasksListComponent,
        MonthlyTasksItemComponent
    ],
    providers: 
    [
        MonthlyTasksDataService
    ],
    entryComponents: 
    [ 
        MonthlyTasksDialogComponent
    ]
})
export class MonthlyProgressModule { }