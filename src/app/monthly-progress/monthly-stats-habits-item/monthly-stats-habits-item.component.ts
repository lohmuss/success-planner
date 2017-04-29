import { Component, OnInit, Input } from '@angular/core';

import { DateFunctions } from '../../shared/date-functions';
import { Habit, HabitWeek, HabitDay } from '../../habits/shared/habit';

import { MonthlyTasksDataService } from '../shared/monthly-tasks-data.service';

@Component({
    selector: 'monthly-stats-habits-item',
    templateUrl: 'monthly-stats-habits-item.component.html',
    styleUrls: ['monthly-stats-habits-item.component.css']
})
export class MonthlyStatsHabitsItemComponent implements OnInit {
    dateFunctions = new DateFunctions();

    @Input() habit: Habit;
    @Input() shownMonthDate: Date;
    shownMonthDaysCount: number;
    completedHabitDays: number;
    completedHabitDaysPerchentage: number;

    constructor(private _monthlyTasksDataService: MonthlyTasksDataService) {
    }

    ngOnInit() {
        this.getMonthlyHabitsStats();
        this._monthlyTasksDataService.shownMonthDateSource.subscribe((shownMonthDate: Date) => {
            this.shownMonthDate = shownMonthDate;
            this.getMonthlyHabitsStats();
        });
    }

    getMonthlyHabitsStats() {
        this.getCompletedHabitDays();
        this.shownMonthDaysCount = this.getDaysInMonth(this.shownMonthDate);
        this.completedHabitDaysPerchentage = (this.completedHabitDays/this.shownMonthDaysCount)*100;
    }

    getCompletedHabitDays() {
        this.completedHabitDays = 0;
        for (let week of this.habit.weeks) {
            for (let day of week.days) {
                this.getDailyCompletion(day);
            }
        }
    }

    getDailyCompletion(habitDay: HabitDay) {
        let habitDayDate = new Date(habitDay.date);
        if (this.dateFunctions.isFromGivenMonth(this.shownMonthDate, habitDayDate)) {
            if (habitDay.completion) {
                this.completedHabitDays++;
            }
        }
    }

    getDaysInMonth(monthStart: Date) {
        return new Date(monthStart.getFullYear(), monthStart.getMonth()+1, 0).getDate();
    }
}