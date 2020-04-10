"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var instance_1 = __importDefault(require("../../DependencyInjection/Container/instance"));
var EventBus_1 = __importDefault(require("./EventBus"));
var config_1 = __importDefault(require("./config"));
describe('Assembled Correctly', function () {
    it('For Each Command id in the config, there is an instance established in the container', function () {
        var bus = instance_1.default.get(EventBus_1.default);
        config_1.default.forEach(function (configObj) {
            expect(bus['handlerMapping'].has(configObj.eventId));
        });
    });
});
describe('Registers and Dispatches Commands Correctly', function () {
    it('In the case of properly setup config, dispatches event correctly', function () {
        var bus = instance_1.default.get(EventBus_1.default);
        var spyFunction = jest.fn();
        var testEvent = {
            getEventId: function () {
                return 'event.test.id';
            },
        };
        var eventHandler = {
            handle: function (command) {
                spyFunction(command.getEventId());
            },
        };
        instance_1.default.bind('testEventHandler').toConstantValue(eventHandler);
        // @ts-ignore
        bus.registerHandlerToEvent(testEvent.getEventId(), 'testEventHandler');
        bus.dispatchEvent(testEvent);
        expect(spyFunction.mock.calls.length).toBe(1);
    });
    it('In the case of the Handler not being registered in container, throws an Error on register', function () {
        instance_1.default.rebind(EventBus_1.default).toConstantValue(new EventBus_1.default(instance_1.default));
        var bus = instance_1.default.get(EventBus_1.default);
        var testEvent = {
            getEventId: function () {
                return 'event.test.id';
            },
        };
        expect(function () {
            // @ts-ignore
            bus.registerHandlerToEvent(testEvent.getEventId(), 'testEventHandler1');
        }).toThrow('No matching bindings found for serviceIdentifier: testEventHandler1');
    });
});
