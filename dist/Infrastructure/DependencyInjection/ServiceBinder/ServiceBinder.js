"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceId_1 = __importDefault(require("../ServiceId"));
var EventBus_1 = __importDefault(require("../../Bus/EventBus/EventBus"));
var CommandBus_1 = __importDefault(require("../../Bus/CommandBus/CommandBus"));
var QueryBus_1 = __importDefault(require("../../Bus/QueryBus/QueryBus"));
var TestableCommandBus_1 = __importDefault(require("../../Bus/CommandBus/Test/TestableCommandBus"));
var TestableQueryBus_1 = __importDefault(require("../../Bus/QueryBus/Test/TestableQueryBus"));
var Appconfig_1 = __importDefault(require("../../../Application/Configuration/Appconfig"));
var typeorm_1 = require("typeorm");
var ServiceBinder = /** @class */ (function () {
    function ServiceBinder(appConfig) {
        if (appConfig === void 0) { appConfig = Appconfig_1.default.fromEnvironment(); }
        this.appConfig = appConfig;
    }
    ServiceBinder.bindApplicationServicesToContainer = function (container) {
        var self = new this();
        self.createContainerBindingsBasedOnEnvironment(container);
    };
    ServiceBinder.prototype.createContainerBindingsBasedOnEnvironment = function (container) {
        this.createGlobalBindings(container);
        if (this.appConfig.inAnyEnvironment(['production'])) {
            this.loadProdEnvironmentBindings(container);
            return;
        }
        if (this.appConfig.inEnvironment('development')) {
            this.loadDevEnvironmentBindings(container);
            return;
        }
        if (this.appConfig.inEnvironment('test')) {
            this.loadTestEnvironmentBindings(container);
            return;
        }
    };
    ServiceBinder.prototype.loadTestEnvironmentBindings = function (container) {
        var commandBus = new TestableCommandBus_1.default();
        container.bind(CommandBus_1.default).toConstantValue(commandBus);
        container.bind(ServiceId_1.default.CommandBusInterface).toConstantValue(commandBus);
        var queryBus = new TestableQueryBus_1.default();
        container.bind(QueryBus_1.default).toConstantValue(queryBus);
        container.bind(ServiceId_1.default.QueryBusInterface).toConstantValue(queryBus);
    };
    ServiceBinder.prototype.loadDevEnvironmentBindings = function (container) {
        var commandBus = new CommandBus_1.default();
        container.bind(CommandBus_1.default).toConstantValue(commandBus);
        container.bind(ServiceId_1.default.CommandBusInterface).toConstantValue(commandBus);
        var queryBus = new QueryBus_1.default();
        container.bind(QueryBus_1.default).toConstantValue(queryBus);
        container.bind(ServiceId_1.default.QueryBusInterface).toConstantValue(queryBus);
    };
    ServiceBinder.prototype.loadProdEnvironmentBindings = function (container) {
        var commandBus = new CommandBus_1.default();
        container.bind(CommandBus_1.default).toConstantValue(commandBus);
        container.bind(ServiceId_1.default.CommandBusInterface).toConstantValue(commandBus);
        var queryBus = new QueryBus_1.default();
        container.bind(QueryBus_1.default).toConstantValue(queryBus);
        container.bind(ServiceId_1.default.QueryBusInterface).toConstantValue(queryBus);
    };
    ServiceBinder.prototype.createGlobalBindings = function (container) {
        // Bind Event, Command, and Query Bus
        var eventBus = new EventBus_1.default(container);
        container.bind(EventBus_1.default).toConstantValue(eventBus);
        container.bind(ServiceId_1.default.EventBusInterface).toConstantValue(eventBus);
        var appConfig = Appconfig_1.default.fromEnvironment();
        container.bind(ServiceId_1.default.AppConfig).toConstantValue(appConfig);
        container.bind(Appconfig_1.default).toConstantValue(appConfig);
        // Bind Entity Repository Factory
        container.bind(ServiceId_1.default.EntityRepositoryFactory).toFactory(function () {
            return function (entity) {
                return typeorm_1.getRepository(entity);
            };
        });
    };
    return ServiceBinder;
}());
exports.default = ServiceBinder;
