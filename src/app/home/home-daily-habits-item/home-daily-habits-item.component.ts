import { Component, OnInit, Input } from '@angular/core';

import { HabitsDataService } from '../../habits/shared/habits-data.service';

import { Habit, HabitWeek } from '../../habits/shared/habit';
import { DateFunctions } from '../../shared/date-functions';

@Component({
    selector: 'home-daily-habits-item',
    templateUrl: './home-daily-habits-item.component.html'
})
export class HomeDailyHabitsItemComponent implements OnInit {
    dateFunctions = new DateFunctions();
    @Input() habit: Habit;
    @Input() shownWeekDate: Date;
    shownWeek: HabitWeek;
    shownDay: number;

    constructor(private _habitsDataService: HabitsDataService) {}

    ngOnInit() {
        this.getShownWeek(this.shownWeekDate);
        this.getShownDay();
    }

    getShownDay() {
        let todaysDay = new Date().getDay()-1;
        if (todaysDay < 0) {
            todaysDay = 6;
        }
        this.shownDay = todaysDay;
    }

    getShownWeek(shownWeekDate: Date) {
        for (let week of this.habit.weeks) {
            if (this.dateFunctions.areHabitsDatesEqual(shownWeekDate, week.weekStart)) {
                this.shownWeek = week;
            }
        }
    }

    changeHabitCompletion(habitId: number, dayId: number, shownWeek: HabitWeek) {
        this._habitsDataService.changeHabitCompletion(habitId, dayId, shownWeek);
    }
}