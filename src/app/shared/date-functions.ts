export class DateFunctions {
    areTasksDatesEqual(firstDate: Date, secondDate: Date): boolean {
        if (firstDate.getFullYear() != secondDate.getFullYear()) {
            return false;
        }
        if (firstDate.getMonth() != secondDate.getMonth()) {
            return false;
        }
        if (firstDate.getDate() != secondDate.getDate()) {
            return false;
        }
        return true;
    }

    areHabitsDatesEqual(firstDate: Date, secondDate: Date): boolean {
        if (firstDate.getDate() === secondDate.getDate()) {
            return true;
        }
        return false;
    }

    getWeekStartDate(): Date {
        let today: Date = new Date();
        //if it's Sunday change day value to 7
        let day: number = today.getDay() || 7;
        let dayComparedToMonday: number = 1 - day;
        let weekStartDate: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayComparedToMonday);

        return weekStartDate;
    }
}