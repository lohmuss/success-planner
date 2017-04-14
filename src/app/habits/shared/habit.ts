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
    days: boolean[] = [];

    constructor(values: Object = {}) {
        this.addDays();
        Object.assign(this, values);
    }

    addDays() {
        let monday: boolean = false;
        let tuesday: boolean = false;
        let wednesday: boolean = false;
        let thursday: boolean = false;
        let friday: boolean = false;
        let sathurday: boolean = false;
        let sunday: boolean = false;
        this.days.push(monday, tuesday, wednesday, thursday, friday, sathurday, sunday);
    }
}