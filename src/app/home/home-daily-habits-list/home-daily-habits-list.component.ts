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
            this._habitsDataService.addMissingWeeks();
            this.shownWeekHabits = this._habitsDataService.getShownWeekHabits(this.shownWeekDate);
        });
    }
}