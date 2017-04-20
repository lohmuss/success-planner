import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InboxComponent } from '../../inbox/inbox.component';
import { InboxDailyTasksListComponent } from '../../inbox/inbox-daily-tasks-list/inbox-daily-tasks-list.component';
import { InboxDailyTasksItemComponent } from '../../inbox/inbox-daily-tasks-item/inbox-daily-tasks-item.component';
import { InboxDailyHabitsListComponent } from '../../inbox/inbox-daily-habits-list/inbox-daily-habits-list.component';
import { InboxDailyHabitsItemComponent } from '../../inbox/inbox-daily-habits-item/inbox-daily-habits-item.component';
import { DailyTasksItemComponent } from '../../daily-tasks/daily-tasks-item/daily-tasks-item.component';

import { DailyTasksDataService } from '../../daily-tasks/shared/daily-tasks-data.service'
import { HabitsDataService } from '../../habits/shared/habits-data.service'

@NgModule({
    imports: 
    [ 
        CommonModule,
        BrowserModule, 
        FormsModule,
        BrowserAnimationsModule, 
        MaterialModule.forRoot(), 
    ],
    declarations: 
    [ 
        InboxComponent,
        InboxDailyTasksListComponent,
        InboxDailyTasksItemComponent,
        InboxDailyHabitsListComponent,
        InboxDailyHabitsItemComponent
    ],
    providers:
    [
        DailyTasksDataService,
        HabitsDataService
    ]
})
export class InboxModule { }
