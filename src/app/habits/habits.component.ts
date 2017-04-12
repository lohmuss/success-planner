import { Component, OnInit } from '@angular/core';

import { HabitsDataService } from './shared/habits-data.service';

import { Habit, HabitWeek } from './habit';

@Component({
    selector: 'habits',
    templateUrl: 'habits.component.html'
})
export class HabitsComponent implements OnInit {
    constructor(private _habitsDataService: HabitsDataService) { }

    ngOnInit() {
        let habitWeeks: HabitWeek[];
        let habit: Habit = new Habit({id:1, title:"title",weeks: habitWeeks});
        this._habitsDataService.addHabit(habit);
    }   
}