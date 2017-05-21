import { MonthlyStatsHabitsItemComponent } from './monthly-stats-habits-item.component';

import { MonthlyTasksDataService } from '../shared/monthly-tasks-data.service';
import { SidenavTitleService } from '../../shared/sidenav-title.service';

import { Habit, HabitWeek } from '../../habits/shared/habit';
import { DateFunctions } from '../../shared/date-functions';

describe("MonthlyStatsHabitsItemComponent", () => {
    let component = new MonthlyStatsHabitsItemComponent(new MonthlyTasksDataService());
    let dateFunctions = new DateFunctions();

    let habit: Habit;
    let habitWeek1: HabitWeek, habitWeek2: HabitWeek;
    let currentWeekStart: Date, previousWeekStart: Date = new Date();

    beforeAll(() => {
        habit = new Habit ({id: 1, title: "Habit title", weeks: []});
                
        currentWeekStart = dateFunctions.getWeekStartDate();
        habitWeek1 = new HabitWeek({weekStart: currentWeekStart});
        //habitWeek1.days[0].completion = true;

        previousWeekStart.setDate(currentWeekStart.getDate()-7);
        habitWeek2 = new HabitWeek({weekStart: previousWeekStart});
    
        habit.weeks.push(habitWeek1, habitWeek2);
        component.habit = habit;
        component.shownMonthDate = currentWeekStart;
    });

    it ("should return monthly habit stats of all uncompleted habit", () => {
        component.getMonthlyHabitsStats();
        
        expect(component.completedHabitDays).toBe(0);
        expect(component.completedHabitDaysPerchentage).toBe(0);
    });

    it ("should return monthly habit stats of habit", () => {
        component.habit.weeks[0].days[0].completion = true;
        component.habit.weeks[0].days[3].completion = true;
        component.habit.weeks[0].days[5].completion = true;
        component.habit.weeks[1].days[1].completion = true;
        component.habit.weeks[1].days[2].completion = true;
        component.habit.weeks[1].days[4].completion = true;
        component.getMonthlyHabitsStats();
        
        expect(component.completedHabitDays).toBe(6);
        expect(component.completedHabitDaysPerchentage).toBe((6/component.shownMonthDaysCount)*100);
    });
});