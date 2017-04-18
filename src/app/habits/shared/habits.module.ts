import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HabitsDialogComponent } from '../habits-dialog/habits-dialog.component';
import { HabitsListComponent } from '../habits-list/habits-list.component';
import { HabitsItemComponent } from '../habits-item/habits-item.component';
import { HabitsDataService } from '../shared/habits-data.service';

@NgModule({
    imports: 
    [
        CommonModule,
        FormsModule,
        MaterialModule,
        MdDialogModule,
        BrowserAnimationsModule
    ],
    exports: [],
    declarations: 
    [
        HabitsListComponent,
        HabitsItemComponent,
        HabitsDialogComponent
    ],
    providers:
    [
        HabitsDataService
    ],
    entryComponents: 
    [ 
        HabitsDialogComponent
    ]
})
export class HabitsModule { }
