import { HabitsDataService } from './habits-data.service';
import { Habit, HabitWeek, HabitDay } from './habit';
import { DateFunctions } from '../../shared/date-functions';

describe("HabitsDataService", () => {
    let dateFunctions = new DateFunctions();
    let service = new HabitsDataService();

    let thisWeekHabit1: Habit, thisWeekHabit2: Habit, nextWeekHabit: Habit;
    let habits: Habit[] = [];
    let currentWeek: HabitWeek, nextWeek: HabitWeek;
    let currentWeekStart: Date, nextWeekStart: Date = new Date();

    beforeAll(() => {
        thisWeekHabit1 = new Habit ({id: 1, title: "This Week Habit 1 title", weeks: []});
        thisWeekHabit2 = new Habit ({id: 2, title: "This Week Habit 2 title", weeks: []});
        nextWeekHabit = new Habit ({id: 3, title: "Next Week Habit title", weeks: []});
        habits.push(thisWeekHabit1, thisWeekHabit2, nextWeekHabit);
        service.habits = habits;

        currentWeekStart = dateFunctions.getWeekStartDate();
        currentWeek = new HabitWeek({weekStart: currentWeekStart});

        nextWeekStart.setDate(currentWeekStart.getDate()+7);
        nextWeek = new HabitWeek({weekStart: nextWeekStart});
    
        thisWeekHabit1.weeks.push(currentWeek);
        thisWeekHabit2.weeks.push(currentWeek);
        nextWeekHabit.weeks.push(nextWeek);
    });

    it ("should return true for habit containing current week", () => {
        expect(service.currentWeekExists(thisWeekHabit1.weeks)).toBeTruthy();
    });

    it ("should return false for habit not containing current week", () => {
        expect(service.currentWeekExists(nextWeekHabit.weeks)).toBeFalsy();
    });

    it ("should return habits containing current week", () => {
        let shownWeekHabits = service.getShownWeekHabits(currentWeekStart);
        
        for (let habit of shownWeekHabits) {
            for (let week of habit.weeks) {
                expect(dateFunctions.areHabitsDatesEqual(week.weekStart, currentWeekStart)).toBeTruthy();
            }
        }
    });

    it ("should return habits containing next week", () => {
        let shownWeekHabits = service.getShownWeekHabits(nextWeekStart);
        
        for (let habit of shownWeekHabits) {
            for (let week of habit.weeks) {
                expect(dateFunctions.areHabitsDatesEqual(week.weekStart, nextWeekStart)).toBeTruthy();
            }
        }
    });
});