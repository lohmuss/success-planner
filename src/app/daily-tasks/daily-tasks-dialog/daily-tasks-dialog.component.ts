import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { DailyTasksDataService } from '../shared/daily-tasks-data.service'

@Component({
    selector: 'daily-tasks-new-task',
    templateUrl: './daily-tasks-dialog.component.html',
})
export class DailyTasksDialogComponent implements OnInit {
    taskTitle: string;

    constructor(private _dailyTasksDataService: DailyTasksDataService,
                public dialogRef: MdDialogRef<DailyTasksDialogComponent>, 
                @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() { 
        if (!this.data.isNewTask) {
            this.taskTitle = this.getEditableTaskTitle(this.data.taskId);
        }
    }

    getEditableTaskTitle(dailyTaskId: number) {
        return this._dailyTasksDataService.getDailyTaskTitle(dailyTaskId);
    }
}