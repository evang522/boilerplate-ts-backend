"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var instance_1 = __importDefault(require("../../DependencyInjection/Container/instance"));
var BusContainerIdServiceResolver = /** @class */ (function () {
    function BusContainerIdServiceResolver(containerId, diContainer) {
        if (diContainer === void 0) { diContainer = instance_1.default; }
        this.containerId = containerId;
        this.diContainer = diContainer;
    }
    BusContainerIdServiceResolver.prototype.resolveService = function () {
        return this.diContainer.get(this.containerId);
    };
    return BusContainerIdServiceResolver;
}());
exports.default = BusContainerIdServiceResolver;
