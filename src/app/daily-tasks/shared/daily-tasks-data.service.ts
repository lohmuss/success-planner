import { Injectable } from '@angular/core';
import { DailyTask } from '../daily-task';

@Injectable()
export class DailyTasksDataService {
    dailyTasks: DailyTask[] = [];
    lastTaskId: number = 0;

    constructor() { }

    addDailyTask(dailyTask: DailyTask) {
        dailyTask.id = this.getLastTaskId();
        this.dailyTasks.push(dailyTask);  
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
        let dailyTaskIndex = this.findDailyTaskIndexById(dailyTaskId);
        this.dailyTasks.splice(dailyTaskIndex, 1);
    }

    editDailyTask(dailyTaskId: number, updatedDailyTask: DailyTask) {
        let dailyTaskIndex = this.findDailyTaskIndexById(dailyTaskId);
        this.dailyTasks[dailyTaskIndex].title = updatedDailyTask.title;
    }

    getDailyTaskTitle(dailyTaskId: number): string {
        let dailyTaskIndex = this.findDailyTaskIndexById(dailyTaskId);
        let dailyTaskTitle = this.dailyTasks[dailyTaskIndex].title;

        return dailyTaskTitle;
    }

    getDailyTasksCount(): number {
        return this.dailyTasks.length;
    }

    getLastTaskId(): number {
        return ++this.lastTaskId;
    }

    getDailyTasks(): DailyTask[] {
        return this.dailyTasks;
    }
}