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
var inversify_1 = require("inversify");
var AppConfig = /** @class */ (function () {
    function AppConfig(environment, port, dbConnectionUrl) {
        this.environment = environment;
        this.port = port;
        this.dbConnectionUrl = dbConnectionUrl;
        if (!environment) {
            throw new Error('Cannot launch app. An Env variable is undefined.');
        }
        if (!port) {
            throw new Error('Cannot launch app -- port ENV key is missing');
        }
        if (!dbConnectionUrl) {
            throw new Error('Cannot launch app -- DB Connection URL is missing');
        }
    }
    AppConfig.fromEnvironment = function () {
        return new this(process.env.APP_ENV, Number(process.env.PORT), process.env.DATABASE_URL);
    };
    AppConfig.prototype.inEnvironment = function (env) {
        return this.environment === env;
    };
    AppConfig.prototype.inAnyEnvironment = function (envs) {
        var _this = this;
        return envs.some(function (env) { return _this.inEnvironment(env); });
    };
    AppConfig.prototype.getPort = function () {
        return this.port;
    };
    AppConfig.prototype.getDbConnectionUrl = function () {
        return this.dbConnectionUrl;
    };
    AppConfig = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [String, Number, String])
    ], AppConfig);
    return AppConfig;
}());
exports.default = AppConfig;
