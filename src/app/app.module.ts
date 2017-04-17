import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { ROUTER } from './app.router';
import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeDailyTasksListComponent } from './home/home-daily-tasks-list/home-daily-tasks-list.component';
import { HomeDailyHabitsListComponent } from './home/home-daily-habits-list/home-daily-habits-list.component';
import { HomeDailyHabitsItemComponent } from './home/home-daily-habits-item/home-daily-habits-item.component';
import { DailyTasksDialogComponent } from './daily-tasks/daily-tasks-dialog/daily-tasks-dialog.component';
import { DailyTasksListComponent } from './daily-tasks/daily-tasks-list/daily-tasks-list.component';
import { DailyTasksItemComponent } from './daily-tasks/daily-tasks-item/daily-tasks-item.component';
import { HabitsListComponent } from './habits/habits-list/habits-list.component';
import { HabitsItemComponent } from './habits/habits-item/habits-item.component';
import { HabitsDialogComponent } from './habits/habits-dialog/habits-dialog.component';

import { DailyTasksDataService } from './daily-tasks/shared/daily-tasks-data.service'
import { HabitsDataService } from './habits/shared/habits-data.service'

@NgModule({
  imports: 
  [ 
    BrowserModule, 
    FormsModule,
    BrowserAnimationsModule, 
    ROUTER, 
    MaterialModule.forRoot(), 
    MdDialogModule.forRoot() 
  ],
  declarations: 
  [ 
    AppComponent,
    HomeComponent,
    HomeDailyTasksListComponent,
    HomeDailyHabitsListComponent,
    HomeDailyHabitsItemComponent,
    DailyTasksListComponent, 
    DailyTasksItemComponent, 
    DailyTasksDialogComponent,
    HabitsListComponent,
    HabitsItemComponent,
    HabitsDialogComponent
  ],
  providers:
  [
    DailyTasksDataService,
    HabitsDataService
  ],
  bootstrap:    [ AppComponent ],
  entryComponents: 
  [ 
    DailyTasksDialogComponent,
    HabitsDialogComponent
  ]
})
export class AppModule { }
