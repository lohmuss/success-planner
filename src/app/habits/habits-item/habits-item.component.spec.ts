import { HabitsItemComponent } from '../habits-item/habits-item.component';

import { Habit, HabitWeek, HabitDay } from '../shared/habit';
import { DateFunctions } from '../../shared/date-functions';

import { HabitsDataService } from '../shared/habits-data.service';

describe("HabitsItemComponent", () => {
    let dateFunctions = new DateFunctions();
    let component = new HabitsItemComponent(new HabitsDataService(), null);

    let thisWeekHabit: Habit;
    let currentWeek: HabitWeek, previousWeek: HabitWeek;
    let currentWeekStart: Date, previousWeekStart: Date = new Date();

    beforeAll(() => {
        thisWeekHabit = new Habit ({id: 1, title: "This Week Habit title", weeks: []});

        currentWeekStart = dateFunctions.getWeekStartDate();
        currentWeek = new HabitWeek({weekStart: currentWeekStart});

        previousWeekStart.setDate(currentWeekStart.getDate()+7);
        previousWeek = new HabitWeek({weekStart: previousWeekStart});
    
        thisWeekHabit.weeks.push(currentWeek);
        thisWeekHabit.weeks.push(previousWeek);
        
        component.habit = thisWeekHabit;
    });

    it ("should return habit's current week by current week date", () => {
        component.getShownWeek(currentWeekStart);
        expect(component.shownWeek).toBe(currentWeek);
    });

    it ("should return habit's previous week by previous week date", () => {
        component.getShownWeek(previousWeekStart);
        expect(component.shownWeek).toBe(previousWeek);
    });
});
