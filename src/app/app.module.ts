import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import 'hammerjs';

import { ROUTER } from './app.router';
import { AppComponent }  from './app.component';
import { DailyTasksDialogComponent } from './daily-tasks/daily-tasks-dialog/daily-tasks-dialog.component';
import { DailyTasksListComponent } from './daily-tasks/daily-tasks-list/daily-tasks-list.component';
import { DailyTasksItemComponent } from './daily-tasks/daily-tasks-item/daily-tasks-item.component';
import { HabitsComponent } from './habits/habits.component';

import { DailyTasksDataService } from './daily-tasks/shared/daily-tasks-data.service'
import { HabitsDataService } from './habits/shared/habits-data.service'

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    ROUTER, 
    MaterialModule.forRoot(), 
    MdDialogModule.forRoot() 
  ],
  declarations: [ 
    AppComponent, 
    DailyTasksListComponent, 
    DailyTasksItemComponent, 
    DailyTasksDialogComponent,
    HabitsComponent
  ],
  providers:  [
    DailyTasksDataService,
    HabitsDataService
    ],
  bootstrap:    [ AppComponent ],
  entryComponents: [ DailyTasksDialogComponent ]
})
export class AppModule { }
