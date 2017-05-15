import { browser, element, by } from 'protractor';

describe("Daily Tasks page", () => {
    beforeAll(() => {
        browser.get('/daily-tasks');
    });

    it("should have a new daily task button", () => {
        let button = element(by.css(".newTaskButton")).isDisplayed();
        expect<any>(button).toBeTruthy();
    });

    it("should show new habit dialog when clicked on new habit button", () => {
        element(by.css(".newTaskButton")).click();
        let dialogTitle = element(by.css("daily-tasks-dialog md-toolbar .mat-toolbar-row span")).getText();
        let dialogInputContainer = element(by.css("daily-tasks-dialog .mat-dialog-content")).isDisplayed();
        let addTaskButtonTitle = element(by.css("daily-tasks-dialog .mat-dialog-actions button span")).getText();
        
        expect<any>(dialogTitle).toEqual("Add Daily Task");
        expect<any>(dialogInputContainer).toBeTruthy();
        expect<any>(addTaskButtonTitle).toEqual("ADD");
    });
});
