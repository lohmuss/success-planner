import { InboxDailyTasksListComponent } from '../inbox-daily-tasks-list/inbox-daily-tasks-list.component';
import { DailyTasksDataService } from '../../daily-tasks/shared/daily-tasks-data.service';

import { DailyTask } from '../../daily-tasks/shared/daily-task';

describe("HabitsItemComponent", () => {
    let component = new InboxDailyTasksListComponent(new DailyTasksDataService());

    let tasks: DailyTask[] = [];

    beforeAll(() => {
        let id = 0;

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