import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { HabitsDialogComponent } from '../habits-dialog/habits-dialog.component';

import { HabitsDataService } from '../shared/habits-data.service';

import { Habit, HabitWeek } from '../shared/habit';

@Component({
    selector: 'habits-item',
    templateUrl: 'habits-item.component.html'
})
export class HabitsItemComponent implements OnInit {
    @Input() habit: Habit;

    constructor(private _habitsDataService: HabitsDataService, public dialog: MdDialog) { }

    ngOnInit() { }

    openEditHabitDialog(habitId: number) {
        let config = new MdDialogConfig();
        config.data = {"isNewHabit": false, "habitId": habitId};

        let dialogRef = this.dialog.open(HabitsDialogComponent, config); 
    }
}