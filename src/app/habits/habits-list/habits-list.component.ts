import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { Habit, HabitWeek } from '../shared/habit';
import { DateFunctions } from '../../shared/date-functions';

import { HabitsDialogComponent } from '../habits-dialog/habits-dialog.component'
import { HabitsDataService } from '../shared/habits-data.service';
import { SidenavTitleService } from '../../shared/sidenav-title.service';

@Component({
    selector: 'habits-list',
    templateUrl: 'habits-list.component.html',
    styleUrls: ['habits-list.component.css']
})
export class HabitsListComponent implements OnInit {
    dateFunctions = new DateFunctions();
    habits: Habit[] = [];
    weekStarts: Date[] = [];
    shownWeekHabits: Habit[] = [];
    shownWeekDate: Date;
    shownWeekDateEnd: Date;
    previousWeekDate: Date;
    nextWeekDate: Date;

    constructor(private _habitsDataService: HabitsDataService, 
                private _sidenavTitleService: SidenavTitleService,
                public dialog: MdDialog) {
        this._sidenavTitleService.setTitle("Habits");
        this._habitsDataService.updateHabits();
        this.shownWeekDate = this.dateFunctions.getWeekStartDate();
        this.setShownWeekDateEnd();
    }

    ngOnInit() {
        this._habitsDataService.habitsSource.subscribe((habits: Habit[]) => {
            this.habits = habits;
            this._habitsDataService.addMissingWeeks();
            this.setHabitsWeekStarts();
            this.updateShownHabitsAndDates();
        });
    }

    openNewHabitDialog() {
        let config = new MdDialogConfig();
        config.data = {"isNewHabit": true};

        let dialogRef = this.dialog.open(HabitsDialogComponent, config); 
    }

    setShownWeekDateEnd() {
        this.shownWeekDateEnd = new Date();
        this.shownWeekDateEnd.setDate(this.shownWeekDate.getDate() + 7);
    }

    setHabitsWeekStarts() {
        for (let habit of this.habits) {
            for (let habitWeek of habit.weeks) {
                let weekStart: Date = habitWeek.weekStart;
                if (this.isWeekStartUnique(weekStart)) {
                    this.weekStarts.push(weekStart);
                }
            }
        }
        this.weekStarts.sort();
    }

    isWeekStartUnique(weekStart: Date): boolean {
        for (let weekStart2 of this.weekStarts) {
            if (this.dateFunctions.areHabitsDatesEqual(weekStart, weekStart2)) {
                return false;
            }
        }
        return true;
    }

    changeToPreviousWeek() {
        this.shownWeekDate = this.previousWeekDate;
        this.updateShownHabitsAndDates();
    }

    changeToNextWeek() {
        this.shownWeekDate = this.nextWeekDate;
        this.updateShownHabitsAndDates();
    }

    updateShownHabitsAndDates() {
        this.shownWeekHabits = this._habitsDataService.getShownWeekHabits(this.shownWeekDate);
        this.setPreviousWeekDate();
        this.setNextWeekDate();
        this.setShownWeekDateEnd();
    }

    setPreviousWeekDate() {
        let shownWeekIndex = this.getWeekIndex();
        shownWeekIndex--;
        let previousWeekDate = this.weekStarts[shownWeekIndex];
        this.previousWeekDate = previousWeekDate;
    }

    setNextWeekDate() {
        let shownWeekIndex = this.getWeekIndex();
        shownWeekIndex++;
        let nextWeekDate = this.weekStarts[shownWeekIndex];
        this.nextWeekDate = nextWeekDate;
    }

    getWeekIndex(): number {
        let index = 0;
        for (let weekStart of this.weekStarts) {
            if (this.dateFunctions.areHabitsDatesEqual(weekStart, this.shownWeekDate)) {
                return index;
            }
            index++;
        }
        return index;
    }
}