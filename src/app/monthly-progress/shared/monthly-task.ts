export class MonthlyTask {
    id: number;
    title: string;
    complete: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class Month {
    id: number;
    monthStart: Date;
    monthlyTasks: MonthlyTask[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}