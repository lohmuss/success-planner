import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { DailyTasksDataService } from '../shared/daily-tasks-data.service'

import { DailyTask } from '../shared/daily-task';

@Component({
    selector: 'daily-tasks-dialog',
    templateUrl: './daily-tasks-dialog.component.html',
    styleUrls: ['./daily-tasks-dialog.component.css']
})
export class DailyTasksDialogComponent implements OnInit {
    taskTitle: string;
    taskDate: Date;

    constructor(private _dailyTasksDataService: DailyTasksDataService,
                public dialogRef: MdDialogRef<DailyTasksDialogComponent>, 
                @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() { 
        this.getEditableTaskTitle(this.data.taskId);
        this.getEditableTaskDate(this.data.taskId);
    }
    
    addTask() {
        if (!this.isEmptyOrJustSpaces(this.taskTitle)) {
            let newTask = new DailyTask({title: this.taskTitle, date: this.taskDate, complete: false});
            this._dailyTasksDataService.addDailyTask(newTask);
            this.dialogRef.close();
        }
    }

    editTask(dailyTaskId: number) {
        if (!this.isEmptyOrJustSpaces(this.taskTitle)) {
            let updatedTask = new DailyTask({id:dailyTaskId, title: this.taskTitle, date: this.taskDate});
            this._dailyTasksDataService.editDailyTask(dailyTaskId, updatedTask);
            this.dialogRef.close();
        }
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

    getEditableTaskDate(dailyTaskId: number) {
        if (!this.data.isNewTask) {
            this._dailyTasksDataService.getDailyTaskDate(dailyTaskId);
            this._dailyTasksDataService.taskDateSource.subscribe((taskDate: Date) => {
                this.taskDate = taskDate;
            });
        }
    }

    isEmptyOrJustSpaces(title: string){
        return title === null || title.match(/^ *$/) !== null;
    }
}