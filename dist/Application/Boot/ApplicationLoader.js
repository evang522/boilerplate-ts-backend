"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var DatabaseConnector_1 = __importDefault(require("../Database/DatabaseConnector"));
var ServiceId_1 = __importDefault(require("../../Infrastructure/DependencyInjection/ServiceId"));
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
        return __awaiter(this, void 0, void 0, function () {
            var databaseConnector, connection, application;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        databaseConnector = instance_1.default.get(DatabaseConnector_1.default);
                        return [4 /*yield*/, databaseConnector.connect()];
                    case 1:
                        connection = _a.sent();
                        instance_1.default.bind(ServiceId_1.default.DbConnectionInterface).toConstantValue(connection);
                        application = new Application_1.default(index_controllerconfig_1.default.map(function (controllerContainerId) { return instance_1.default.get(controllerContainerId); }));
                        application.listen();
                        return [2 /*return*/];
                }
            });
        });
    };
    ApplicationLoader.mounted = false;
    return ApplicationLoader;
}());
exports.default = ApplicationLoader;
