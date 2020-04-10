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
var EventBusDispatchException_1 = __importDefault(require("./Exception/EventBusDispatchException"));
var EventBusRegisterException_1 = __importDefault(require("./Exception/EventBusRegisterException"));
var EventBus = /** @class */ (function () {
    function EventBus(container) {
        this.container = container;
        this.handlerMapping = new Map();
    }
    EventBus.prototype.registerHandlerToEvent = function (eventId, handlerContainerId) {
        try {
            var handler = this.container.get(handlerContainerId);
            var eventHandlers = this.handlerMapping.get(eventId);
            if (eventHandlers) {
                eventHandlers.push(handler);
            }
            else {
                this.handlerMapping.set(eventId, [handler]);
            }
        }
        catch (e) {
            throw EventBusRegisterException_1.default.forEventId(eventId, e.message);
        }
    };
    EventBus.prototype.on = function (eventId, handleFunction) {
        var _this = this;
        var proxyEventHandlerInterface = {
            handle: handleFunction,
        };
        if (!this.handlerMapping.get(eventId)) {
            this.handlerMapping.set(eventId, []);
        }
        this.handlerMapping.get(eventId).push(proxyEventHandlerInterface);
        // Return a function to remove the handler as this is necessary for cleanup with React Components.
        return function () {
            var handlerList = _this.handlerMapping.get(eventId);
            var handlerListWithoutCreatedProxyHandler = handlerList.reduce(function (accumulator, handler) {
                if (handler !== proxyEventHandlerInterface) {
                    accumulator.push(handler);
                }
                return accumulator;
            }, []);
            _this.handlerMapping.set(eventId, handlerListWithoutCreatedProxyHandler);
        };
    };
    EventBus.prototype.dispatchEvent = function (event) {
        try {
            if (!this.handlerMapping.has(event.getEventId())) {
                // If there is no handler registered for the event, don't do anything.
                return;
            }
            this.handlerMapping.get(event.getEventId()).forEach(function (handler) {
                handler.handle(event);
            });
        }
        catch (e) {
            throw EventBusDispatchException_1.default.forEventId(event.getEventId(), e);
        }
    };
    EventBus = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [inversify_1.Container])
    ], EventBus);
    return EventBus;
}());
exports.default = EventBus;
