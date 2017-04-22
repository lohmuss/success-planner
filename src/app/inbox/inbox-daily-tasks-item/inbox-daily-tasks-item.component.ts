import { Component, OnInit, Input } from '@angular/core';

import { DailyTasksDataService } from '../../daily-tasks/shared/daily-tasks-data.service';

import { DailyTask } from '../../daily-tasks/shared/daily-task';

@Component({
    selector: 'inbox-daily-tasks-item',
    templateUrl: './inbox-daily-tasks-item.component.html',
    styleUrls: ['./inbox-daily-tasks-item.component.css']
})
export class InboxDailyTasksItemComponent implements OnInit {
    @Input() dailyTask: DailyTask;
    @Input() lastTask: boolean;
    @Input() overdue: boolean;

    constructor(private _dailyTasksDataService: DailyTasksDataService) { }

    ngOnInit() { }

    changeTaskCompletion(dailyTaskId: number) {
        this._dailyTasksDataService.changeDailyTaskCompletion(dailyTaskId);
    }
}