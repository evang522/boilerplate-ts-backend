"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceLayerLoaded = /** @class */ (function () {
    function ServiceLayerLoaded() {
        this.timestamp = Date.now();
    }
    ServiceLayerLoaded.prototype.getEventId = function () {
        return ServiceLayerLoaded.EVENT_ID;
    };
    ServiceLayerLoaded.prototype.getTimestamp = function () {
        return this.timestamp;
    };
    ServiceLayerLoaded.EVENT_ID = 'app.services.application.boot.application_loaded::event';
    return ServiceLayerLoaded;
}());
exports.default = ServiceLayerLoaded;
