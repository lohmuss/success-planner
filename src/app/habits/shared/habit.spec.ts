import { Habit, HabitWeek, HabitDay } from './habit';
import { DateFunctions } from '../../shared/date-functions';

describe("Habit", () => {
    let dateFunctions = new DateFunctions();
    let habit: Habit;
    let currentWeek: HabitWeek;
    let currentWeekStart: Date;

    beforeAll(() => {
        habit = new Habit ({id: 1, title: "Habit title", weeks: []});
        currentWeekStart = dateFunctions.getWeekStartDate();
        currentWeek = new HabitWeek({weekStart: currentWeekStart});
        habit.weeks.push(currentWeek);
    });

    it ("should return habit id as 1", () => {
        let habitId = habit.id;
        expect(habitId).toBe(1);
    });

    it ("should return habit title as 'Habit title'", () => {
        let habitTitle = habit.title;
        expect(habitTitle).toBe("Habit title");
    });

    it ("should return habit week as current week", () => {
        let habitWeeks = habit.weeks;
        for (let week of habitWeeks) {
           expect(week).toBe(currentWeek);
        }
    });

    it ("should contain habitDays which dates are weekStart++", () => {
        let habitWeek = habit.weeks[0].days;
        let habitWeekStart = habit.weeks[0].weekStart;
        for (let day of habitWeek) {
           expect(dateFunctions.areHabitsDatesEqual(day.date, habitWeekStart)).toBeTruthy();
           habitWeekStart.setDate(habitWeekStart.getDate()+1);
        }
    });

    it ("should contain habitDays which completion is false when created", () => {
        let habitWeek = habit.weeks[0].days;
        for (let day of habitWeek) {
           expect(day.completion).toBeFalsy();
        }
    });
});