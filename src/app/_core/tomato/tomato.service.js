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
var tomato_model_1 = require("./tomato.model");
var rebirth_storage_1 = require("rebirth-storage/dist/rebirth-storage");
var rebirth_http_1 = require("rebirth-http/rebirth-http");
var TomatoService = (function (_super) {
    __extends(TomatoService, _super);
    function TomatoService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TomatoService;
}(rebirth_http_1.RebirthHttp));
exports.TomatoService = TomatoService;
var OnlineTomatoService = (function (_super) {
    __extends(OnlineTomatoService, _super);
    function OnlineTomatoService(http, rebirthHttpProvider) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.rebirthHttpProvider = rebirthHttpProvider;
        return _this;
    }
    OnlineTomatoService.prototype.CreateTomato = function (tomato) {
        return null;
    };
    OnlineTomatoService.prototype.getTomatos = function (pageIndex, pageSize, keyword) {
        if (pageIndex === void 0) { pageIndex = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        return null;
    };
    OnlineTomatoService.prototype.getTomatoByTitle = function (tomatoTitle) {
        return null;
    };
    OnlineTomatoService.prototype.updateTomato = function (tomatoUrl, tomato) {
        return null;
    };
    OnlineTomatoService.prototype.deleteTomato = function (tomatoUrl) {
        return null;
    };
    return OnlineTomatoService;
}(TomatoService));
__decorate([
    rebirth_http_1.POST('http://localhost:3000/api/tomato'),
    __param(0, rebirth_http_1.Body),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tomato_model_1.Tomato]),
    __metadata("design:returntype", Object)
], OnlineTomatoService.prototype, "CreateTomato", null);
__decorate([
    rebirth_storage_1.Cacheable({ pool: 'tomatos' }),
    rebirth_http_1.GET('http://localhost:3000/api/tomato'),
    __param(0, rebirth_http_1.Query('pageIndex')),
    __param(1, rebirth_http_1.Query('pageSize')),
    __param(2, rebirth_http_1.Query('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Object)
], OnlineTomatoService.prototype, "getTomatos", null);
__decorate([
    rebirth_http_1.GET('http://localhost:3000/api/tomato/:id'),
    __param(0, rebirth_http_1.Path('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], OnlineTomatoService.prototype, "getTomatoByTitle", null);
__decorate([
    rebirth_http_1.POST('http://localhost:3000/api/tomato/:id'),
    __param(0, rebirth_http_1.Path('id')), __param(1, rebirth_http_1.Body),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tomato_model_1.Tomato]),
    __metadata("design:returntype", Object)
], OnlineTomatoService.prototype, "updateTomato", null);
__decorate([
    rebirth_http_1.DELETE('http://localhost:3000/api/tomato/:id'),
    __param(0, rebirth_http_1.Path('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], OnlineTomatoService.prototype, "deleteTomato", null);
OnlineTomatoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, rebirth_http_1.RebirthHttpProvider])
], OnlineTomatoService);
exports.OnlineTomatoService = OnlineTomatoService;
var GithubTomatoService = (function (_super) {
    __extends(GithubTomatoService, _super);
    function GithubTomatoService(http, rebirthHttpProvider) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.rebirthHttpProvider = rebirthHttpProvider;
        return _this;
    }
    GithubTomatoService.prototype.CreateTomato = function (tomato) {
        return null;
    };
    GithubTomatoService.prototype.getTomatos = function (pageIndex, pageSize, keyword) {
        if (pageIndex === void 0) { pageIndex = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        return this.innerGetTomatos()
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
    GithubTomatoService.prototype.getTomatoByTitle = function (tomatoTitle) {
        return this.innerGetTomatos()
            .map(function (res) {
            var result = res.result || [];
            return result.find(function (item) { return item.title === tomatoTitle; });
        });
    };
    GithubTomatoService.prototype.updateTomato = function (tomatoUrl, tomato) {
        return null;
    };
    GithubTomatoService.prototype.deleteTomato = function (tomatoUrl) {
        return null;
    };
    GithubTomatoService.prototype.innerGetTomatos = function () {
        return null;
    };
    return GithubTomatoService;
}(TomatoService));
__decorate([
    rebirth_storage_1.Cacheable({ pool: 'tomatos' }),
    rebirth_http_1.GET('tomatos.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], GithubTomatoService.prototype, "innerGetTomatos", null);
GithubTomatoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, rebirth_http_1.RebirthHttpProvider])
], GithubTomatoService);
exports.GithubTomatoService = GithubTomatoService;
exports.TOMATO_SERVICE_PROVIDERS = [
    {
        provide: TomatoService,
        // environment.deploy === 'github' ? GithubTomatoService : OnlineTomatoService
        useClass: OnlineTomatoService
    }
];
//# sourceMappingURL=tomato.service.js.map