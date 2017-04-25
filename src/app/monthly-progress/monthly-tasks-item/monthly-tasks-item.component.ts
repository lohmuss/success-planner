import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { MonthlyTasksDialogComponent } from '../monthly-tasks-dialog/monthly-tasks-dialog.component';

import { MonthlyTasksDataService } from '../shared/monthly-tasks-data.service';

import { MonthlyTask, Month } from '../shared/monthly-task';
import { DateFunctions } from '../../shared/date-functions';

@Component({
    selector: 'monthly-tasks-item',
    templateUrl: './monthly-tasks-item.component.html',
    styleUrls: ['./monthly-tasks-item.component.css']
})
export class MonthlyTasksItemComponent implements OnInit {
    dateFunctions = new DateFunctions();
    @Input() month: Month;
    @Input() monthlyTask: MonthlyTask;
    @Input() lastTask: boolean;

    constructor(private _monthlyTasksDataService: MonthlyTasksDataService, public dialog: MdDialog) {}

    ngOnInit() { }

    openEditMonthlyTaskDialog(monthId: number, taskId: number) {
        let config = new MdDialogConfig();
        config.data = {"isNewTask": false, "monthId": monthId, "taskId": taskId};

        let dialogRef = this.dialog.open(MonthlyTasksDialogComponent, config); 
    }

    changeTaskCompletion(monthId: number, taskId: number) {
        this._monthlyTasksDataService.changeMonthlyTaskCompletion(monthId, taskId);
    }
}