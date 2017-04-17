import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DailyTasksListComponent } from './daily-tasks/daily-tasks-list/daily-tasks-list.component';
import { HabitsListComponent } from './habits/habits-list/habits-list.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'dailytasks', component: DailyTasksListComponent },
    { path: 'habits', component: HabitsListComponent }
];

export const ROUTER = RouterModule.forRoot(APP_ROUTES);