import { Component, OnInit } from '@angular/core';

import { DateFunctions } from '../../shared/date-functions';
import { DailyTask } from '../../daily-tasks/shared/daily-task';
import { Habit, HabitWeek } from '../../habits/shared/habit';

import { MonthlyTasksDataService } from '../shared/monthly-tasks-data.service';
import { DailyTasksDataService } from '../../daily-tasks/shared/daily-tasks-data.service';
import { HabitsDataService } from '../../habits/shared/habits-data.service';

@Component({
    selector: 'monthly-stats',
    templateUrl: 'monthly-stats.component.html',
    styleUrls: ['monthly-stats.component.css']
})
export class MonthlyStatsComponent implements OnInit {
    dateFunctions = new DateFunctions();
    dailyTasks: DailyTask[];
    shownMonthDailyTasks: DailyTask[];
    habits: Habit[];
    shownMonthDate: Date;

    dailyTasksCount: number;
    completedDailyTasks: number;
    completedTasksPerchentage: number;

    constructor(private _monthlyTasksDataService: MonthlyTasksDataService,
                private _dailyTasksDataService: DailyTasksDataService,
                private _habitsDataService: HabitsDataService) {
        this._dailyTasksDataService.updateDailyTasks();
        this._habitsDataService.updateHabits();
        this.shownMonthDate = this.dateFunctions.getMonthStartDate();
    }

    ngOnInit() {
        this._monthlyTasksDataService.shownMonthDateSource.subscribe((shownMonthDate: Date) => {
            this.shownMonthDate = shownMonthDate;
            this.shownMonthDailyTasks = this.getGivenMonthDailyTasks(this.dailyTasks);
            this.getMonthlyDailyTasksStats();
        });
        this._dailyTasksDataService.sortedDailyTasksSource.subscribe((sortedTasks: DailyTask[][]) => {
            this.getTasksFromSortedTasks(sortedTasks);
            this.shownMonthDailyTasks = this.getGivenMonthDailyTasks(this.dailyTasks);
            this.getMonthlyDailyTasksStats();
        }); 
        this._habitsDataService.habitsSource.subscribe((habits: Habit[]) => {
            this.habits = habits;
        });
    }

    getTasksFromSortedTasks(sortedTasks: DailyTask[][]) {
        let dailyTasks: DailyTask[] = [];
        let tasks = dailyTasks.concat(sortedTasks["overdueTasks"]);
        tasks = tasks.concat(sortedTasks["todaysTasks"]);
        tasks = tasks.concat(sortedTasks["tomorrowsTasks"]);
        tasks = tasks.concat(sortedTasks["laterTasks"]);
        this.dailyTasks = tasks;
    }

    getMonthlyDailyTasksStats() {
        this.completedDailyTasks = 0;
        for (let task of this.shownMonthDailyTasks) {
            if (task.complete === true) {
                this.completedDailyTasks++;
            }
        }
        this.dailyTasksCount = this.shownMonthDailyTasks.length;
        this.completedTasksPerchentage = (this.completedDailyTasks/this.shownMonthDailyTasks.length)*100;
    }

    getGivenMonthDailyTasks(dailyTasks: DailyTask[]): DailyTask[] {
        let shownMonthDailyTasks: DailyTask[] = [];
        for (let task of dailyTasks) {
            if (this.dateFunctions.isFromGivenMonth(this.shownMonthDate, new Date(task.date))) {
                shownMonthDailyTasks.push(task);
            }
        }
        return shownMonthDailyTasks;
    }
}