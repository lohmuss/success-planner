import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { MonthlyTask, Month } from './monthly-task';
import { DateFunctions } from '../../shared/date-functions';

let idb = require("idb");

const dbPromise = idb.open('success-planner-store', 1, (upgradeDB: any) => {
    upgradeDB.createObjectStore('daily-tasks');
    upgradeDB.createObjectStore('habits');
    upgradeDB.createObjectStore('monthly-tasks');
});

const idbMonthlyTasks = {
    get(key: number) {
        return dbPromise.then((db: any) => {
            return db.transaction('monthly-tasks')
            .objectStore('monthly-tasks').get(key);
        });
    },
    getAll() {
        return dbPromise.then((db: any) => {
            return db.transaction('monthly-tasks')
            .objectStore('monthly-tasks').getAll();
        });
    },
    set(key: number, val: Month) {
        return dbPromise.then((db: any) => {
            const tx = db.transaction('monthly-tasks', 'readwrite');
            tx.objectStore('monthly-tasks').put(val, key);
            return tx.complete;
        });
    },
    delete(key: number) {
        return dbPromise.then((db: any) => {
            const tx = db.transaction('monthly-tasks', 'readwrite');
            tx.objectStore('monthly-tasks').delete(key);
            return tx.complete;
        });
    },
    keys() {
        return dbPromise.then((db: any) => {
            const tx = db.transaction('monthly-tasks');
            const keys: number[] = [];
            const store = tx.objectStore('monthly-tasks');
 
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
export class MonthlyTasksDataService {
    dateFunctions = new DateFunctions();

    months: Month[];
    monthlyTasks: MonthlyTask[];
    editableMonthlyTaskTitle: string;

    monthsSource: Subject<Month[]> = new Subject<Month[]>();
    monthlyTasksSource: Subject<MonthlyTask[]> = new Subject<MonthlyTask[]>();
    editableMonthlyTaskTitleSource: Subject<string> = new Subject<string>();

    constructor() {}

    setMonths(months: Month[]) {
        this.months = months;
        this.monthsSource.next(months);
    }
    
    getMonths(): Observable<Month[]> {
        return this.monthsSource.asObservable();
    }

    setMonthlyTasks(monthlyTasks: MonthlyTask[]) {
        this.monthlyTasks = monthlyTasks;
        this.monthlyTasksSource.next(monthlyTasks);
    }
    
    getMonthlyTasks(): Observable<MonthlyTask[]> {
        return this.monthlyTasksSource.asObservable();
    }

    setEditableMonthlyTaskTitle(title: string) {
        this.editableMonthlyTaskTitle = title;
        this.editableMonthlyTaskTitleSource.next(title);
    }
    
    getEditableMonthlyTaskTitle(): Observable<string> {
        return this.editableMonthlyTaskTitleSource.asObservable();
    }

    addMonth(month: Month) {
        this.getNewMonthId().then((newMonthId: number) => {
            month.id = newMonthId;
            month.monthlyTasks = [];
            month.monthStart = this.dateFunctions.getMonthStartDate();
            
            idbMonthlyTasks.set(month.id, month).then(() => {
                this.updateMonths();
            });
        });
    }

    getNewMonthId(){
        let lastMonthId: number;
        let newMonthId: number;

        return idbMonthlyTasks.keys().then((monthIds: number[]) => {
            if (monthIds.length > 0) {
                lastMonthId = monthIds[monthIds.length-1];
                newMonthId = ++lastMonthId;
                return newMonthId;
            }
            return 0;
        });
    }

    addMonthlyTask(monthId: number, monthlyTask: MonthlyTask) {
        idbMonthlyTasks.get(monthId).then((month: Month) => {
            let updatedMonth: Month = month;
            
            this.getNewMonthlyTaskId(monthId).then((newTaskId: number) => {
                monthlyTask.id = newTaskId;
                monthlyTask.complete = false;
                updatedMonth.monthlyTasks.push(monthlyTask);
                
                idbMonthlyTasks.set(monthId, updatedMonth).then(() => {
                    this.updateMonths();
                });;
            });
        });
    }

    removeMonthlyTask(monthId: number, taskId: number) {
        idbMonthlyTasks.get(monthId).then((month: Month) => {
            let taskKey = this.getMonthlyTaskArrayKey(month.monthlyTasks, taskId);
            month.monthlyTasks.splice(taskKey, 1);
            
            idbMonthlyTasks.set(monthId, month).then(() => {
                this.updateMonths();
            });;
        });
    }

    editMonthlyTask(monthId: number, updatedMontlyTask: MonthlyTask) {
        idbMonthlyTasks.get(monthId).then((month: Month) => {
            let taskId = updatedMontlyTask.id;
            let taskKey = this.getMonthlyTaskArrayKey(month.monthlyTasks, taskId);
            updatedMontlyTask.complete = month.monthlyTasks[taskKey].complete;
            month.monthlyTasks[taskKey] = updatedMontlyTask;
            
            idbMonthlyTasks.set(monthId, month).then(() => {
                this.updateMonths();
            });;
        });
    }

    getNewMonthlyTaskId(monthId: number) {
        let lastMonthlyTaskId: number;
        let newMonthlyTaskId: number = 0;

        return idbMonthlyTasks.get(monthId).then((month: Month) => {
            let monthlyTasks: MonthlyTask[] = month.monthlyTasks;
            if (monthlyTasks.length > 0) {
                lastMonthlyTaskId = monthlyTasks[monthlyTasks.length-1].id;
                newMonthlyTaskId = ++lastMonthlyTaskId;
            }
            return newMonthlyTaskId;
        });
    }

    changeMonthlyTaskCompletion(monthId: number, taskId: number) {
        idbMonthlyTasks.get(monthId).then((month: Month) => {
            let taskKey = this.getMonthlyTaskArrayKey(month.monthlyTasks, taskId);
            month.monthlyTasks[taskKey].complete = !month.monthlyTasks[taskKey].complete;
            
            idbMonthlyTasks.set(monthId, month).then(() => {
                this.updateMonths();
            });;
        });
    }

    getMonthlyTaskArrayKey(tasks: MonthlyTask[], taskId: number) {
        let arrayKey = 0;
        for (let task of tasks) {
            if (task.id === taskId) {
                return arrayKey;
            }
            arrayKey++;
        }
    }

    getMonthlyTaskTitle(monthId: number, monthlyTaskId: number) {
        idbMonthlyTasks.get(monthId).then((month: Month) => {
            let monthlyTask: MonthlyTask = this.getMonthlyTask(month.monthlyTasks, monthlyTaskId);
            this.setEditableMonthlyTaskTitle(monthlyTask.title);
        });
    }

    getMonthlyTask(monthlyTasks: MonthlyTask[], monthlyTaskId: number) {
        for (let task of monthlyTasks) {
            if (task.id === monthlyTaskId) {
                return task;
            }
        }
    }

    addMissingMonth(months: Month[]) {
        let currentMonthStart: Date = this.dateFunctions.getMonthStartDate();
        let currentMonth: Month = new Month({monthStart: currentMonthStart, monthlyTasks: []});

        if (!months) {
            this.addMonth(currentMonth);
        } else {
            if (!this.currentMonthExists(this.months)) {
                this.addMonth(currentMonth);
            }
        }
    }

    currentMonthExists(months: Month[]) {
        let currentMonthStartDate = this.dateFunctions.getMonthStartDate();
        for (let month of months) {
            if (this.dateFunctions.areTasksDatesEqual(currentMonthStartDate, month.monthStart)) {
                return true;
            }
        }
        return false;
    }

    getShownMonth(shownMonthStart: Date): Month {
        for (let month of this.months) {
            if (this.dateFunctions.areTasksDatesEqual(shownMonthStart, month.monthStart)) {
                return month;
            }
        }
    }
    
    getShownMonthTasks(shownMonthStart: Date): MonthlyTask[] {
        let shownMonthTasks: MonthlyTask[] = [];
        for (let month of this.months) {
            if (this.dateFunctions.areTasksDatesEqual(shownMonthStart, month.monthStart)) {
                if (month.monthlyTasks) {
                    for (let task of month.monthlyTasks) {
                        shownMonthTasks.push(task);
                    }
                }
            }
        }
        return shownMonthTasks;
    }

    updateMonths() {
        idbMonthlyTasks.getAll().then((months: Month[]) => {
            this.setMonths(months);
        });
    }
}