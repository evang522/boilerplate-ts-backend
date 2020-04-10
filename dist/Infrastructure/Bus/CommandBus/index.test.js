"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var instance_1 = __importDefault(require("../../DependencyInjection/Container/instance"));
var CommandBus_1 = __importDefault(require("./CommandBus"));
var BusContainerIdServiceResolver_1 = __importDefault(require("../ServiceResolver/BusContainerIdServiceResolver"));
var config_1 = __importDefault(require("./config/"));
describe('Assembled Correctly', function () {
    it('For Each Command id in the config, there is an instance established in the container', function () {
        var bus = instance_1.default.get(CommandBus_1.default);
        config_1.default.forEach(function (configObj) {
            expect(bus['handlerMapping'].has(configObj.commandId));
        });
    });
});
describe('Registers and Dispatches Commands Correctly', function () {
    it('In the case of properly setup config, dispatches command correctly', function () {
        var bus = instance_1.default.get(CommandBus_1.default);
        var testCommand = {
            getCommandId: function () {
                return 'command.test.id';
            },
        };
        var commandHandler = {
            handle: function (command) {
                return command.getCommandId();
            },
        };
        instance_1.default.bind('testCommandHandler').toConstantValue(commandHandler);
        bus.registerHandlerToCommand(testCommand.getCommandId(), 
        // @ts-ignore
        new BusContainerIdServiceResolver_1.default('testCommandHandler'));
        expect(bus.dispatch(testCommand)).toBe(testCommand.getCommandId());
    });
    it('In the case of Improperly setup config (Handler not Registered), throws an Error on Dispatch', function () {
        instance_1.default.rebind(CommandBus_1.default).toConstantValue(new CommandBus_1.default());
        var bus = instance_1.default.get(CommandBus_1.default);
        var testCommand = {
            getCommandId: function () {
                return 'command.test.id';
            },
        };
        expect(function () {
            bus.dispatch(testCommand);
        }).toThrow('Dispatched a command for which there is no handler registered');
    });
    it('In the case of Improperly setup config (Handler Already Registered), throws an Error on Register', function () {
        instance_1.default.rebind(CommandBus_1.default).toConstantValue(new CommandBus_1.default());
        var bus = instance_1.default.get(CommandBus_1.default);
        var testCommand = {
            getCommandId: function () {
                return 'command.test.id';
            },
        };
        var commandHandler = {
            handle: function (command) {
                return command.getCommandId();
            },
        };
        instance_1.default.bind('testCommandHandler').toConstantValue(commandHandler);
        // @ts-ignore
        bus.registerHandlerToCommand(testCommand.getCommandId(), new BusContainerIdServiceResolver_1.default('testCommandHandler'));
        expect(function () {
            // @ts-ignore
            bus.registerHandlerToCommand(testCommand.getCommandId(), new BusContainerIdServiceResolver_1.default('testCommandHandler'));
        }).toThrow(
        // eslint-disable-next-line max-len
        'Registering Command with Id: "command.test.id" to handler failed. : Cannot reassign Command handler to provided ID command.test.id as it is already assigned.');
        bus.dispatch(testCommand);
    });
});
