import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Habit, HabitWeek } from './habit';
import { DateFunctions } from '../../shared/date-functions';

let idb = require("idb");

const dbPromise = idb.open('success-planner-store', 1, (upgradeDB: any) => {
    upgradeDB.createObjectStore('daily-tasks');
    upgradeDB.createObjectStore('habits');
});

const idbHabits = {
    get(key: number) {
        return dbPromise.then((db: any) => {
            return db.transaction('habits')
            .objectStore('habits').get(key);
        });
    },
    getAll() {
        return dbPromise.then((db: any) => {
            return db.transaction('habits')
            .objectStore('habits').getAll();
        });
    },
    set(key: number, val: Habit) {
        return dbPromise.then((db: any) => {
            const tx = db.transaction('habits', 'readwrite');
            tx.objectStore('habits').put(val, key);
            return tx.complete;
        });
    },
    delete(key: number) {
        return dbPromise.then((db: any) => {
            const tx = db.transaction('habits', 'readwrite');
            tx.objectStore('habits').delete(key);
            return tx.complete;
        });
    },
    keys() {
        return dbPromise.then((db: any) => {
            const tx = db.transaction('habits');
            const keys: number[] = [];
            const store = tx.objectStore('habits');
 
            (store.iterateKeyCursor || store.iterateCursor).call(store, (cursor: any) => {
            if (!cursor) return;
            keys.push(cursor.key);
            cursor.continue();
        });
        return tx.complete.then(() => keys);
    });
    }
};

@Injectable()
export class HabitsDataService {
    dateFunctions = new DateFunctions();

    habits: Habit[];
    editableHabitTitle: string;
    editableHabitWeeks: HabitWeek[];

    habitsSource: Subject<Habit[]> = new Subject<Habit[]>();
    editableHabitTitleSource: Subject<string> = new Subject<string>();
    editableHabitWeeksSource: Subject<HabitWeek[]> = new Subject<HabitWeek[]>();

    constructor() {}

    setHabits(habits: Habit[]) {
        this.habits = habits;
        this.habitsSource.next(habits);
    }
    
    getHabits(): Observable<Habit[]> {
        return this.habitsSource.asObservable();
    }

    setEditableHabitTitle(title: string) {
        this.editableHabitTitle = title;
        this.editableHabitTitleSource.next(title);
    }
    
    getEditableHabitTitle(): Observable<string> {
        return this.editableHabitTitleSource.asObservable();
    }

    setEditableHabitWeeks(habitWeeks: HabitWeek[]) {
        this.editableHabitWeeks = habitWeeks;
        this.editableHabitWeeksSource.next(habitWeeks);
    }
    
    getEditableHabitWeeks(): Observable<HabitWeek[]> {
        return this.editableHabitWeeksSource.asObservable();
    }

    addHabit(habit: Habit) {
        this.getNewHabitId().then((newHabitId: number) => {
            habit.id = newHabitId;
            idbHabits.set(habit.id, habit).then(() => {
                this.updateHabits();
            });
        });
    }

    getNewHabitId(){
        let lastHabitId: number;
        let newHabitId: number;

        return idbHabits.keys().then((habitIds: number[]) => {
            if (habitIds.length > 0) {
                lastHabitId = habitIds[habitIds.length-1];
                newHabitId = ++lastHabitId;
                return newHabitId;
            }
            return 0;
        });
    }

    removeHabit(habitId: number) {
        idbHabits.delete(habitId).then(() => {
            this.updateHabits();
        });
    }

    editHabit(habitId: number, updatedHabit: Habit) {
        idbHabits.get(habitId).then((habit: Habit) => {
            idbHabits.set(habitId, updatedHabit).then(() => {
                this.updateHabits();
            });;
        });
    }

    addHabitWeek(habitId: number, week: HabitWeek) {
        idbHabits.get(habitId).then((habit: Habit) => {
            let updatedHabit: Habit = habit;
            updatedHabit.weeks.push(week);
            idbHabits.set(habitId, updatedHabit).then(() => {
                this.updateHabits();
            });;
        });
    }

    changeHabitCompletion(habitId: number, dayId: number, shownWeek: HabitWeek) {
        idbHabits.get(habitId).then((habit: Habit) => {
            let changableWeekId = this.getShownHabitWeekId(habit, shownWeek);
            habit.weeks[changableWeekId].days[dayId] = !habit.weeks[changableWeekId].days[dayId];
            idbHabits.set(habitId, habit).then(() => {
                this.updateHabits();
            });;
        });
    }

    getShownHabitWeekId(habit: Habit, shownWeek: HabitWeek): number {
        for (let week of habit.weeks) {
            if (this.dateFunctions.areHabitsDatesEqual(week.weekStart, shownWeek.weekStart)) {
                return habit.weeks.indexOf(week);
            }
        }
    }

    getHabitTitle(habitId: number) {
        idbHabits.get(habitId).then((habit: Habit) => {
            this.setEditableHabitTitle(habit.title);
        });
    }

    getHabitWeeks(habitId: number) {
        idbHabits.get(habitId).then((habit: Habit) => {
            this.setEditableHabitWeeks(habit.weeks);
        });
    }

    addMissingWeeks() {
        for (let habit of this.habits) {
            if (!this.currentWeekExists(habit.weeks)) {
                let currentWeekStart: Date = this.dateFunctions.getWeekStartDate();
                let currentWeek: HabitWeek = new HabitWeek({weekStart: currentWeekStart});
                this.addHabitWeek(habit.id, currentWeek);
            }
        } 
    }

    currentWeekExists(habitWeeks: HabitWeek[]) {
        let currentWeek = this.dateFunctions.getWeekStartDate();
        for (let habitWeek of habitWeeks) {
            if (this.dateFunctions.areHabitsDatesEqual(currentWeek, habitWeek.weekStart)) {
                return true
            }
        }
        return false;
    }
    
    getShownWeekHabits(shownWeek: Date): Habit[] {
        let shownWeekHabits: Habit[] = [];
        for (let habit of this.habits) {
            for (let week of habit.weeks) {
                if (this.dateFunctions.areHabitsDatesEqual(shownWeek, week.weekStart)) {
                    shownWeekHabits.push(habit);
                }
            }
        }
        return shownWeekHabits;
    }

    updateHabits() {
        idbHabits.getAll().then((habits: Habit[]) => {
            this.setHabits(habits);
        });
    }
}