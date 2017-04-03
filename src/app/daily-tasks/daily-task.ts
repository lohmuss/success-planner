export class DailyTask {
    id: number;
    title: string;
    date: Date;
    complete: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}