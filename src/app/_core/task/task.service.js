"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var task_model_1 = require("./task.model");
var Observable_1 = require("rxjs/Observable");
var rebirth_storage_1 = require("rebirth-storage/dist/rebirth-storage");
var rebirth_http_1 = require("rebirth-http/rebirth-http");
var TaskService = (function (_super) {
    __extends(TaskService, _super);
    function TaskService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TaskService;
}(rebirth_http_1.RebirthHttp));
exports.TaskService = TaskService;
var OnlineTaskService = (function (_super) {
    __extends(OnlineTaskService, _super);
    function OnlineTaskService(http, rebirthHttpProvider) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.rebirthHttpProvider = rebirthHttpProvider;
        return _this;
    }
    OnlineTaskService.prototype.getTasks = function (pageIndex, pageSize, keyword) {
        if (pageIndex === void 0) { pageIndex = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        return null;
    };
    OnlineTaskService.prototype.getTaskByTitle = function (taskTitle) {
        return null;
    };
    OnlineTaskService.prototype.updateTask = function (taskUrl, task) {
        return null;
    };
    OnlineTaskService.prototype.deleteTask = function (taskUrl) {
        return null;
    };
    return OnlineTaskService;
}(TaskService));
__decorate([
    rebirth_storage_1.Cacheable({ pool: 'tasks' }),
    rebirth_http_1.GET('http://localhost:3000/api/task'),
    __param(0, rebirth_http_1.Query('pageIndex')),
    __param(1, rebirth_http_1.Query('pageSize')),
    __param(2, rebirth_http_1.Query('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Observable_1.Observable)
], OnlineTaskService.prototype, "getTasks", null);
__decorate([
    rebirth_http_1.GET('http://localhost:3000/api/task/:id'),
    __param(0, rebirth_http_1.Path('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Observable_1.Observable)
], OnlineTaskService.prototype, "getTaskByTitle", null);
__decorate([
    rebirth_http_1.POST('http://localhost:3000/api/task/:id'),
    __param(0, rebirth_http_1.Path('id')), __param(1, rebirth_http_1.Body),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, task_model_1.Task]),
    __metadata("design:returntype", Observable_1.Observable)
], OnlineTaskService.prototype, "updateTask", null);
__decorate([
    rebirth_http_1.DELETE('http://localhost:3000/api/task/:id'),
    __param(0, rebirth_http_1.Path('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Observable_1.Observable)
], OnlineTaskService.prototype, "deleteTask", null);
OnlineTaskService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, rebirth_http_1.RebirthHttpProvider])
], OnlineTaskService);
exports.OnlineTaskService = OnlineTaskService;
exports.TASK_SERVICE_PROVIDERS = [
    {
        provide: TaskService,
        // environment.deploy === 'github' ? GithubTaskService : OnlineTaskService
        useClass: OnlineTaskService
    }
];
//# sourceMappingURL=task.service.js.map