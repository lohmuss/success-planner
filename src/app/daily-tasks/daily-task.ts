export class DailyTask {
    id?: number;
    title: string;
    date: Date;
    complete: boolean;

    /*
    constructor(id: number, 
                title: string = "", 
                date: Date, 
                complete: boolean = false) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.complete = complete;
    }*/

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}