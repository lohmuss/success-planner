import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { DailyTask } from './daily-task';
import { DateFunctions } from '../../shared/date-functions';

let idb = require("idb");

const dbPromise = idb.open('success-planner-store', 1, (upgradeDB: any) => {
    upgradeDB.createObjectStore('daily-tasks');
    upgradeDB.createObjectStore('habits');
    upgradeDB.createObjectStore('monthly-tasks');
});

const idbDailyTasks = {
    get(key: number) {
        return dbPromise.then((db: any) => {
            return db.transaction('daily-tasks')
            .objectStore('daily-tasks').get(key);
        });
    },
    getAll() {
        return dbPromise.then((db: any) => {
            return db.transaction('daily-tasks')
            .objectStore('daily-tasks').getAll();
        });
    },
    set(key: number, val: DailyTask) {
        return dbPromise.then((db: any) => {
            const tx = db.transaction('daily-tasks', 'readwrite');
            tx.objectStore('daily-tasks').put(val, key);
            return tx.complete;
        });
    },
    delete(key: number) {
        return dbPromise.then((db: any) => {
            const tx = db.transaction('daily-tasks', 'readwrite');
            tx.objectStore('daily-tasks').delete(key);
            return tx.complete;
        });
    },
    keys() {
        return dbPromise.then((db: any) => {
            const tx = db.transaction('daily-tasks');
            const keys: number[] = [];
            const store = tx.objectStore('daily-tasks');
 
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
export class DailyTasksDataService {
    dateFunctions = new DateFunctions();
    
    overdueTasks: DailyTask[] = [];
    todaysTasks: DailyTask[] = [];
    tomorrowsTasks: DailyTask[] = [];
    laterTasks: DailyTask[] = [];
    withoutDateTasks: DailyTask[] = [];
    sortedDailyTasks: DailyTask[][] = [];

    editableTaskTitle: string;
    editableTaskDate: Date;

    sortedDailyTasksSource: Subject<DailyTask[][]> = new Subject<DailyTask[][]>();
    taskTitleSource: Subject<string> = new Subject<string>(); 
    taskDateSource: Subject<Date> = new Subject<Date>();

    constructor() { 
        this.updateDailyTasks();
    }

    setSortedDailyTasks(sortedDailyTasks: DailyTask[][]) {
        this.sortedDailyTasks = sortedDailyTasks;
        this.sortedDailyTasksSource.next(sortedDailyTasks);
    }
    
    getSortedDailyTasks(): Observable<DailyTask[][]> {
        return this.sortedDailyTasksSource.asObservable();
    }

    getEditableTitle(): Observable<string> {
        return this.taskTitleSource.asObservable();
    }

    setEditableTaskTitle(taskTitle: string) {
        this.editableTaskTitle = taskTitle;
        this.taskTitleSource.next(taskTitle);
    }

    getEditableDate(): Observable<Date> {
        return this.taskDateSource.asObservable();
    }

    setEditableTaskDate(taskDate: Date) {
        this.editableTaskDate = taskDate;
        this.taskDateSource.next(taskDate);
    }

    addDailyTask(dailyTask: DailyTask) {
        this.getNewTaskId().then((newTaskId: number) => {
            dailyTask.id = newTaskId;
            idbDailyTasks.set(dailyTask.id, dailyTask).then(() => {
                this. updateDailyTasks();
            });
        });
    }

    getNewTaskId(){
        let lastTaskId: number;
        let newTaskId: number;

        return idbDailyTasks.keys().then((taskIds: number[]) => {
            if (taskIds.length > 0) {
                lastTaskId = taskIds[taskIds.length-1];
                newTaskId = ++lastTaskId;
                return newTaskId;
            }
            return 0;
        });
    }

    changeDailyTaskCompletion(dailyTaskId: number) {
        idbDailyTasks.get(dailyTaskId).then((dailyTask: DailyTask) => {
            dailyTask.complete = !dailyTask.complete;
            idbDailyTasks.set(dailyTaskId, dailyTask).then(() =>{
                this.updateDailyTasks();
            });
        });
    }

    removeDailyTask(dailyTaskId: number) {
        idbDailyTasks.delete(dailyTaskId).then(() => {
            this.updateDailyTasks();
        });
    }

    editDailyTask(dailyTaskId: number, updatedDailyTask: DailyTask) {
        idbDailyTasks.get(dailyTaskId).then((dailyTask: DailyTask) => {
            updatedDailyTask.complete = dailyTask.complete;
            idbDailyTasks.set(dailyTaskId, updatedDailyTask).then(() => {
                this.updateDailyTasks();
            });;
        });
    }

    getDailyTaskTitle(dailyTaskId: number) {
        idbDailyTasks.get(dailyTaskId).then((dailyTask: DailyTask) => {
            this.setEditableTaskTitle(dailyTask.title);
        });
    }

    getDailyTaskDate(dailyTaskId: number) {
        idbDailyTasks.get(dailyTaskId).then((dailyTask: DailyTask) => {
            this.setEditableTaskDate(dailyTask.date);
        });
    }


    getDailyTaskIds() {
        return idbDailyTasks.keys().then((dailyTaskIds: number[]) => {
            return dailyTaskIds;
        });
    }

    isTaskDateValid(task: DailyTask): boolean {
        let taskDate = this.getTaskDate(task);

        if (taskDate == undefined || isNaN(taskDate.getTime())) {
            return false;
        }
        return true;
    }

    getTaskDate(task: DailyTask): Date {
        let taskDate = new Date(task.date);
        return taskDate;
    }
    
    isTaskOverdue(taskDate: Date): boolean {
        let todaysDate = new Date();

        if (taskDate.getTime() < todaysDate.getTime()) {
            if (!this.dateFunctions.areTasksDatesEqual(todaysDate, taskDate)) {
                return true;
            }
        }
        return false;
    }

    sortTasks(dailyTasks: DailyTask[]) {
        let sortedTasks: DailyTask[][] = [];
        let todaysDate = this.dateFunctions.getTodaysDate();
        let tomorrowsDate = this.dateFunctions.getTomorrowsDate();
        this.emptySortedTasks();

        for (let task of dailyTasks) {

            if (this.isTaskDateValid(task)) {
                this.sortTaskByDate(task, todaysDate, tomorrowsDate);
            } else {
                this.withoutDateTasks.push(task);
            }
        }
    }

    sortTaskByDate(task: DailyTask, todaysDate: Date, tomorrowsDate: Date) {
        let taskDate = new Date(task.date);

        if (this.isTaskOverdue(taskDate)) {
            this.overdueTasks.push(task);
        } else if (this.dateFunctions.areTasksDatesEqual(taskDate, todaysDate)) {
            this.todaysTasks.push(task);
        } else if (this.dateFunctions.areTasksDatesEqual(taskDate, tomorrowsDate)) {
            this.tomorrowsTasks.push(task);
        } else {
            this.laterTasks.push(task);
        }
    }

    addSortedTasks(dailyTasks: DailyTask[]) {
        this.sortTasks(dailyTasks);

        this.sortedDailyTasks["overdueTasks"] = this.overdueTasks;
        this.sortedDailyTasks["todaysTasks"] = this.todaysTasks;
        this.sortedDailyTasks["tomorrowsTasks"] = this.tomorrowsTasks;
        this.sortedDailyTasks["laterTasks"] = this.laterTasks;
        this.sortedDailyTasks["withoutDateTasks"] = this.withoutDateTasks;

        return this.sortedDailyTasks;
    }

    emptySortedTasks() {
        this.overdueTasks = [];
        this.todaysTasks = [];
        this.tomorrowsTasks = [];
        this.laterTasks = [];
        this.withoutDateTasks = [];
    }

    updateDailyTasks() {
        idbDailyTasks.getAll().then((dailyTasks: DailyTask[]) => {
            this.addSortedTasks(dailyTasks);
            this.setSortedDailyTasks(this.sortedDailyTasks);
        });
    }
}