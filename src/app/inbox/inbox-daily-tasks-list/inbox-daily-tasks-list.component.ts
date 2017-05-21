import { Component, OnInit } from '@angular/core';

import { DailyTasksDataService } from '../../daily-tasks/shared/daily-tasks-data.service';

import { DailyTask } from '../../daily-tasks/shared/daily-task';
import { DateFunctions } from '../../shared/date-functions';

@Component({
    selector: 'inbox-daily-tasks-list',
    templateUrl: 'inbox-daily-tasks-list.component.html',
    styleUrls: ['inbox-daily-tasks-list.component.css']
})
export class InboxDailyTasksListComponent implements OnInit {
    dateFunctions = new DateFunctions();
    overdueTasks: DailyTask[] = [];
    todaysTasks: DailyTask[] = [];

    constructor(private _dailyTasksDataService: DailyTasksDataService) {
        this._dailyTasksDataService.updateDailyTasks();
    }

    ngOnInit() {
        this._dailyTasksDataService.sortedDailyTasksSource.subscribe((sortedTasks: DailyTask[][]) => {
            this.overdueTasks = this.removeCompletedTasks(sortedTasks["overdueTasks"]);
            this.todaysTasks = sortedTasks["todaysTasks"];
        });
    }

    removeCompletedTasks(tasks: DailyTask[]) {
        let unCompletedTasks: DailyTask[] = [];
        for (let task of tasks) {
            if (!task.complete) {
                unCompletedTasks.push(task);
            }
        }
        return unCompletedTasks;
    }
}