import { browser, element, by } from 'protractor';

describe("Sidenav", () => {
    it("should have a title of 'Inbox' at url '/'", () => {
        browser.get('/');
        let title = element(by.css(".sidenav-title")).getText();
        expect<any>(title).toEqual("Inbox");
    });
+
    it("should have a title of 'Daily Tasks' at '/daily-tasks'", () => {
        browser.get('/daily-tasks');
        let title = element(by.css(".sidenav-title")).getText();
        expect<any>(title).toEqual("Daily Tasks");
    });

    it("should have a title of 'Habits' at '/habits'", () => {
        browser.get('/habits');
        let title = element(by.css(".sidenav-title")).getText();
        expect<any>(title).toEqual("Habits");
    });

    it("should have a title of 'Monthly Progress' at '/monthly-progress'", () => {
        browser.get('/monthly-progress');
        let title = element(by.css(".sidenav-title")).getText();
        expect<any>(title).toEqual("Monthly Progress");
    });

    it("should have a title of 'Info' at '/info'", () => {
        browser.get('/info');
        let title = element(by.css(".sidenav-title")).getText();
        expect<any>(title).toEqual("Info");
    });
});
