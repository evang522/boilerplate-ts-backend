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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var Appconfig_1 = __importDefault(require("../../../Configuration/Appconfig"));
var ServiceLayerLoadedHandler = /** @class */ (function () {
    function ServiceLayerLoadedHandler(appConfig) {
        if (appConfig === void 0) { appConfig = Appconfig_1.default.fromEnvironment(); }
        this.appConfig = appConfig;
    }
    ServiceLayerLoadedHandler.prototype.handle = function (event) {
        if (this.appConfig.inEnvironment('development')) {
            // eslint-disable-next-line no-console
            console.log('Service layer loaded at: ' + new Date(event.getTimestamp()));
        }
    };
    ServiceLayerLoadedHandler = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [Appconfig_1.default])
    ], ServiceLayerLoadedHandler);
    return ServiceLayerLoadedHandler;
}());
exports.default = ServiceLayerLoadedHandler;
