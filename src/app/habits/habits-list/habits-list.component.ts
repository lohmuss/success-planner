import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { HabitsDialogComponent } from '../habits-dialog/habits-dialog.component'
import { HabitsDataService } from '../shared/habits-data.service';

import { Habit, HabitWeek } from '../shared/habit';

@Component({
    selector: 'habits-list',
    templateUrl: 'habits-list.component.html'
})
export class HabitsListComponent implements OnInit {
    habits: Habit[] = [];

    constructor(private _habitsDataService: HabitsDataService, public dialog: MdDialog) { 
        this._habitsDataService.updateHabits();
    }

    ngOnInit() {
        this._habitsDataService.habitsSource.subscribe((habits: Habit[]) => {
            this.habits = habits;
        });
    }

    openNewHabitDialog() {
        let config = new MdDialogConfig();
        config.data = {"isNewHabit": true};

        let dialogRef = this.dialog.open(HabitsDialogComponent, config); 
    }
}