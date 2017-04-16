import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { HabitsDialogComponent } from '../habits-dialog/habits-dialog.component';

import { HabitsDataService } from '../shared/habits-data.service';

import { Habit, HabitWeek } from '../shared/habit';
import { DateFunctions } from '../../shared/date-functions';

@Component({
    selector: 'habits-item',
    templateUrl: 'habits-item.component.html'
})
export class HabitsItemComponent implements OnInit {
    dateFunctions = new DateFunctions();
    @Input() habit: Habit;
    @Input() shownWeekDate: Date;
    shownWeek: HabitWeek;
    weekDays: String[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    constructor(private _habitsDataService: HabitsDataService, public dialog: MdDialog) {}

    ngOnInit() {
        this.getShownWeek(this.shownWeekDate);
    }

    ngOnChanges() {
        this.getShownWeek(this.shownWeekDate);
    }

    openEditHabitDialog(habitId: number) {
        let config = new MdDialogConfig();
        config.data = {"isNewHabit": false, "habitId": habitId};

        let dialogRef = this.dialog.open(HabitsDialogComponent, config); 
    }

    getShownWeek(shownWeekDate: Date) {
        for (let week of this.habit.weeks) {
            if (this.dateFunctions.areDatesEqual(shownWeekDate, week.weekStart)) {
                this.shownWeek = week;
            }
        }
    }

    changeHabitCompletion(habitId: number, dayId: number, shownWeek: HabitWeek) {
        this._habitsDataService.changeHabitCompletion(habitId, dayId, shownWeek);
    }
}