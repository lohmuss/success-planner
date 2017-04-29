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
    days: HabitDay[] = [];

    constructor(values: Object = {}) {
        this.addDays(values["weekStart"]);
        Object.assign(this, values);
    }

    addDays(weekStart: Date) {
        for (let days = 0; days < 7; days++) {
            let date: Date = new Date();
            date.setDate(weekStart.getDate() + days);
            let day: HabitDay = new HabitDay({"date": date, "completion": false});
            this.days.push(day);
        }
    }
}

export class HabitDay {
    date: Date;
    completion: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}