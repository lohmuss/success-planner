import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { MonthlyTasksDataService } from '../shared/monthly-tasks-data.service'

import { MonthlyTask, Month } from '../shared/monthly-task';
import { DateFunctions } from '../../shared/date-functions';

@Component({
    selector: 'monthly-tasks-dialog',
    templateUrl: './monthly-tasks-dialog.component.html',
    styleUrls: ['./monthly-tasks-dialog.component.css']
})
export class MonthlyTasksDialogComponent implements OnInit {
    dateFunctions = new DateFunctions();
    taskTitle: string;

    constructor(private _monthlyTasksDataService: MonthlyTasksDataService,
        public dialogRef: MdDialogRef<MonthlyTasksDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.getEditableMonthlyTaskTitle();
    }

    addTask(monthId: number) {
        let shownMonth = this.dateFunctions.getMonthStartDate();
        let newMonthlyTask = new MonthlyTask({title: this.taskTitle});
        this._monthlyTasksDataService.addMonthlyTask(monthId, newMonthlyTask);
        this.dialogRef.close();
    }

    editTask(monthId: number, taskId: number) {
        let updatedTask = new MonthlyTask({ id: taskId, title: this.taskTitle});
        this._monthlyTasksDataService.editMonthlyTask(monthId, updatedTask);
        this.dialogRef.close();
    }

    removeTask(monthId: number, taskId: number) {
        this._monthlyTasksDataService.removeMonthlyTask(monthId, taskId);
        this.dialogRef.close();
    }

    getEditableMonthlyTaskTitle() {
        if (!this.data.isNewTask) {
            this._monthlyTasksDataService.getMonthlyTaskTitle(this.data.monthId, this.data.taskId);
            this._monthlyTasksDataService.editableMonthlyTaskTitleSource.subscribe((taskTitle: string) => {
                this.taskTitle = taskTitle;
            });
        }
    }
}