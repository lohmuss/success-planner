import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { HabitsDataService } from '../shared/habits-data.service'

import { Habit, HabitWeek } from '../shared/habit';
import { DateFunctions } from '../../shared/date-functions';

@Component({
    selector: 'habits-dialog',
    templateUrl: './habits-dialog.component.html',
    styleUrls: ['./habits-dialog.component.css']
})
export class HabitsDialogComponent implements OnInit {
    dateFunctions = new DateFunctions();
    habitTitle: string;
    habitWeeks: HabitWeek[];

    constructor(private _habitsDataService: HabitsDataService,
        public dialogRef: MdDialogRef<HabitsDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.getEditableHabitTitle(this.data.habitId);
        this.getEditableHabitWeeks(this.data.habitId)
    }

    addHabit() {
        let weekStart: Date = this.dateFunctions.getWeekStartDate();
        let newHabitWeeks: HabitWeek[] = [];
        newHabitWeeks.push(new HabitWeek({ weekStart: weekStart }));
        let newHabit = new Habit({title: this.habitTitle,  weeks: newHabitWeeks});
        this._habitsDataService.addHabit(newHabit);
        this.dialogRef.close();
    }

    editHabit(habitId: number) {
        let updatedHabit = new Habit({ id: habitId, title: this.habitTitle, weeks: this.habitWeeks });
        this._habitsDataService.editHabit(habitId, updatedHabit);
        this.dialogRef.close();
    }

    removeHabit(habitId: number) {
        this._habitsDataService.removeHabit(habitId);
        this.dialogRef.close();
    }

    getEditableHabitTitle(habitId: number) {
        if (!this.data.isNewHabit) {
            this._habitsDataService.getHabitTitle(habitId);
            this._habitsDataService.editableHabitTitleSource.subscribe((habitTitle: string) => {
                this.habitTitle = habitTitle;
            });
        }
    }

    getEditableHabitWeeks(habitId: number) {
        if (!this.data.isNewHabit) {
            this._habitsDataService.getHabitWeeks(habitId);
            this._habitsDataService.editableHabitWeeksSource.subscribe((habitWeeks: HabitWeek[]) => {
                this.habitWeeks = habitWeeks;
            });
        }
    }
}