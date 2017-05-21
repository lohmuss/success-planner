import { MonthlyTask, Month } from '../shared/monthly-task';

import { DateFunctions } from '../../shared/date-functions';

describe("MonthlyTask", () => {
    let dateFunctions = new DateFunctions();

    let monthlyTask: MonthlyTask;
    let thisMonth: Month;
    let thisMonthStart: Date;

    beforeAll(() => {
        monthlyTask = new MonthlyTask({id: 0, title: "Monthly task title", complete: false});
        thisMonthStart = dateFunctions.getMonthStartDate();
        thisMonth = new Month({id: 0, monthStart: thisMonthStart, monthlyTasks: []});
        thisMonth.monthlyTasks.push(monthlyTask);
    });

    it ("should return monthlyTask's id as 0", () => {
        expect(monthlyTask.id).toBe(0);
    });

    it ("should return monthlyTask's title as 'Monthly task title'", () => {
        expect(monthlyTask.title).toBe("Monthly task title");
    });

    it ("should return monthlyTask's completion as false", () => {
        expect(monthlyTask.complete).toBeFalsy();
    });

    it ("should return month's id as 0", () => {
        expect(thisMonth.id).toBe(0);
    });

    it ("should return month's start as thisMonthStart", () => {
        expect(thisMonth.monthStart).toBe(thisMonthStart);
    });

    it ("should return month's monthlyTask as monthlyTask", () => {
        expect(thisMonth.monthlyTasks[0]).toBe(monthlyTask);
    });
});