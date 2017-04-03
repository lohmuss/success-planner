"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var daily_tasks_data_service_1 = require("../shared/daily-tasks-data.service");
var daily_tasks_dialog_component_1 = require("../daily-tasks-dialog/daily-tasks-dialog.component");
var DailyTasksListComponent = (function () {
    function DailyTasksListComponent(_dailyTasksDataService, dialog) {
        this._dailyTasksDataService = _dailyTasksDataService;
        this.dialog = dialog;
        this.isNewTask = true;
        this.tasks = [];
    }
    DailyTasksListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._dailyTasksDataService.dailyTasksSource.subscribe(function (tasks) {
            _this.tasks = tasks;
        });
    };
    DailyTasksListComponent.prototype.openNewDailyTaskDialog = function () {
        var config = new material_1.MdDialogConfig();
        config.data = { "isNewTask": true };
        var dialogRef = this.dialog.open(daily_tasks_dialog_component_1.DailyTasksDialogComponent, config);
    };
    return DailyTasksListComponent;
}());
DailyTasksListComponent = __decorate([
    core_1.Component({
        selector: 'daily-tasks-list',
        templateUrl: './daily-tasks-list.component.html',
        styleUrls: ['./daily-tasks-list.component.css']
    }),
    __metadata("design:paramtypes", [daily_tasks_data_service_1.DailyTasksDataService, material_1.MdDialog])
], DailyTasksListComponent);
exports.DailyTasksListComponent = DailyTasksListComponent;
//# sourceMappingURL=daily-tasks-list.component.js.map