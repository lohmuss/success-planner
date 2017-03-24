import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { DailyTasksDataService } from './app/daily-tasks/shared/daily-tasks-data.service'

platformBrowserDynamic().bootstrapModule(AppModule, [DailyTasksDataService]);
