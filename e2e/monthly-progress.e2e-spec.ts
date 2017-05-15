import { browser, element, by } from 'protractor';

import { DateFunctions } from '../src/app/shared/date-functions';

describe("Monthly Progress page", () => {
    beforeAll(() => {
        browser.get('/monthly-progress');
    });

    it("should have a md-card with title of current month and year", () => {
        let dateFunctions = new DateFunctions();
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let shownMonthStartDate: Date = dateFunctions.getMonthStartDate();
        let expectedTitle = monthNames[shownMonthStartDate.getMonth()] + " " + shownMonthStartDate.getFullYear();
        
        let title = element(by.css("monthly-tasks-list md-card md-card-title")).getText();
        expect<any>(title).toEqual(expectedTitle);
    });

    it("should have a md-card with subtitle with previous button", () => {
        let button = element(by.css("monthly-tasks-list md-card md-card-subtitle button:nth-child(1) span span")).getText();
        expect<any>(button).toEqual("Previous");
    });

    it("should have a md-card with subtitle with next button", () => {
        let button = element(by.css("monthly-tasks-list md-card md-card-subtitle button:nth-child(2) span span")).getText();
        expect<any>(button).toEqual("Next");
    });

    it("should have a new habits button", () => {
        let button = element(by.css(".newMonthlyTaskButton")).isDisplayed();
        expect<any>(button).toBeTruthy();
    });

    it("should have a md-card with title 'Monthly Stats'", () => {
        let button = element(by.css("monthly-stats")).isDisplayed();
        expect<any>(button).toBeTruthy();
    });

    it("should show new habit dialog when clicked on new habit button", () => {
        element(by.css(".newMonthlyTaskButton")).click();
        let dialogTitle = element(by.css("monthly-tasks-dialog md-toolbar .mat-toolbar-row span")).getText();
        let dialogInputContainer = element(by.css("monthly-tasks-dialog .mat-dialog-content")).isDisplayed();
        let addHabitButtonTitle = element(by.css("monthly-tasks-dialog .mat-dialog-actions button span")).getText();
        
        expect<any>(dialogTitle).toEqual("Add Monthly Task");
        expect<any>(dialogInputContainer).toBeTruthy();
        expect<any>(addHabitButtonTitle).toEqual("ADD");
    });
});