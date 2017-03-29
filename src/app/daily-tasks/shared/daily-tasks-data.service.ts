import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { DailyTask } from '../daily-task';

let indexedDBStore = require("idb-keyval");

@Injectable()
export class DailyTasksDataService {
    dailyTasks: DailyTask[] = [];
    dailyTaskIds: number[];
    lastDailyTaskIds: number[];
    lastTaskId: number = 0;

    tasks: DailyTask[];
    subject: Subject<DailyTask[]> = new Subject<DailyTask[]>();

    constructor() { }

    addDailyTask(dailyTask: DailyTask) {
        dailyTask.id = ++this.lastTaskId;
        indexedDBStore.set(dailyTask.id, dailyTask).then(() => {
            this.getDailyTasks();
        });
    }

    changeDailyTaskCompletion(dailyTaskId: number) {
        let dailyTaskIndex = this.findDailyTaskIndexById(dailyTaskId);
        let completedDailyTask = this.dailyTasks[dailyTaskIndex];
        completedDailyTask.complete = !completedDailyTask.complete;
    }

    findDailyTaskIndexById(dailyTaskId: number) {
        let dailyTasksCount = this.getDailyTasksCount();
        for(let index = 0; index < dailyTasksCount; index++) {
            if (this.dailyTasks[index].id === dailyTaskId) {
                return index;
            }
        } 
    }

    removeDailyTask(dailyTaskId: number) {

        indexedDBStore.delete(dailyTaskId).then(() =>{
            this.getDailyTasks();
        });
    }

    editDailyTask(dailyTaskId: number, updatedDailyTask: DailyTask) {
        indexedDBStore.set(dailyTaskId, updatedDailyTask).then(() =>{
            this.getDailyTasks();
        });;
    }

    getDailyTaskTitle(dailyTaskId: number): string {
        let dailyTaskIndex = this.findDailyTaskIndexById(dailyTaskId);
        let dailyTaskTitle = this.dailyTasks[dailyTaskIndex].title;

        return dailyTaskTitle;
    }

    getDailyTasksCount(): number {
        return this.dailyTasks.length;
    }

    getTaskId() {
        let newTaskId: number;
        newTaskId = this.dailyTaskIds.length;
        return newTaskId;
    }

    getDailyTasksIds() {
        return indexedDBStore.keys().then((keys: number[]) => {
            this.dailyTaskIds = keys;
        });
    }

    getDailyTasks() {
        this.dailyTasks = [];
        this.getDailyTasksIds().then(() => {
            for(let id of this.dailyTaskIds) {
                indexedDBStore.get(id).then((task: DailyTask) => {
                    this.dailyTasks.push(task);
                    this.setTasks(this.dailyTasks);
                });
            }
        });
    }

    setTasks(tasks: DailyTask[]): void {
        this.tasks = tasks;
        this.subject.next(tasks);
    }

    getTasks(): Observable<DailyTask[]> {
        return this.subject.asObservable();
    }
}

