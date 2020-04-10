"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var CommandBusRegisterException_1 = __importDefault(require("./Exception/CommandBusRegisterException"));
var CommandBusDispatchException_1 = __importDefault(require("./Exception/CommandBusDispatchException"));
var CommandBus = /** @class */ (function () {
    function CommandBus() {
        this.handlerMapping = new Map();
    }
    CommandBus.prototype.registerHandlerToCommand = function (commandId, handlerResolver) {
        try {
            var commandHandler = this.handlerMapping.get(commandId);
            if (commandHandler) {
                throw new Error("Cannot reassign Command handler to provided ID " + commandId + " as it is already assigned.");
            }
            this.handlerMapping.set(commandId, handlerResolver);
        }
        catch (e) {
            throw CommandBusRegisterException_1.default.forCommandId(commandId, e.message);
        }
    };
    CommandBus.prototype.dispatch = function (command) {
        try {
            if (!this.handlerMapping.has(command.getCommandId())) {
                throw new Error('Dispatched a command for which there is no handler registered');
            }
            var handlerResolver = this.handlerMapping.get(command.getCommandId());
            var handler = handlerResolver.resolveService();
            return handler.handle(command);
        }
        catch (e) {
            console.log(e);
            throw CommandBusDispatchException_1.default.forCommandId(command.getCommandId(), e);
        }
    };
    CommandBus = __decorate([
        inversify_1.injectable()
    ], CommandBus);
    return CommandBus;
}());
exports.default = CommandBus;
