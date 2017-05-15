import { browser, element, by } from 'protractor';

describe("Inbox page", () => {
    beforeAll(() => {
        browser.get('/');
    });

    it("should have a md-card with title 'Daily Tasks'", () => {
        let title = element(by.css("inbox-daily-tasks-list md-card md-card-title")).getText();
        expect<any>(title).toEqual("Daily Tasks");
    });

    it("should have a md-card with title 'Daily Habits'", () => {
        let title = element(by.css("inbox-daily-habits-list md-card md-card-title")).getText();
        expect<any>(title).toEqual("Daily Habits");
    });
});
