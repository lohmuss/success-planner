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
        });
    }

    isTaskDateValid(task: DailyTask): boolean {
        let taskDate = this.getTaskDate(task);

        if (taskDate == undefined || isNaN(taskDate.getTime())) {
            return false;
        }
        return true;
    }
    
    isTaskOverdue(taskDate: Date): boolean {
        let todaysDate = new Date();

        if (taskDate.getTime() < todaysDate.getTime()) {
            if (!this.areDatesEqual(todaysDate, taskDate)) {
                return true;
            }
        }
        return false;
    }

    areDatesEqual(firstDate: Date, secondDate: Date): boolean {
        if (firstDate.getFullYear() != secondDate.getFullYear()) {
            return false;
        }
        if (firstDate.getMonth() != secondDate.getMonth()) {
            return false;
        }
        if (firstDate.getDate() != secondDate.getDate()) {
            return false;
        }
        return true;
    }

    getTaskDate(task: DailyTask): Date {
        let taskDate = new Date(task.date);
        return taskDate;
    }

    getTodaysDate(): Date {
        let todaysDate = new Date();
        return todaysDate;
    }

    getTomorrowsDate(): Date {
        let todaysDate = new Date();
        let tomorrowsDate = new Date(todaysDate.setDate(todaysDate.getDate() + 1));
        return tomorrowsDate;
    }

    sortTasks() {
        let todaysDate = this.getTodaysDate();
        let tomorrowsDate = this.getTomorrowsDate();
        this.emptySortedTasks();

        for (let task of this.tasks) {

            if (this.isTaskDateValid(task)) {
                this.sortTaskByDate(task, todaysDate, tomorrowsDate);
            } else {
                this.withoutDateTasks.push(task);
            }
        }
    }

    sortTaskByDate(task: DailyTask, todaysDate: Date, tomorrowsDate: Date) {
        let taskDate = new Date(task.date);

        if (this.isTaskOverdue(taskDate)) {
            this.overdueTasks.push(task);
        } else if (this.areDatesEqual(taskDate, todaysDate)) {
            this.todaysTasks.push(task);
        } else if (this.areDatesEqual(taskDate, tomorrowsDate)) {
            this.tomorrowsTasks.push(task);
        } else {
            this.laterTasks.push(task);
        }
    }

    emptySortedTasks() {
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