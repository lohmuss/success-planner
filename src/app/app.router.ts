import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DailyTasksListComponent } from './daily-tasks/daily-tasks-list/daily-tasks-list.component';
import { HabitsListComponent } from './habits/habits-list/habits-list.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/dailytasks', pathMatch: 'full' },
    { path: 'dailytasks', component: DailyTasksListComponent },
    { path: 'habits', component: HabitsListComponent }
];

export const ROUTER = RouterModule.forRoot(APP_ROUTES);