"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceBinder_1 = __importDefault(require("../../Infrastructure/DependencyInjection/ServiceBinder/ServiceBinder"));
var instance_1 = __importDefault(require("../../Infrastructure/DependencyInjection/Container/instance"));
var EventBus_1 = __importDefault(require("../../Infrastructure/Bus/EventBus/EventBus"));
var config_1 = __importDefault(require("../../Infrastructure/Bus/EventBus/config"));
var config_2 = __importDefault(require("../../Infrastructure/Bus/CommandBus/config"));
var CommandBus_1 = __importDefault(require("../../Infrastructure/Bus/CommandBus/CommandBus"));
var QueryBus_1 = __importDefault(require("../../Infrastructure/Bus/QueryBus/QueryBus"));
var config_3 = __importDefault(require("../../Infrastructure/Bus/QueryBus/config"));
var BusContainerIdServiceResolver_1 = __importDefault(require("../../Infrastructure/Bus/ServiceResolver/BusContainerIdServiceResolver"));
var ServiceLayerLoaded_1 = __importDefault(require("./Event/ServiceLayerLoaded/ServiceLayerLoaded"));
var Application_1 = __importDefault(require("../Application/Application"));
var index_controllerconfig_1 = __importDefault(require("../../Infrastructure/Api/Controller/index.controllerconfig"));
var ApplicationLoader = /** @class */ (function () {
    function ApplicationLoader() {
    }
    ApplicationLoader.mount = function () {
        var self = new this();
        if (this.mounted) {
            return;
        }
        // These commands must be run in the correct order -- DIC must be loaded first.
        self.registerContainerBindings();
        self.registerEventHandlersToBus();
        self.registerCommandHandlersToBus();
        self.registerQueryHandlersToBus();
        self.startApplication();
        this.mounted = true;
        var eventBus = instance_1.default.get(EventBus_1.default);
        // Dispatch Application Loaded event for handlers to hook into, also for dev debugging if needed.
        eventBus.dispatchEvent(new ServiceLayerLoaded_1.default());
    };
    ApplicationLoader.prototype.registerContainerBindings = function () {
        ServiceBinder_1.default.bindApplicationServicesToContainer(instance_1.default);
    };
    ApplicationLoader.prototype.registerEventHandlersToBus = function () {
        var eventBus = instance_1.default.get(EventBus_1.default);
        config_1.default.forEach(function (eventHandlerConfig) {
            eventBus.registerHandlerToEvent(eventHandlerConfig.eventId, eventHandlerConfig.handlerClass);
        });
    };
    ApplicationLoader.prototype.registerCommandHandlersToBus = function () {
        var commandBus = instance_1.default.get(CommandBus_1.default);
        config_2.default.forEach(function (commandHandlerConfig) {
            commandBus.registerHandlerToCommand(commandHandlerConfig.commandId, new BusContainerIdServiceResolver_1.default(commandHandlerConfig.handlerClass));
        });
    };
    ApplicationLoader.prototype.registerQueryHandlersToBus = function () {
        var queryBus = instance_1.default.get(QueryBus_1.default);
        config_3.default.forEach(function (queryHandlerConfig) {
            queryBus.registerHandlerToQuery(queryHandlerConfig.queryId, new BusContainerIdServiceResolver_1.default(queryHandlerConfig.handlerClass));
        });
    };
    ApplicationLoader.prototype.startApplication = function () {
        var application = new Application_1.default(index_controllerconfig_1.default);
        application.listen();
    };
    ApplicationLoader.mounted = false;
    return ApplicationLoader;
}());
exports.default = ApplicationLoader;
