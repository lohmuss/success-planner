import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from '../../home/home.component';
import { HomeDailyTasksListComponent } from '../../home/home-daily-tasks-list/home-daily-tasks-list.component';
import { HomeDailyTasksItemComponent } from '../../home/home-daily-tasks-item/home-daily-tasks-item.component';
import { HomeDailyHabitsListComponent } from '../../home/home-daily-habits-list/home-daily-habits-list.component';
import { HomeDailyHabitsItemComponent } from '../../home/home-daily-habits-item/home-daily-habits-item.component';
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
        HomeComponent,
        HomeDailyTasksListComponent,
        HomeDailyTasksItemComponent,
        HomeDailyHabitsListComponent,
        HomeDailyHabitsItemComponent
    ],
    providers:
    [
        DailyTasksDataService,
        HabitsDataService
    ]
})
export class HomeModule { }
