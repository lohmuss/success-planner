import { browser, element, by } from 'protractor';

import { DateFunctions } from '../src/app/shared/date-functions';

describe("Habits page", () => {
    beforeAll(() => {
        browser.get('/habits');
    });

    it("should have a md-card with title of current week start date - current week end date", () => {
        let dateFunctions = new DateFunctions();
        let shownWeekDate: Date, shownWeekEndDate: Date = new Date();
        shownWeekDate = dateFunctions.getWeekStartDate();
        shownWeekEndDate.setDate(shownWeekDate.getDate() + 7);
        let shownWeekDateString = dateToFormatDDMMYYYY(shownWeekDate);
        let shownWeekEndDateString = dateToFormatDDMMYYYY(shownWeekEndDate);
        let expectedTitle = shownWeekDateString + " - " + shownWeekEndDateString;

        let title = element(by.css("habits-list md-card md-card-title")).getText();
        expect<any>(title).toEqual(expectedTitle);
    });

    it("should have a md-card with subtitle with previous button", () => {
        let button = element(by.css("habits-list md-card md-card-subtitle button:nth-child(1) span span")).getText();
        expect<any>(button).toEqual("Previous");
    });

    it("should have a md-card with subtitle with next button", () => {
        let button = element(by.css("habits-list md-card md-card-subtitle button:nth-child(2) span span")).getText();
        expect<any>(button).toEqual("Next");
    });

    it("should have a new habits button", () => {
        let button = element(by.css(".newHabitButton")).isDisplayed();
        expect<any>(button).toBeTruthy();
    });

    it("should show new habit dialog when clicked on new habit button", () => {
        element(by.css(".newHabitButton")).click();
        let dialogTitle = element(by.css("habits-dialog md-toolbar .mat-toolbar-row span")).getText();
        let dialogInputContainer = element(by.css("habits-dialog .mat-dialog-content")).isDisplayed();
        let addHabitButtonTitle = element(by.css("habits-dialog .mat-dialog-actions button span")).getText();
        
        expect<any>(dialogTitle).toEqual("Add Habit");
        expect<any>(dialogInputContainer).toBeTruthy();
        expect<any>(addHabitButtonTitle).toEqual("ADD");
    });
});

function dateToFormatDDMMYYYY(date: Date): string {
    let dateString;
    dateString = pad(date.getDate())+"/"+pad(date.getMonth()+1)+"/"+date.getFullYear();
    return dateString;
}

function pad(n) {
    return n < 10 ? "0"+n : n;
}