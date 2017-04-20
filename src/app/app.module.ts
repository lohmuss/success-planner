import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { ROUTER } from './app.router';
import { AppComponent }  from './app.component';
import { InboxModule } from './inbox/shared/inbox.module';
import { HabitsModule } from './habits/shared/habits.module';
import { DailyTasksModule } from './daily-tasks/shared/daily-tasks.module';

@NgModule({
  imports: 
  [ 
    BrowserModule, 
    FormsModule,
    BrowserAnimationsModule, 
    ROUTER,
    InboxModule,
    HabitsModule,
    DailyTasksModule,
    MaterialModule.forRoot(), 
    MdDialogModule.forRoot() 
  ],
  declarations: 
  [ 
    AppComponent
  ],
  providers:[],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
