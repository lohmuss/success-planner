import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

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
    isNewTask: boolean = true;

    overdueTasks: DailyTask[] = [];
    todaysTasks: DailyTask[] = [];
    tomorrowsTasks: DailyTask[] = [];
    laterTasks: DailyTask[] = [];
    withoutDateTasks: DailyTask[] = [];

    constructor(private _dailyTasksDataService: DailyTasksDataService, public dialog: MdDialog) {
    }

    ngOnInit() {
        this._dailyTasksDataService.dailyTasksSource.subscribe((tasks: DailyTask[]) => {
            this.tasks = tasks;
            this.sortTasks();
            console.log(this.compareTaskDateToToday(this.tasks[0].date));
        });
    }

    compareTaskDateToToday(taskDate: Date): boolean {
        let todaysDate = new Date();
        taskDate = new Date(taskDate);

        if (todaysDate.getFullYear() == taskDate.getFullYear()) {
            if (todaysDate.getMonth() == taskDate.getMonth()) {
                if (todaysDate.getDate() == taskDate.getDate()) {
                    return true;
                }
            }       
        }
        return false;
    }

    sortTasks() {
        this.emptyTasks();
        for (let task of this.tasks) {
            if (task.date != undefined) {
                if (this.compareTaskDateToToday(task.date)) {
                    this.todaysTasks.push(task);
                }
            } else {
                this.withoutDateTasks.push(task);
            }
        }
    }

    emptyTasks() {
        this.overdueTasks = [];
        this.todaysTasks = [];
        this.tomorrowsTasks = [];
        this.laterTasks = [];
        this.withoutDateTasks = [];
    }

    openNewDailyTaskDialog() {
        let config = new MdDialogConfig();
        config.data = {"isNewTask": true};

        let dialogRef = this.dialog.open(DailyTasksDialogComponent, config); 
    }
}