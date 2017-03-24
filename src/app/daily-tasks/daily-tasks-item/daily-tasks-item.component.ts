import { Component, OnInit, Input } from '@angular/core';

import { DailyTasksDataService } from '../shared/daily-tasks-data.service'

import { DailyTask } from '../daily-task';

@Component({
    selector: 'daily-tasks-item',
    templateUrl: './daily-tasks-item.component.html',
    styleUrls: ['./daily-tasks-item.component.css']
})
export class DailyTasksItemComponent implements OnInit {
    @Input() dailyTask: DailyTask;

    constructor(private _dailyTasksDataService: DailyTasksDataService) { }

    ngOnInit() { }

    changeTaskCompletion(dailyTaskId: number) {
        this._dailyTasksDataService.changeDailyTaskCompletion(dailyTaskId);
    }

    removeTask(dailyTaskId: number) {
        this._dailyTasksDataService.removeDailyTask(dailyTaskId);
    }

}