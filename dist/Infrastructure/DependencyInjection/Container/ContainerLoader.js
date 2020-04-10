"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var ContainerLoader = /** @class */ (function () {
    function ContainerLoader() {
    }
    /**
     * @description When this is set to true, the container will look for every class
     * with the @injectable tag, and bind it to itself in the container.
     */
    ContainerLoader.prototype.autoBindInjectable = function () {
        return true;
    };
    /**
     * @description this property describes the default context in which the service should be bound.
     * This can of course be overwritten by individual configurations in the Bindings below.
     * Singleton:  remains the same instance throughout the entire application.
     * Transient: Creates a new instance every time it is requested.
     */
    ContainerLoader.prototype.defaultScope = function () {
        return 'Transient';
    };
    ContainerLoader.prototype.skipBaseClassChecks = function () {
        return true;
    };
    ContainerLoader.load = function () {
        var self = new this();
        var containerInstance = self.buildInitialContainerWithSettings();
        return containerInstance;
    };
    ContainerLoader.prototype.buildInitialContainerWithSettings = function () {
        return new inversify_1.Container({
            defaultScope: this.defaultScope(),
            autoBindInjectable: this.autoBindInjectable(),
            skipBaseClassChecks: this.skipBaseClassChecks(),
        });
    };
    return ContainerLoader;
}());
exports.default = ContainerLoader;
