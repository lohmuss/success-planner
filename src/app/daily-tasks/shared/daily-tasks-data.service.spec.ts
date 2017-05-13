import { DailyTasksDataService } from './daily-tasks-data.service';
import { DailyTask } from './daily-task';
import { DateFunctions } from '../../shared/date-functions';

describe("DailyTasksDialogComponent", () => {
    let service = new DailyTasksDataService();
    let dateFunctions = new DateFunctions();

    let unsortedTasks: DailyTask[] = [];
    let todaysTask: DailyTask, tomorrowsTask: DailyTask, overdueTask: DailyTask, laterTask: DailyTask;

    beforeAll(() => {
        let id: number = 0;

        let todaysDate: Date = dateFunctions.getTodaysDate();
        
        let tomorrowsDate = dateFunctions.getTomorrowsDate();
        tomorrowsTask = new DailyTask({id: id++, date: tomorrowsDate, title: "Tomorrow's task", complete: false});
        
        let overdueDate = new Date(todaysDate.setDate(todaysDate.getDate() - 1));
        overdueTask = new DailyTask({id: id++, date: overdueDate, title: "Overdue task", complete: false});
    
        let laterDate = new Date(todaysDate.setDate(todaysDate.getDate() + 3));
        laterTask = new DailyTask({id: id++, date: laterDate, title: "Later task", complete: false});
    
        todaysDate = dateFunctions.getTodaysDate();
        todaysTask = new DailyTask({id: id, date: todaysDate, title: "Today's task", complete: false});

        unsortedTasks.push(todaysTask, tomorrowsTask, overdueTask, laterTask);
    });

    it ("should return true as date is valid", () => {
        let date = new Date();
        let task = new DailyTask({date: date});

        let isTaskDateValid = service.isTaskDateValid(task);
        expect(isTaskDateValid).toBeTruthy();
    });

    it ("should return false as date is invalid", () => {
        let date = undefined;
        let task = new DailyTask({date: date});

        let isTaskDateValid = service.isTaskDateValid(task);
        expect(isTaskDateValid).toBeFalsy();
    });

    it("should sort tasks by date", () => {
        let sortedTasks = service.addSortedTasks(unsortedTasks);

        expect(sortedTasks["overdueTasks"][0]).toBe(overdueTask);
        expect(sortedTasks["todaysTasks"][0]).toBe(todaysTask);
        expect(sortedTasks["tomorrowsTasks"][0]).toBe(tomorrowsTask);
        expect(sortedTasks["laterTasks"][0]).toBe(laterTask);
    });
});