import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { DailyTask } from '../daily-task';

let idb = require("idb");

const dbPromise = idb.open('success-planner-store', 1, (upgradeDB: any) => {
    upgradeDB.createObjectStore('daily-tasks');
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
    dailyTasks: DailyTask[];
    editableTaskTitle: string;
    editableTaskDate: Date;

    dailyTasksSource: Subject<DailyTask[]> = new Subject<DailyTask[]>();
    taskTitleSource: Subject<string> = new Subject<string>(); 
    taskDateSource: Subject<Date> = new Subject<Date>(); 

    constructor() { 
        this.updateDailyTasks();
    }

    setDailyTasks(dailyTasks: DailyTask[]) {
        this.dailyTasks = dailyTasks;
        this.dailyTasksSource.next(dailyTasks);
    }
    
    getDailyTasks(): Observable<DailyTask[]> {
        return this.dailyTasksSource.asObservable();
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


    getDailyTaskIds(){
        return idbDailyTasks.keys().then((dailyTaskIds: number[]) => {
            return dailyTaskIds;
        });
    }

    updateDailyTasks() {
        /*
        let tasks: DailyTask[] = [];
        this.getDailyTaskIds().then((dailyTaskIds: number[]) => {
            for(let taskId of dailyTaskIds) {
                idbDailyTasks.get(taskId).then((dailyTask: DailyTask) => {
                    tasks.push(dailyTask);
                });
            }
            this.setDailyTasks(tasks);
        });
        */
        idbDailyTasks.getAll().then((dailyTasks: DailyTask[]) => {
            this.setDailyTasks(dailyTasks);
        });
    }
}

