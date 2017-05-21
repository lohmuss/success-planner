import { MonthlyTasksDataService } from '../shared/monthly-tasks-data.service';
import { MonthlyTask, Month } from '../shared/monthly-task';

import { DateFunctions } from '../../shared/date-functions';

describe("MonthlyTask", () => {
    let service = new MonthlyTasksDataService();
    let dateFunctions = new DateFunctions();

    let monthlyTask1: MonthlyTask, monthlyTask2: MonthlyTask, monthlyTask3: MonthlyTask;
    let thisMonth: Month;
    let thisMonthStart: Date;
    let months: Month[] = [];

    beforeAll(() => {
        monthlyTask1 = new MonthlyTask({id: 0, title: "Monthly task 1 title", complete: false});
        monthlyTask2 = new MonthlyTask({id: 1, title: "Monthly task 2 title", complete: false});
        monthlyTask3 = new MonthlyTask({id: 2, title: "Monthly task 3 title", complete: false});
        thisMonthStart = dateFunctions.getMonthStartDate();
        thisMonth = new Month({id: 0, monthStart: thisMonthStart, monthlyTasks: []});
        thisMonth.monthlyTasks.push(monthlyTask1, monthlyTask2, monthlyTask3);
    
        months.push(thisMonth);
        service.months = months;
    });

    it ("should return monthlyTask index as 0", () => {
        let arrayKey = service.getMonthlyTaskArrayKey(thisMonth.monthlyTasks, monthlyTask1.id);
        expect(arrayKey).toBe(0);
    });

    it ("should return monthlyTask index as 1", () => {
        let arrayKey = service.getMonthlyTaskArrayKey(thisMonth.monthlyTasks, monthlyTask2.id);
        expect(arrayKey).toBe(1);
    });

    it ("should return monthlyTask index as 2", () => {
        let arrayKey = service.getMonthlyTaskArrayKey(thisMonth.monthlyTasks, monthlyTask3.id);
        expect(arrayKey).toBe(2);
    });

    it ("should return monthlyTask1 when searched by id 0", () => {
        let monthlyTask = service.getMonthlyTask(thisMonth.monthlyTasks, 0);
        expect(monthlyTask).toBe(monthlyTask1);
    });
    
    it ("should return monthlyTask1 when searched by id 1", () => {
        let monthlyTask = service.getMonthlyTask(thisMonth.monthlyTasks, 1);
        expect(monthlyTask).toBe(monthlyTask2);
    });

    it ("should return monthlyTask1 when searched by id 2", () => {
        let monthlyTask = service.getMonthlyTask(thisMonth.monthlyTasks, 2);
        expect(monthlyTask).toBe(monthlyTask3);
    });

    it ("should return true for current month existing", () => {
        let currentMonthExists = service.currentMonthExists(months);
        expect(currentMonthExists).toBeTruthy();
    });

    it ("should return false for current not existing", () => {
        
        let currentMonthExists = service.currentMonthExists([]);
        expect(currentMonthExists).toBeFalsy();
    });

    it ("should return this month when searched by this month start date", () => {
        let shownMonth = service. getShownMonth(thisMonthStart);
        expect(shownMonth).toBe(thisMonth);
    });

    it ("should return this month's tasks when searched by this month start date", () => {
        let shownMonthsTasks = service. getShownMonthTasks(thisMonthStart);
        expect(shownMonthsTasks).toEqual(thisMonth.monthlyTasks);
    });
});