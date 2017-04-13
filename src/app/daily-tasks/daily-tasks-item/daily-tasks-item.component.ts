import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { DailyTasksDataService } from '../shared/daily-tasks-data.service'
import { DailyTasksDialogComponent } from '../daily-tasks-dialog/daily-tasks-dialog.component'

import { DailyTask } from '../shared/daily-task';

@Component({
    selector: 'daily-tasks-item',
    templateUrl: './daily-tasks-item.component.html',
    styleUrls: ['./daily-tasks-item.component.css']
})
export class DailyTasksItemComponent implements OnInit {
    @Input() dailyTask: DailyTask;
    taskTitle: string;

    constructor(private _dailyTasksDataService: DailyTasksDataService, public dialog: MdDialog) { }

    ngOnInit() { }

    changeTaskCompletion(dailyTaskId: number) {
        this._dailyTasksDataService.changeDailyTaskCompletion(dailyTaskId);
    }

    openEditDailyTaskDialog(dailyTaskId: number) {
        let config = new MdDialogConfig();
        config.data = {"isNewTask": false, "taskId": dailyTaskId};

        let dialogRef = this.dialog.open(DailyTasksDialogComponent, config); 
    }
}