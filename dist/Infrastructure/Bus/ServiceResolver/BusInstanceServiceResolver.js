"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BusInstanceServiceResolver = /** @class */ (function () {
    function BusInstanceServiceResolver(serviceInstance) {
        this.serviceInstance = serviceInstance;
    }
    BusInstanceServiceResolver.prototype.resolveService = function () {
        return this.serviceInstance;
    };
    return BusInstanceServiceResolver;
}());
exports.default = BusInstanceServiceResolver;
