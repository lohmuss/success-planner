import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { MonthlyTask, Month } from '../shared/monthly-task';
import { DateFunctions } from '../../shared/date-functions';

import { MonthlyTasksDialogComponent } from '../monthly-tasks-dialog/monthly-tasks-dialog.component'
import { MonthlyTasksDataService } from '../shared/monthly-tasks-data.service';
import { SidenavTitleService } from '../../shared/sidenav-title.service';

@Component({
    selector: 'monthly-tasks-list',
    templateUrl: './monthly-tasks-list.component.html',
    styleUrls: ['./monthly-tasks-list.component.css']
})
export class MonthlyTasksListComponent implements OnInit {
    dateFunctions = new DateFunctions();
    months: Month[] = [];
    monthStarts: Date[] = [];
    shownMonthlyTasks: MonthlyTask[] = [];
    shownMonthDate: Date;
    shownMonth: Month;
    previousMonthDate: Date;
    nextMonthDate: Date;

    constructor(private _monthlyTasksDataService: MonthlyTasksDataService, 
                private _sidenavTitleService: SidenavTitleService,
                public dialog: MdDialog) {
        this._sidenavTitleService.setTitle("Monthly Progress");
        this.shownMonthDate = this.dateFunctions.getMonthStartDate();
        this._monthlyTasksDataService.updateMonths();
    }

    ngOnInit() {
        this._monthlyTasksDataService.monthsSource.subscribe((months: Month[]) => {
            this.months = months;
            this.setMonthsStarts();
            this._monthlyTasksDataService.addMissingMonth(months);
            this.updateShownTasksAndDates();
        });
        this._monthlyTasksDataService.monthlyTasksSource.subscribe((monthlyTasks: MonthlyTask[]) => {
            this.shownMonthlyTasks = monthlyTasks;
        });
    }

    openNewMonthlyTaskDialog() {
        let config = new MdDialogConfig();
        config.data = {"isNewTask": true, "monthId": this.shownMonth.id};

        let dialogRef = this.dialog.open(MonthlyTasksDialogComponent, config); 
    }

    setMonthsStarts() {
        for (let month of this.months) {
            this.addMonthStart(month);
        }
        this.sortMonthStarts();
    }

    addMonthStart(month: Month) {
        let monthStart: Date = month.monthStart;
        if (this.isMonthStartUnique(monthStart)) {
            this.monthStarts.push(monthStart);
        }
    }

    sortMonthStarts() {
        this.monthStarts.sort(function(firstDate, secondDate) {
            if (firstDate>secondDate) return 1;
            else if (firstDate<secondDate) return -1;
            else return 0;
        });
    }

    isMonthStartUnique(monthStart: Date): boolean {
        for (let start of this.monthStarts) {
            if (this.dateFunctions.areTasksDatesEqual(monthStart, start)) {
                return false;
            }
        }
        return true;
    }

    changeToPreviousMonth() {
        this.shownMonthDate = this.previousMonthDate;
        this.updateShownTasksAndDates();
    }

    changeToNextMonth() {
        this.shownMonthDate = this.nextMonthDate;
        this.updateShownTasksAndDates();
    }

    updateShownTasksAndDates() {
        this.shownMonth = this._monthlyTasksDataService.getShownMonth(this.shownMonthDate);
        this.shownMonthlyTasks = this._monthlyTasksDataService.getShownMonthTasks(this.shownMonthDate);
        this.setPreviousMonthDate();
        this.setNextMonthDate();
    }

    setPreviousMonthDate() {
        let shownMonthIndex = this.getMonthIndex();
        shownMonthIndex--;
        let previousMonthDate = this.monthStarts[shownMonthIndex];
        this.previousMonthDate = previousMonthDate;
    }

    setNextMonthDate() {
        let shownMonthIndex = this.getMonthIndex();
        shownMonthIndex++;
        let nextMonthDate = this.monthStarts[shownMonthIndex];
        this.nextMonthDate = nextMonthDate;
    }

    getMonthIndex(): number {
        let index = 0;
        for (let monthStart of this.monthStarts) {
            if (this.dateFunctions.areTasksDatesEqual(monthStart, this.shownMonthDate)) {
                return index;
            }
            index++;
        }
        return index;
    }
}