import { DailyTasksDialogComponent } from './daily-tasks-dialog.component';

describe("DailyTasksDialogComponent", () => {
    let component = new DailyTasksDialogComponent(null, null, null);

    it ("should return true as string is empty", () => {
        const result = component.isEmptyOrJustSpaces("");
        expect(result).toBeTruthy();
    });

    it ("should return true as string is consisting of only spaces", () => {
        const result = component.isEmptyOrJustSpaces("  ");
        expect(result).toBeTruthy();
    });
});