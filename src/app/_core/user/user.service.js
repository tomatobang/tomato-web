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
var user_model_1 = require("./user.model");
var Observable_1 = require("rxjs/Observable");
var rebirth_storage_1 = require("rebirth-storage");
var rebirth_http_1 = require("rebirth-http");
var UserService = (function (_super) {
    __extends(UserService, _super);
    function UserService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserService;
}(rebirth_http_1.RebirthHttp));
exports.UserService = UserService;
var OnlineUserService = (function (_super) {
    __extends(OnlineUserService, _super);
    function OnlineUserService(http, rebirthHttpProvider) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.rebirthHttpProvider = rebirthHttpProvider;
        return _this;
    }
    OnlineUserService.prototype.getUsers = function (pageIndex, pageSize, keyword) {
        if (pageIndex === void 0) { pageIndex = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        return null;
    };
    OnlineUserService.prototype.getUserByTitle = function (userName) {
        return null;
    };
    OnlineUserService.prototype.updateMarkdown = function (userUrl, user) {
        return null;
    };
    OnlineUserService.prototype.deleteUser = function (userUrl) {
        return null;
    };
    return OnlineUserService;
}(UserService));
__decorate([
    rebirth_storage_1.Cacheable({ pool: 'users' }),
    rebirth_http_1.GET('user'),
    __param(0, rebirth_http_1.Query('pageIndex')),
    __param(1, rebirth_http_1.Query('pageSize')),
    __param(2, rebirth_http_1.Query('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Observable_1.Observable)
], OnlineUserService.prototype, "getUsers", null);
__decorate([
    rebirth_http_1.GET('user/:id'),
    __param(0, rebirth_http_1.Path('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Observable_1.Observable)
], OnlineUserService.prototype, "getUserByTitle", null);
__decorate([
    rebirth_http_1.POST('user/:id'),
    __param(0, rebirth_http_1.Path('id')), __param(1, rebirth_http_1.Body),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.User]),
    __metadata("design:returntype", Observable_1.Observable)
], OnlineUserService.prototype, "updateMarkdown", null);
__decorate([
    rebirth_http_1.DELETE('user/:id'),
    __param(0, rebirth_http_1.Path('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Observable_1.Observable)
], OnlineUserService.prototype, "deleteUser", null);
OnlineUserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, rebirth_http_1.RebirthHttpProvider])
], OnlineUserService);
exports.OnlineUserService = OnlineUserService;
var GithubUserService = (function (_super) {
    __extends(GithubUserService, _super);
    function GithubUserService(http, rebirthHttpProvider) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.rebirthHttpProvider = rebirthHttpProvider;
        return _this;
    }
    GithubUserService.prototype.getUsers = function (pageIndex, pageSize, keyword) {
        if (pageIndex === void 0) { pageIndex = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        return this.innerGetUsers()
            .map(function (res) {
            var result = res.result || [];
            var startIndex = (pageIndex - 1) * pageSize;
            return {
                pageSize: pageSize,
                pageIndex: pageIndex,
                total: result.length,
                result: result.slice(startIndex, startIndex + pageSize)
            };
        });
    };
    GithubUserService.prototype.getUserByTitle = function (userName) {
        return this.innerGetUsers()
            .map(function (res) {
            var result = res.result || [];
            return result.find(function (item) { return item.username === userName; });
        });
    };
    GithubUserService.prototype.updateMarkdown = function (userUrl, user) {
        return null;
    };
    GithubUserService.prototype.deleteUser = function (userUrl) {
        return null;
    };
    GithubUserService.prototype.innerGetUsers = function () {
        return null;
    };
    return GithubUserService;
}(UserService));
__decorate([
    rebirth_storage_1.Cacheable({ pool: 'users' }),
    rebirth_http_1.GET('users.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Observable_1.Observable)
], GithubUserService.prototype, "innerGetUsers", null);
GithubUserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, rebirth_http_1.RebirthHttpProvider])
], GithubUserService);
exports.GithubUserService = GithubUserService;
exports.USER_SERVICE_PROVIDERS = [
    {
        provide: UserService,
        // environment.deploy === 'github' ? GithubUserService : OnlineUserService
        useClass: OnlineUserService
    }
];
//# sourceMappingURL=user.service.js.map