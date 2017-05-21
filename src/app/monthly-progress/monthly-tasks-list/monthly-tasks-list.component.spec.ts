import { MonthlyTasksListComponent } from './monthly-tasks-list.component';

import { MonthlyTasksDataService } from '../shared/monthly-tasks-data.service';
import { SidenavTitleService } from '../../shared/sidenav-title.service';

import { MonthlyTask, Month } from '../shared/monthly-task';
import { DateFunctions } from '../../shared/date-functions';

describe("MonthlyTasksListComponent", () => {
    let component = new MonthlyTasksListComponent(new MonthlyTasksDataService(), new SidenavTitleService(), null);
    let dateFunctions = new DateFunctions();

    let monthlyTask1: MonthlyTask, monthlyTask2: MonthlyTask, monthlyTask3: MonthlyTask;
    let thisMonth: Month, nextMonth: Month, newMonth: Month;
    let thisMonthStart: Date, nextMonthStart: Date = new Date(), newMonthStart: Date;
    let months: Month[] = [];

    beforeAll(() => {
        monthlyTask1 = new MonthlyTask({id: 0, title: "Monthly task 1 title", complete: false});
        monthlyTask2 = new MonthlyTask({id: 1, title: "Monthly task 2 title", complete: false});
        monthlyTask3 = new MonthlyTask({id: 2, title: "Monthly task 3 title", complete: false});
       
        thisMonthStart = dateFunctions.getMonthStartDate();
        nextMonthStart.setDate(nextMonthStart.getDate()+31);

        thisMonth = new Month({id: 0, monthStart: thisMonthStart, monthlyTasks: []});
        thisMonth.monthlyTasks.push(monthlyTask1, monthlyTask2, monthlyTask3);

        nextMonth = new Month({id: 1, monthStart: nextMonthStart, monthlyTasks: []});
        nextMonth.monthlyTasks.push(monthlyTask1, monthlyTask2, monthlyTask3);

        newMonthStart = new Date(thisMonthStart.getDate()-31);
        newMonth = new Month({id: 2, monthStart: newMonthStart, monthlyTasks: []});
    
        months.push(thisMonth, nextMonth);
        component.months = months;
        component.setMonthsStarts();
    });

    it ("should return month starts", () => {
        expect(component.monthStarts).toEqual([thisMonthStart, nextMonthStart]);
    });

    it ("should return true for new month start being unique", () => {
        let monthStartUnique = component.isMonthStartUnique(newMonthStart);
        expect(monthStartUnique).toBeTruthy();
    });

    it ("should return month starts with added new month start", () => {
        component.addMonthStart(newMonth);
        expect(component.monthStarts).toEqual([thisMonthStart, nextMonthStart, newMonthStart]);
    });

    it ("should return true for new month start being unique", () => {
        let monthStartUnique = component.isMonthStartUnique(newMonthStart);
        expect(monthStartUnique).toBeFalsy();
    });

    it ("should return this month start's index as 0", () => {
        component.shownMonthDate = thisMonthStart;
        let monthIndex = component.getMonthIndex();
        expect(monthIndex).toBe(0);
    });

    it ("should return next month start's index as 1", () => {
        component.shownMonthDate = nextMonthStart;
        let monthIndex = component.getMonthIndex();
        expect(monthIndex).toBe(1);
    });

    it ("should return this month start's index as 2", () => {
        component.shownMonthDate = newMonthStart;
        let monthIndex = component.getMonthIndex();
        expect(monthIndex).toBe(2);
    });
});