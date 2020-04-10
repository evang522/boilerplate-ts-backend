"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceId_1 = __importDefault(require("../../../DependencyInjection/ServiceId"));
var instance_1 = __importDefault(require("../../../DependencyInjection/Container/instance"));
var BusInstanceServiceResolver_1 = __importDefault(require("../../ServiceResolver/BusInstanceServiceResolver"));
describe('Provides Testing Utilities for the Command Bus', function () {
    it('Command Is Registered to handler Assertion', function () {
        var commandBus = instance_1.default.get(ServiceId_1.default.CommandBusInterface);
        var command = {
            getCommandId: function () {
                return 'commandbus.test.testable';
            },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var TempHandlerClass = /** @class */ (function () {
            function TempHandlerClass() {
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            TempHandlerClass.prototype.handle = function () {
                //
            };
            return TempHandlerClass;
        }());
        commandBus.mockHandlerForCommand(command.getCommandId(), new BusInstanceServiceResolver_1.default(new TempHandlerClass()));
        expect(commandBus.commandIsRegisteredToHandler(command.getCommandId(), TempHandlerClass)).toBe(true);
    });
    it('Command Is Registered At all', function () {
        var commandBus = instance_1.default.get(ServiceId_1.default.CommandBusInterface);
        var command = {
            getCommandId: function () {
                return 'commandbus.test.testable';
            },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var TempHandlerClass = /** @class */ (function () {
            function TempHandlerClass() {
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            TempHandlerClass.prototype.handle = function () {
                //
            };
            return TempHandlerClass;
        }());
        commandBus.mockHandlerForCommand(command.getCommandId(), new BusInstanceServiceResolver_1.default(new TempHandlerClass()));
        expect(commandBus.commandIsRegisteredToAHandler(command.getCommandId())).toBe(true);
    });
    //
    // it('Mocks a Handler for a specified command ID', () =>
    // {
    //     const commandBus = container.get<TestableCommandBus>(ServiceId.CommandBusInterface);
    //
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     class TempHandlerClass implements CommandHandlerInterface<any>
    //     {
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         handle(): any
    //         {
    //             //
    //         }
    //     }
    //
    //     const command = new MountGoogleTagManagerScript();
    //     commandBus.mockHandlerForCommand(
    //         command.getCommandId(),
    //         new BusInstanceServiceResolver(new TempHandlerClass())
    //     );
    //
    //     expect(commandBus.commandIsRegisteredToHandler(command.getCommandId(), TempHandlerClass)).toBe(true);
    // });
    // it('Cleans up Mock command mappings With Restore Method', () =>
    // {
    //     const commandBus = container.get<TestableCommandBus>(ServiceId.CommandBusInterface);
    //
    //     const command: CommandInterface = {
    //
    //         getCommandId(): string
    //         {
    //             return 'commandbus.test.testable';
    //         },
    //     };
    //
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     class TempHandlerClass implements CommandHandlerInterface<any>
    //     {
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         handle(): any
    //         {
    //             //
    //         }
    //     }
    //
    //     container.bind(TempHandlerClass).toConstantValue(new TempHandlerClass());
    //
    //     commandBus.registerHandlerToCommand(command.getCommandId(), new BusContainerIdServiceResolver(TempHandlerClass));
    //     commandBus.mockHandlerForCommand(command.getCommandId(), new BusInstanceServiceResolver(new MountGoogleTagManagerScriptHandler()));
    //
    //     expect(commandBus.commandIsRegisteredToHandler(command.getCommandId(), MountGoogleTagManagerScriptHandler));
    //
    //     // Restore all mocked commands to their original state.
    //     commandBus.restore();
    //
    //     expect(commandBus.commandIsRegisteredToHandler(command.getCommandId(), TempHandlerClass));
    //     expect(commandBus['mockedCommandRecords'].length).toBe(0);
    // });
});
