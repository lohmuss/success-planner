import { DateFunctions } from './date-functions';

import { DailyTask } from '../daily-tasks/shared/daily-task';
import { Habit, HabitWeek, HabitDay } from '../habits/shared/habit';

describe("DateFunctions", () => {
    let component = new DateFunctions();
    let todaysDate = component.getTodaysDate();
    let tomorrowsDate = component.getTomorrowsDate();

    let todaysTask1: DailyTask, todaysTask2: DailyTask, tomorrowsTask: DailyTask;
    let thisMonthsDate: Date, nextMonthsDate: Date = new Date();

    thisMonthsDate = component.getMonthStartDate();
    nextMonthsDate = new Date(nextMonthsDate.setDate(thisMonthsDate.getDate() + 31));

    let habit: Habit;
    let currentWeek: HabitWeek;
    let currentWeekStart: Date;

    beforeAll(() => {
        let id = 0;
        todaysTask1 = new DailyTask({id: id++, title: "Today's Task 1", date: todaysDate});
        todaysTask2 = new DailyTask({id: id++, title: "Today's Task 2", date: todaysDate});
        tomorrowsTask = new DailyTask({id: id++, title: "Tomorrow's task", date: tomorrowsDate});
    
        habit = new Habit({id: 0, title:"Habit", weeks: []});
        currentWeekStart = component.getWeekStartDate();
        currentWeek = new HabitWeek({weekStart: currentWeekStart});
        habit.weeks.push(currentWeek);
    });

    it("should return true for comparing two tasks with today's date", () => {
        let dailyTasksComparison = component.areTasksDatesEqual(todaysTask1.date, todaysTask2.date);
        expect(dailyTasksComparison).toBeTruthy();
    });

    it("should return false for comparing todays task's date with tomorrow's", () => {
        let dailyTasksComparison = component.areTasksDatesEqual(todaysTask1.date, tomorrowsTask.date);
        expect(dailyTasksComparison).toBeFalsy();
    });

    it("should return true for today's task being from this month", () => {
        let givenMonthComparison = component.isFromGivenMonth(thisMonthsDate, todaysTask1.date);
        expect(givenMonthComparison).toBeTruthy();
    });

    it("should return true for today's task being from next month", () => {
        let givenMonthComparison = component.isFromGivenMonth(nextMonthsDate, todaysTask1.date);
        expect(givenMonthComparison).toBeFalsy();
    });
    
    it("should return true for today's date being equal to habit week's today date and false to other week days", () => {
        let thisHabitWeekDays = habit.weeks[0].days;
        for (let day of thisHabitWeekDays) {
            let habitDayComparison = component.areHabitsDatesEqual(todaysDate, day.date)
            if (habitDayComparison) {
                expect(component.areHabitsDatesEqual(todaysDate, day.date)).toBeTruthy();
            } else {
                expect(component.areHabitsDatesEqual(todaysDate, day.date)).toBeFalsy();
            }
        }
    });

    it("should return false for next month's date being equal to habit week's day dates", () => {
        let thisHabitWeekDays = habit.weeks[0].days;
        for (let day of thisHabitWeekDays) {
            let habitDayComparison = component.areHabitsDatesEqual(nextMonthsDate, day.date)
            if (habitDayComparison) {
                expect(component.areHabitsDatesEqual(nextMonthsDate, day.date)).toBeTruthy();
            } else {
                expect(component.areHabitsDatesEqual(nextMonthsDate, day.date)).toBeFalsy();
            }
        }
    });
});