import { MonthlyTasksDialogComponent } from './monthly-tasks-dialog.component';

describe("MonthlyTasksDialogComponent", () => {
    let component = new MonthlyTasksDialogComponent(null, null, null);

    it ("should return true as string is empty", () => {
        const result = component.isEmptyOrJustSpaces("");
        expect(result).toBeTruthy();
    });

    it ("should return true as string is consisting of only spaces", () => {
        const result = component.isEmptyOrJustSpaces("  ");
        expect(result).toBeTruthy();
    });
});