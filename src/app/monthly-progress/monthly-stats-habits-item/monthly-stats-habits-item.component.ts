import { Component, OnInit, Input } from '@angular/core';

import { Habit, HabitWeek } from '../../habits/shared/habit';

@Component({
    selector: 'monthly-stats-habits-item',
    templateUrl: 'monthly-stats-habits-item.component.html',
    styleUrls: ['monthly-stats-habits-item.component.css']
})
export class MonthlyStatsHabitsItemComponent implements OnInit {
    @Input() habit: Habit;

    constructor() { }

    ngOnInit() { }
}