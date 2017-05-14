import { HabitsDialogComponent } from './habits-dialog.component';

describe("HabitsDialogComponent", () => {
    let component = new HabitsDialogComponent(null, null, null);

    it ("should return true as string is empty", () => {
        const result = component.isEmptyOrJustSpaces("");
        expect(result).toBeTruthy();
    });

    it ("should return true as string is consisting of only spaces", () => {
        const result = component.isEmptyOrJustSpaces("  ");
        expect(result).toBeTruthy();
    });
});