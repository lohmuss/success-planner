import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InboxComponent } from './inbox/inbox.component';
import { DailyTasksListComponent } from './daily-tasks/daily-tasks-list/daily-tasks-list.component';
import { MonthlyProgressComponent } from './monthly-progress/monthly-progress.component';
import { HabitsListComponent } from './habits/habits-list/habits-list.component';
import { InfoComponent } from './info/info.component';

const APP_ROUTES: Routes = [
    { path: '', component: InboxComponent },
    { path: 'daily-tasks', component: DailyTasksListComponent },
    { path: 'monthly-progress', component: MonthlyProgressComponent },
    { path: 'habits', component: HabitsListComponent },
    { path: 'info', component: InfoComponent }
];

export const ROUTER = RouterModule.forRoot(APP_ROUTES);