import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

import { DailyTasksDataService } from '../shared/daily-tasks-data.service'
import { SidenavTitleService } from '../../shared/sidenav-title.service'

import { DailyTask } from '../shared/daily-task';
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

    constructor(private _dailyTasksDataService: DailyTasksDataService,
                private _sidenavTitleService: SidenavTitleService,
                public dialog: MdDialog) {
        this._sidenavTitleService.setTitle("Daily Tasks");
        this._dailyTasksDataService.updateDailyTasks();
    }

    ngOnInit() {
        this._dailyTasksDataService.sortedDailyTasksSource.subscribe((sortedTasks: DailyTask[][]) => {
            this.overdueTasks = this.removeCompletedTasks(sortedTasks["overdueTasks"]);
            this.todaysTasks = sortedTasks["todaysTasks"];
            this.tomorrowsTasks = sortedTasks["tomorrowsTasks"];
            this.laterTasks = sortedTasks["laterTasks"];
            this.withoutDateTasks = this.removeCompletedTasks(sortedTasks["withoutDateTasks"]);
        });
    }

    removeCompletedTasks(tasks: DailyTask[]) {
        let taskIndex: number = 0;
        let unCompletedTasks: DailyTask[] = [];
        for (let task of tasks) {
            if (!task.complete) {
                unCompletedTasks.push(task);
            }
        }
        return unCompletedTasks;
    }

    openNewDailyTaskDialog() {
        let config = new MdDialogConfig();
        config.data = {"isNewTask": true};

        let dialogRef = this.dialog.open(DailyTasksDialogComponent, config); 
    }
}