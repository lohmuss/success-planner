import { Component, OnInit } from '@angular/core';

import { DailyTasksDataService } from '../../daily-tasks/shared/daily-tasks-data.service';

import { DailyTask } from '../../daily-tasks/shared/daily-task';
import { DateFunctions } from '../../shared/date-functions';

@Component({
    selector: 'home-daily-tasks-list',
    templateUrl: 'home-daily-tasks-list.component.html'
})
export class HomeDailyTasksListComponent implements OnInit {
    dateFunctions = new DateFunctions();
    tasks: DailyTask[];

    overdueTasks: DailyTask[] = [];
    todaysTasks: DailyTask[] = [];

    constructor(private _dailyTasksDataService: DailyTasksDataService) {
        this._dailyTasksDataService.updateDailyTasks();
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
            if (!this.dateFunctions.areTasksDatesEqual(todaysDate, taskDate)) {
                return true;
            }
        }
        return false;
    }

    getTaskDate(task: DailyTask): Date {
        let taskDate = new Date(task.date);
        return taskDate;
    }

    getTodaysDate(): Date {
        let todaysDate = new Date();
        return todaysDate;
    }

    sortTasks() {
        let todaysDate = this.getTodaysDate();
        this.emptySortedTasks();

        for (let task of this.tasks) {
            if (this.isTaskDateValid(task)) {
                this.sortTaskByDate(task, todaysDate);
            }
        }
    }

    sortTaskByDate(task: DailyTask, todaysDate: Date) {
        let taskDate = new Date(task.date);

        if (this.isTaskOverdue(taskDate)) {
            this.overdueTasks.push(task);
        } else if (this.dateFunctions.areTasksDatesEqual(taskDate, todaysDate)) {
            this.todaysTasks.push(task);
        }
    }

    emptySortedTasks() {
        this.overdueTasks = [];
        this.todaysTasks = [];
    }
}