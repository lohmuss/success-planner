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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var daily_tasks_data_service_1 = require("../shared/daily-tasks-data.service");
var daily_task_1 = require("../daily-task");
var DailyTasksDialogComponent = (function () {
    function DailyTasksDialogComponent(_dailyTasksDataService, dialogRef, data) {
        this._dailyTasksDataService = _dailyTasksDataService;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DailyTasksDialogComponent.prototype.ngOnInit = function () {
        this.getEditableTaskTitle(this.data.taskId);
    };
    DailyTasksDialogComponent.prototype.addTask = function () {
        var newTask = new daily_task_1.DailyTask({ title: this.taskTitle, complete: false });
        this._dailyTasksDataService.addDailyTask(newTask);
        this.dialogRef.close();
    };
    DailyTasksDialogComponent.prototype.editTask = function (dailyTaskId) {
        var updatedTask = new daily_task_1.DailyTask({ id: dailyTaskId, title: this.taskTitle, complete: false });
        this._dailyTasksDataService.editDailyTask(dailyTaskId, updatedTask);
        this.dialogRef.close();
    };
    DailyTasksDialogComponent.prototype.removeTask = function (dailyTaskId) {
        this._dailyTasksDataService.removeDailyTask(dailyTaskId);
        this.dialogRef.close();
    };
    DailyTasksDialogComponent.prototype.getEditableTaskTitle = function (dailyTaskId) {
        var _this = this;
        if (!this.data.isNewTask) {
            this._dailyTasksDataService.getDailyTaskTitle(dailyTaskId);
            this._dailyTasksDataService.taskTitleSource.subscribe(function (taskTitle) {
                _this.taskTitle = taskTitle;
            });
        }
    };
    return DailyTasksDialogComponent;
}());
DailyTasksDialogComponent = __decorate([
    core_1.Component({
        selector: 'daily-tasks-new-task',
        templateUrl: './daily-tasks-dialog.component.html',
        styleUrls: ['./daily-tasks-dialog.component.css']
    }),
    __param(2, core_1.Inject(material_1.MD_DIALOG_DATA)),
    __metadata("design:paramtypes", [daily_tasks_data_service_1.DailyTasksDataService,
        material_1.MdDialogRef, Object])
], DailyTasksDialogComponent);
exports.DailyTasksDialogComponent = DailyTasksDialogComponent;
//# sourceMappingURL=daily-tasks-dialog.component.js.map