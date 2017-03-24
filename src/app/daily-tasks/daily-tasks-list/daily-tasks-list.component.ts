import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

import { DailyTask } from '../daily-task';

import { DailyTasksDataService } from '../shared/daily-tasks-data.service'
import { DailyTasksDialogComponent } from '../daily-tasks-dialog/daily-tasks-dialog.component'

@Component({
    selector: 'daily-tasks-list',
    templateUrl: './daily-tasks-list.component.html',
    styleUrls: ['./daily-tasks-list.component.css']
})
export class DailyTasksListComponent implements OnInit {
    tasks: DailyTask[] = [];
    taskTitle: string;

    constructor(private _dailyTasksDataService: DailyTasksDataService, public dialog: MdDialog) { 
    }

    ngOnInit() {
        this.tasks = this._dailyTasksDataService.getDailyTasks();
    }

    openDailyTaskDialog() {
        let dialogRef = this.dialog.open(DailyTasksDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.taskTitle = result;
            let newTask = new DailyTask({title: this.taskTitle, complete: false});
            this._dailyTasksDataService.addDailyTask(newTask);
        });
    }
}