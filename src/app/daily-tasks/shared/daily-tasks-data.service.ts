import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { DailyTask } from '../daily-task';

let indexedDBStore = require("idb-keyval");

@Injectable()
export class DailyTasksDataService {
    dailyTasks: DailyTask[];
    editableTaskTitle: string;

    dailyTasksSource: Subject<DailyTask[]> = new Subject<DailyTask[]>();
    taskTitleSource: Subject<string> = new Subject<string>(); 

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

    setEditableTaskTitle(taskTitle: string) {
        this.editableTaskTitle = taskTitle;
        this.taskTitleSource.next(taskTitle);
    }

    getEditableTitle(): Observable<string> {
        return this.taskTitleSource.asObservable();
    }

    addDailyTask(dailyTask: DailyTask) {
        this.getNewTaskId().then((newTaskId: number) => {
            dailyTask.id = newTaskId;
            indexedDBStore.set(dailyTask.id, dailyTask).then(() => {
                this.updateDailyTasks();
            });
        });
    }

    getNewTaskId(){
        let lastTaskId: number;
        let newTaskId: number;

        return indexedDBStore.keys().then((taskIds: number[]) => {
            if (taskIds.length > 0) {
                lastTaskId = taskIds[taskIds.length-1];
                newTaskId = ++lastTaskId;
                return newTaskId;
            }
            return 0;
        });
    }

    changeDailyTaskCompletion(dailyTaskId: number) {
        indexedDBStore.get(dailyTaskId).then((dailyTask: DailyTask) => {
            dailyTask.complete = !dailyTask.complete;
            indexedDBStore.set(dailyTaskId, dailyTask).then(() =>{
                this.updateDailyTasks();
            });
        });
    }

    removeDailyTask(dailyTaskId: number) {
        indexedDBStore.delete(dailyTaskId).then(() =>{
            this.updateDailyTasks();
        });
    }

    editDailyTask(dailyTaskId: number, updatedDailyTask: DailyTask) {
        indexedDBStore.get(dailyTaskId).then((dailyTask: DailyTask) => {
            updatedDailyTask.complete = dailyTask.complete;
            indexedDBStore.set(dailyTaskId, updatedDailyTask).then(() => {
                this.updateDailyTasks();
            });;
        });
    }

    getDailyTaskTitle(dailyTaskId: number) {
        indexedDBStore.get(dailyTaskId).then((dailyTask: DailyTask) => {
            this.setEditableTaskTitle(dailyTask.title);
        });
    }

    getDailyTaskIds(){
        return indexedDBStore.keys().then((dailyTaskIds: number[]) => {
            return dailyTaskIds;
        });
    }

    updateDailyTasks() {
        let tasks: DailyTask[] = [];
        this.getDailyTaskIds().then((dailyTaskIds: number[]) => {
            for(let taskId of dailyTaskIds) {
                indexedDBStore.get(taskId).then((dailyTask: DailyTask) => {
                    tasks.push(dailyTask);
                    this.setDailyTasks(tasks);
                });
            }
        });
    }
}

