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
var QueryBusRegisterException_1 = __importDefault(require("./Exception/QueryBusRegisterException"));
var QueryBusDispatchException_1 = __importDefault(require("./Exception/QueryBusDispatchException"));
var QueryBus = /** @class */ (function () {
    function QueryBus() {
        // eslint-disable-next-line max-len
        this.handlerMapping = new Map();
    }
    QueryBus.prototype.registerHandlerToQuery = function (queryId, handlerResolver) {
        try {
            var queryHandlerResolver = this.handlerMapping.get(queryId);
            if (queryHandlerResolver) {
                throw new Error("Cannot reassign Query handler to provided ID " + queryId + " as it is already assigned.");
            }
            this.handlerMapping.set(queryId, handlerResolver);
        }
        catch (e) {
            throw QueryBusRegisterException_1.default.forQueryId(queryId, e.message);
        }
    };
    QueryBus.prototype.handle = function (query) {
        try {
            if (!this.handlerMapping.has(query.getQueryId())) {
                throw new Error('Dispatched a query for which there is no handler registered');
            }
            var handlerResolver = this.handlerMapping.get(query.getQueryId());
            return handlerResolver.resolveService().handle(query);
        }
        catch (e) {
            throw QueryBusDispatchException_1.default.forQueryId(query.getQueryId(), e);
        }
    };
    QueryBus = __decorate([
        inversify_1.injectable()
    ], QueryBus);
    return QueryBus;
}());
exports.default = QueryBus;
