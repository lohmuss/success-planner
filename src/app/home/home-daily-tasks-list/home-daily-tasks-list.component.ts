import { Component, OnInit } from '@angular/core';

import { DailyTasksDataService } from '../../daily-tasks/shared/daily-tasks-data.service';

import { DailyTask } from '../../daily-tasks/shared/daily-task';
import { DateFunctions } from '../../shared/date-functions';

@Component({
    selector: 'home-daily-tasks-list',
    templateUrl: 'home-daily-tasks-list.component.html'
})
export class HomeDailyTasksListComponent implements OnInit {
    dateFunctions = new DateFunctions();
    overdueTasks: DailyTask[] = [];
    todaysTasks: DailyTask[] = [];

    constructor(private _dailyTasksDataService: DailyTasksDataService) {
        this._dailyTasksDataService.updateDailyTasks();
    }

    ngOnInit() {
        this._dailyTasksDataService.sortedDailyTasksSource.subscribe((sortedTasks: DailyTask[][]) => {
            this.overdueTasks = sortedTasks["overdueTasks"];
            this.todaysTasks = sortedTasks["todaysTasks"];
        });
    }
}