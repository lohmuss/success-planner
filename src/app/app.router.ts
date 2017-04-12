import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DailyTasksListComponent } from './daily-tasks/daily-tasks-list/daily-tasks-list.component';
import { HabitsComponent } from './habits/habits.component';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/dailytasks', pathMatch: 'full' },
    { path: 'dailytasks', component: DailyTasksListComponent },
    { path: 'habits', component: HabitsComponent }
];

export const ROUTER = RouterModule.forRoot(APP_ROUTES);