import { Component, OnInit, Inject } from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

import { DailyTasksDataService } from '../shared/daily-tasks-data.service'

import { DailyTask } from '../daily-task';

@Component({
    selector: 'daily-tasks-new-task',
    templateUrl: './daily-tasks-dialog.component.html',
    styleUrls: ['./daily-tasks-dialog.component.css']
})
export class DailyTasksDialogComponent implements OnInit {
    taskTitle: string;

    constructor(private _dailyTasksDataService: DailyTasksDataService,
                public dialogRef: MdDialogRef<DailyTasksDialogComponent>, 
                @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() { 
        this.getEditableTaskTitle(this.data.taskId);
    }
    
    addTask() {
        let newTask = new DailyTask({title: this.taskTitle, complete: false});
        this._dailyTasksDataService.addDailyTask(newTask);
        this.dialogRef.close();
    }

    editTask(dailyTaskId: number) {
        let updatedTask = new DailyTask({id:dailyTaskId, title: this.taskTitle, complete: false});
        this._dailyTasksDataService.editDailyTask(dailyTaskId, updatedTask);
        this.dialogRef.close();
    }

    removeTask(dailyTaskId: number) {
        this._dailyTasksDataService.removeDailyTask(dailyTaskId);
        this.dialogRef.close();
    }

    getEditableTaskTitle(dailyTaskId: number) {
        if (!this.data.isNewTask) {
            this._dailyTasksDataService.getDailyTaskTitle(dailyTaskId);
            this._dailyTasksDataService.taskTitleSource.subscribe((taskTitle: string) => {
                this.taskTitle = taskTitle;
            });
        }
    }

}