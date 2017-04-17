import { Component, OnInit } from '@angular/core';

import { HabitsDataService } from '../../habits/shared/habits-data.service';

import { Habit, HabitWeek } from '../../habits/shared/habit';
import { DateFunctions } from '../../shared/date-functions';

@Component({
    selector: 'home-daily-habits-list',
    templateUrl: 'home-daily-habits-list.component.html'
})
export class HomeDailyHabitsListComponent implements OnInit {
    dateFunctions = new DateFunctions();
    habits: Habit[] = [];
    shownWeekHabits: Habit[] = [];
    shownWeekDate: Date;

    constructor(private _habitsDataService: HabitsDataService) { 
        this._habitsDataService.updateHabits();
        this.shownWeekDate = this.dateFunctions.getWeekStartDate();
    }

    ngOnInit() {
        this._habitsDataService.habitsSource.subscribe((habits: Habit[]) => {
            this.habits = habits;
            this.addMissingWeeks();
            this.getShownWeekHabits(this.shownWeekDate);
        });
    }

    addMissingWeeks() {
        for (let habit of this.habits) {
            if (!this.currentWeekExists(habit.weeks)) {
                let currentWeekStart: Date = this.dateFunctions.getWeekStartDate();
                let currentWeek: HabitWeek = new HabitWeek({weekStart: currentWeekStart});
                this._habitsDataService.addHabitWeek(habit.id, currentWeek);
            }
        } 
    }

    currentWeekExists(habitWeeks: HabitWeek[]) {
        let currentWeek = this.dateFunctions.getWeekStartDate();
        for (let habitWeek of habitWeeks) {
            if (this.dateFunctions.areHabitsDatesEqual(currentWeek, habitWeek.weekStart)) {
                return true
            }
        }
        return false;
    }
    
    getShownWeekHabits(shownWeek: Date) {
        this.shownWeekHabits = [];
        for (let habit of this.habits) {
            for (let week of habit.weeks) {
                if (this.dateFunctions.areHabitsDatesEqual(shownWeek, week.weekStart)) {
                    this.shownWeekHabits.push(habit);
                }
            }
        }
    }
}