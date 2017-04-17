import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { HabitsDialogComponent } from '../habits-dialog/habits-dialog.component'
import { HabitsDataService } from '../shared/habits-data.service';

import { Habit, HabitWeek } from '../shared/habit';
import { DateFunctions } from '../../shared/date-functions';

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
    previousWeekDate: Date;
    nextWeekDate: Date;

    constructor(private _habitsDataService: HabitsDataService, public dialog: MdDialog) { 
        this._habitsDataService.updateHabits();
        this.shownWeekDate = this.dateFunctions.getWeekStartDate();
    }

    ngOnInit() {
        this._habitsDataService.habitsSource.subscribe((habits: Habit[]) => {
            this.habits = habits;
            this.addMissingWeeks();
            this.getHabitsWeekStarts();
            this.updateShownHabitsAndDates();
        });
    }

    openNewHabitDialog() {
        let config = new MdDialogConfig();
        config.data = {"isNewHabit": true};

        let dialogRef = this.dialog.open(HabitsDialogComponent, config); 
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

    getHabitsWeekStarts() {
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
        this.getShownWeekHabits(this.shownWeekDate);
        this.getPreviousWeekDate();
        this.getNextWeekDate();
    }

    getPreviousWeekDate() {
        let shownWeekIndex = this.getWeekIndex();
        shownWeekIndex--;
        let previousWeekDate = this.weekStarts[shownWeekIndex];
        this.previousWeekDate = previousWeekDate;
    }

    getNextWeekDate() {
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