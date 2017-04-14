export class DateFunctions {
    getWeekStartDate(): Date {
        let today: Date = new Date();
        let day: number = today.getDay();
        let dayComparedToMonday: number = 1 - day;
        let weekStartDate: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayComparedToMonday);

        return weekStartDate;
    }
}