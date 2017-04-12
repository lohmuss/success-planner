export class Habit {
    id: number;
    title: string;
    weeks: HabitWeek[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class HabitWeek {
    weekStart: Date;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    sathurday: boolean;
    sunday: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}