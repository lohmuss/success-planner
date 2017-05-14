import { DailyTasksListComponent } from './daily-tasks-list.component';
import { DailyTask } from '../shared/daily-task';

import { DailyTasksDataService } from '../shared/daily-tasks-data.service'
import { SidenavTitleService } from '../../shared/sidenav-title.service'

describe("DailyTasksListComponent", () => {
    let component = new DailyTasksListComponent(new DailyTasksDataService(), 
                    new SidenavTitleService(), 
                    null);
    let tasks: DailyTask[] = [];

    beforeAll(() => {
        let id: number = 0;

        let completedTask1 = new DailyTask({id: id++, date: new Date(), title: "Completed task1", complete: true});
        let unCompletedTask1 = new DailyTask({id: id++, date: new Date(), title: "Uncompleted task1", complete: false});
        let completedTask2 = new DailyTask({id: id++, date: new Date(), title: "Completed task2", complete: true});
        let unCompletedTask2 = new DailyTask({id: id++, date: new Date(), title: "Uncompleted task1", complete: false});

        tasks.push(completedTask1, completedTask2, unCompletedTask1, unCompletedTask2);
    });

    it ("should return tasks that aren't completed", () => {
        let unCompletedTasks = component.removeCompletedTasks(tasks);

        for (let task of unCompletedTasks) {
            expect(task.complete).toBeFalsy();
        }
    });
});