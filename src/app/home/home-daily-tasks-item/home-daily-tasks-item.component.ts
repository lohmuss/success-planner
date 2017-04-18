import { Component, OnInit, Input } from '@angular/core';

import { DailyTasksDataService } from '../../daily-tasks/shared/daily-tasks-data.service';

import { DailyTask } from '../../daily-tasks/shared/daily-task';

@Component({
    selector: 'home-daily-tasks-item',
    templateUrl: './home-daily-tasks-item.component.html',
    styleUrls: ['./home-daily-tasks-item.component.css']
})
export class HomeDailyTasksItemComponent implements OnInit {
    @Input() dailyTask: DailyTask;

    constructor(private _dailyTasksDataService: DailyTasksDataService) { }

    ngOnInit() { }

    changeTaskCompletion(dailyTaskId: number) {
        this._dailyTasksDataService.changeDailyTaskCompletion(dailyTaskId);
    }
}