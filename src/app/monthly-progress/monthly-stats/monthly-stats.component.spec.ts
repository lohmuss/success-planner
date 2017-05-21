import { MonthlyStatsComponent } from './monthly-stats.component';

import { MonthlyTasksDataService } from '../shared/monthly-tasks-data.service';
import { DailyTasksDataService } from '../../daily-tasks/shared/daily-tasks-data.service';
import { HabitsDataService } from '../../habits/shared/habits-data.service';

import { DailyTask } from '../../daily-tasks/shared/daily-task';
import { DateFunctions } from '../../shared/date-functions';

describe("MonthlyStatsComponent", () => {
    let component = new MonthlyStatsComponent(new MonthlyTasksDataService(), new DailyTasksDataService(), new HabitsDataService());
    let dateFunctions = new DateFunctions();
    let completedTask1: DailyTask, completedTask2: DailyTask;
    let unCompletedTask1: DailyTask, unCompletedTask2: DailyTask, unCompletedTask3: DailyTask;

    let todaysDate: Date, tomorrowsDate: Date
    let overdueDate: Date = new Date(), laterDate: Date = new Date(), nextMonthDate = new Date();

    let sortedTasks: DailyTask[][] = [];

    let shownMonthTasksCount: number, completedDailyTasksCount: number;

    beforeAll(() => {
        let id: number = 0;
        todaysDate = dateFunctions.getTodaysDate();
        tomorrowsDate = dateFunctions.getTomorrowsDate();
        overdueDate.setDate(todaysDate.getDate()-1);
        laterDate.setDate(todaysDate.getDate()+2);
        nextMonthDate.setDate(todaysDate.getDate()+31);

        completedTask1 = new DailyTask({id: id++, date: overdueDate, title: "Completed task1", complete: true});
        unCompletedTask1 = new DailyTask({id: id++, date: todaysDate, title: "Uncompleted task1", complete: false});
        completedTask2 = new DailyTask({id: id++, date: tomorrowsDate, title: "Completed task2", complete: true});
        unCompletedTask2 = new DailyTask({id: id++, date: laterDate, title: "Uncompleted task1", complete: false});
        unCompletedTask3 = new DailyTask({id: id++, date: nextMonthDate, title: "Uncompleted task3", complete: false});

        sortedTasks["overdueTasks"] = [completedTask1];
        sortedTasks["todaysTasks"] = [unCompletedTask1];
        sortedTasks["tomorrowsTasks"] = [completedTask2];
        sortedTasks["laterTasks"] = [unCompletedTask2, unCompletedTask3];
    });

    it("should return tasks from sorted tasks", () => {
        component.getTasksFromSortedTasks(sortedTasks);
        expect(component.dailyTasks).toEqual([completedTask1, unCompletedTask1, completedTask2, unCompletedTask2, unCompletedTask3]);
    });

    it("should return shown month daily tasks count", () => {
        shownMonthTasksCount = 0;
        for (let task of component.dailyTasks) {
            if (dateFunctions.isFromGivenMonth(todaysDate, new Date(task.date))) {
                shownMonthTasksCount++;
            }
        }
        component.shownMonthDailyTasks = component.getGivenMonthDailyTasks(component.dailyTasks);
        expect(component.shownMonthDailyTasks.length).toBe(shownMonthTasksCount);
    });

    it("should return daily tasks stats", () => {
        completedDailyTasksCount = 0;
        for (let task of component.dailyTasks) {
            if (dateFunctions.isFromGivenMonth(todaysDate, new Date(task.date))) {
                if (task.complete) {
                    completedDailyTasksCount++;
                }
            }
        }
        component.getMonthlyDailyTasksStats();
        expect(component.completedDailyTasks).toBe(completedDailyTasksCount);
        expect(component.dailyTasksCount).toBe(shownMonthTasksCount);
        expect(component.completedTasksPerchentage).toBe((completedDailyTasksCount/shownMonthTasksCount)*100);
    });
});