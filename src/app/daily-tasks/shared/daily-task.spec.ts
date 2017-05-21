import { DailyTask } from './daily-task';

describe("DailyTask", () => {
    let task: DailyTask;

    beforeEach(() => {
        let id: number = 1;
        let title: string = "Task title";
        let date: Date = new Date();
        let complete: boolean = false;

        this.task = new DailyTask({id: id, title: title, date: date, complete: complete});
    });

    it ("should return task id as 1", () => {
        let taskId = this.task.id;
        expect(taskId).toBe(1);
    });

    it ("should return task title as 'Task title'", () => {
        let taskTitle = this.task.title;
        expect(taskTitle).toBe("Task title");
    });

    it ("should return task date as today's date", () => {
        let taskDate = this.task.date.getTime();
        expect(taskDate).toBe(new Date().getTime());
    });

    it ("should return task completion as false", () => {
        let taskCompletion = this.task.complete;
        expect(taskCompletion).toBeFalsy();
    });
});