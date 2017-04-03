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
var Subject_1 = require("rxjs/Subject");
var indexedDBStore = require("idb-keyval");
var DailyTasksDataService = (function () {
    function DailyTasksDataService() {
        this.dailyTasksSource = new Subject_1.Subject();
        this.taskTitleSource = new Subject_1.Subject();
        this.updateDailyTasks();
    }
    DailyTasksDataService.prototype.setDailyTasks = function (dailyTasks) {
        this.dailyTasks = dailyTasks;
        this.dailyTasksSource.next(dailyTasks);
    };
    DailyTasksDataService.prototype.getDailyTasks = function () {
        return this.dailyTasksSource.asObservable();
    };
    DailyTasksDataService.prototype.setEditableTaskTitle = function (taskTitle) {
        this.editableTaskTitle = taskTitle;
        this.taskTitleSource.next(taskTitle);
    };
    DailyTasksDataService.prototype.getEditableTitle = function () {
        return this.taskTitleSource.asObservable();
    };
    DailyTasksDataService.prototype.addDailyTask = function (dailyTask) {
        var _this = this;
        this.getNewTaskId().then(function (newTaskId) {
            dailyTask.id = newTaskId;
            indexedDBStore.set(dailyTask.id, dailyTask).then(function () {
                _this.updateDailyTasks();
            });
        });
    };
    DailyTasksDataService.prototype.getNewTaskId = function () {
        var lastTaskId;
        var newTaskId;
        return indexedDBStore.keys().then(function (taskIds) {
            if (taskIds.length > 0) {
                lastTaskId = taskIds[taskIds.length - 1];
                newTaskId = ++lastTaskId;
                console.log(newTaskId);
                return newTaskId;
            }
            return 0;
        });
    };
    DailyTasksDataService.prototype.changeDailyTaskCompletion = function (dailyTaskId) {
        var _this = this;
        indexedDBStore.get(dailyTaskId).then(function (dailyTask) {
            dailyTask.complete = !dailyTask.complete;
            indexedDBStore.set(dailyTaskId, dailyTask).then(function () {
                _this.updateDailyTasks();
            });
        });
    };
    DailyTasksDataService.prototype.removeDailyTask = function (dailyTaskId) {
        var _this = this;
        indexedDBStore.delete(dailyTaskId).then(function () {
            _this.updateDailyTasks();
        });
    };
    DailyTasksDataService.prototype.editDailyTask = function (dailyTaskId, updatedDailyTask) {
        var _this = this;
        indexedDBStore.set(dailyTaskId, updatedDailyTask).then(function () {
            _this.updateDailyTasks();
        });
        ;
    };
    DailyTasksDataService.prototype.getDailyTaskTitle = function (dailyTaskId) {
        var _this = this;
        indexedDBStore.get(dailyTaskId).then(function (dailyTask) {
            _this.setEditableTaskTitle(dailyTask.title);
        });
    };
    DailyTasksDataService.prototype.getDailyTaskIds = function () {
        return indexedDBStore.keys().then(function (dailyTaskIds) {
            return dailyTaskIds;
        });
    };
    DailyTasksDataService.prototype.updateDailyTasks = function () {
        var _this = this;
        var tasks = [];
        this.getDailyTaskIds().then(function (dailyTaskIds) {
            for (var _i = 0, dailyTaskIds_1 = dailyTaskIds; _i < dailyTaskIds_1.length; _i++) {
                var taskId = dailyTaskIds_1[_i];
                indexedDBStore.get(taskId).then(function (dailyTask) {
                    tasks.push(dailyTask);
                    _this.setDailyTasks(tasks);
                });
            }
        });
    };
    return DailyTasksDataService;
}());
DailyTasksDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], DailyTasksDataService);
exports.DailyTasksDataService = DailyTasksDataService;
//# sourceMappingURL=daily-tasks-data.service.js.map