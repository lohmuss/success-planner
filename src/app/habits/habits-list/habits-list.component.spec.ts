import { HabitsListComponent } from './habits-list.component';

import { Habit, HabitWeek, HabitDay } from '../shared/habit';
import { DateFunctions } from '../../shared/date-functions';

import { HabitsDataService } from '../shared/habits-data.service';
import { SidenavTitleService } from '../../shared/sidenav-title.service';

describe("HabitsListComponent", () => {
    let component = new HabitsListComponent(new HabitsDataService(), new SidenavTitleService(), null);
    let dateFunctions = new DateFunctions();

    let thisWeekHabit1: Habit, thisWeekHabit2: Habit, nextWeekHabit: Habit;
    let habits: Habit[] = [];
    let currentWeek: HabitWeek, nextWeek: HabitWeek;
    let currentWeekStart: Date, nextWeekStart: Date = new Date();

    beforeAll(() => {
        thisWeekHabit1 = new Habit ({id: 1, title: "This Week Habit 1 title", weeks: []});
        thisWeekHabit2 = new Habit ({id: 2, title: "This Week Habit 2 title", weeks: []});
        nextWeekHabit = new Habit ({id: 3, title: "Next Week Habit title", weeks: []});
        habits.push(thisWeekHabit1, thisWeekHabit2, nextWeekHabit);
        component.habits = habits;

        currentWeekStart = dateFunctions.getWeekStartDate();
        currentWeek = new HabitWeek({weekStart: currentWeekStart});

        nextWeekStart.setDate(currentWeekStart.getDate()+7);
        nextWeek = new HabitWeek({weekStart: nextWeekStart});
    
        nextWeekHabit.weeks.push(nextWeek);
        thisWeekHabit1.weeks.push(currentWeek);
        thisWeekHabit2.weeks.push(currentWeek);
    });

    it ("should return two unique habit's week starts", () => {
        component.setHabitsWeekStarts();
        expect(component.weekStarts.length).toBe(2);
    });

    it ("should return two unique habit's week starts as sorted by date", () => {
        component.setHabitsWeekStarts();
        let weekStarts = component.weekStarts;
        for(let i = 0; i+1 < weekStarts.length; i++) {
            expect(weekStarts[i].getTime()).toBeLessThan(weekStarts[i+1].getTime());
        }
    });
});