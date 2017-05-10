import { Component, OnInit } from '@angular/core';

import { PushNotificationComponent } from '../../shared/ng2-notifications';

@Component({
    template: ''
})
export class MonthlyNotificationComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    showNotification() {
        let notification = new PushNotificationComponent();
        notification.title = "It's a new month for success!";
        notification.body = "Don't forget to add monthly tasks!";
        notification.icon = "assets/icons/icon-144.png";
        notification.show();
    }
}