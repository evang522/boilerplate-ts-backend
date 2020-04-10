"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceBinder_1 = __importDefault(require("./ServiceBinder"));
var inversify_1 = require("inversify");
var EventBus_1 = __importDefault(require("../../Bus/EventBus/EventBus"));
var CommandBus_1 = __importDefault(require("../../Bus/CommandBus/CommandBus"));
var ServiceId_1 = __importDefault(require("../ServiceId"));
var TestableCommandBus_1 = __importDefault(require("../../Bus/CommandBus/Test/TestableCommandBus"));
var Appconfig_1 = __importDefault(require("../../../Application/Configuration/Appconfig"));
describe('Binds Proper Services with Global Binding Config', function () {
    it('Binds Event Bus', function () {
        var container = new inversify_1.Container();
        ServiceBinder_1.default.bindApplicationServicesToContainer(container);
        expect(container.get(EventBus_1.default)).toBeInstanceOf(EventBus_1.default);
        expect(container.get(ServiceId_1.default.EventBusInterface)).toBeTruthy();
    });
    it('Binds Command Bus', function () {
        var container = new inversify_1.Container();
        ServiceBinder_1.default.bindApplicationServicesToContainer(container);
        expect(container.get(CommandBus_1.default)).toBeInstanceOf(CommandBus_1.default);
        expect(container.get(ServiceId_1.default.CommandBusInterface)).toBeTruthy();
    });
    it('Binds Correct Versions of Busses in different Environments', function () {
        // Prod Environment
        var prodAppConfig = new Appconfig_1.default('production');
        var prodContainer = new inversify_1.Container();
        var prodBinder = new ServiceBinder_1.default(prodAppConfig);
        prodBinder['createContainerBindingsBasedOnEnvironment'](prodContainer);
        expect(prodContainer.get(CommandBus_1.default)).toBeInstanceOf(CommandBus_1.default);
        // Test Environment
        var testAppConfig = new Appconfig_1.default('test');
        var testContainer = new inversify_1.Container();
        var testBinder = new ServiceBinder_1.default(testAppConfig);
        testBinder['createContainerBindingsBasedOnEnvironment'](testContainer);
        expect(testContainer.get(CommandBus_1.default)).toBeInstanceOf(TestableCommandBus_1.default);
        // Dev Environment
        var devAppConfig = new Appconfig_1.default('development');
        var devContainer = new inversify_1.Container();
        var devBinder = new ServiceBinder_1.default(devAppConfig);
        devBinder['createContainerBindingsBasedOnEnvironment'](devContainer);
        expect(devContainer.get(CommandBus_1.default)).toBeInstanceOf(CommandBus_1.default);
    });
    it('Binds Interfaces', function () {
        var container = new inversify_1.Container();
        ServiceBinder_1.default.bindApplicationServicesToContainer(container);
        expect(container.get(ServiceId_1.default.AppConfig)).toBeInstanceOf(Appconfig_1.default);
    });
});
