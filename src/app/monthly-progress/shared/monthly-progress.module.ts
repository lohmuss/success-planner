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
import { MonthlyStatsComponent } from '../monthly-stats/monthly-stats.component';
import { MonthlyStatsHabitsItemComponent } from '../monthly-stats-habits-item/monthly-stats-habits-item.component';
import { MonthlyNotificationComponent } from '../monthly-notification/monthly-notification.component';
import { PushNotificationComponent } from '../../shared/ng2-notifications';

import { MonthlyTasksDataService } from '../shared/monthly-tasks-data.service';
import { DailyTasksDataService } from '../../daily-tasks/shared/daily-tasks-data.service';
import { HabitsDataService } from '../../habits/shared/habits-data.service';

@NgModule({
    imports: 
    [
        CommonModule,
        BrowserModule, 
        FormsModule,
        BrowserAnimationsModule, 
        MaterialModule
    ],
    exports: [],
    declarations: 
    [
        MonthlyProgressComponent,
        MonthlyTasksDialogComponent,
        MonthlyTasksListComponent,
        MonthlyTasksItemComponent,
        MonthlyStatsComponent,
        MonthlyStatsHabitsItemComponent,
        MonthlyNotificationComponent,
        PushNotificationComponent
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