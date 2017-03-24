import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
    selector: 'daily-tasks-new-task',
    templateUrl: './daily-tasks-dialog.component.html',
})
export class DailyTasksDialogComponent implements OnInit {

    constructor(public dialogRef: MdDialogRef<DailyTasksDialogComponent>) { }

    ngOnInit() { }
}