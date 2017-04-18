import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

import { DailyTask } from '../shared/daily-task';

import { DailyTasksDataService } from '../shared/daily-tasks-data.service'
import { DailyTasksDialogComponent } from '../daily-tasks-dialog/daily-tasks-dialog.component'

@Component({
    selector: 'daily-tasks-list',
    templateUrl: './daily-tasks-list.component.html',
    styleUrls: ['./daily-tasks-list.component.css']
})
export class DailyTasksListComponent implements OnInit {
    overdueTasks: DailyTask[] = [];
    todaysTasks: DailyTask[] = [];
    tomorrowsTasks: DailyTask[] = [];
    laterTasks: DailyTask[] = [];
    withoutDateTasks: DailyTask[] = [];
    
    isNewTask: boolean = true;

    constructor(private _dailyTasksDataService: DailyTasksDataService, public dialog: MdDialog) {
        this._dailyTasksDataService.updateDailyTasks();
    }

    ngOnInit() {
        this._dailyTasksDataService.sortedDailyTasksSource.subscribe((sortedTasks: DailyTask[][]) => {
            this.overdueTasks = sortedTasks["overdueTasks"];
            this.todaysTasks = sortedTasks["todaysTasks"];
            this.tomorrowsTasks = sortedTasks["tomorrowsTasks"];
            this.laterTasks = sortedTasks["laterTasks"];
            this.withoutDateTasks = sortedTasks["withoutDateTasks"];
        });
    }

    openNewDailyTaskDialog() {
        let config = new MdDialogConfig();
        config.data = {"isNewTask": true};

        let dialogRef = this.dialog.open(DailyTasksDialogComponent, config); 
    }
}