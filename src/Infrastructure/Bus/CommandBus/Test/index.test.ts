import TestableCommandBus from './TestableCommandBus';
import ServiceId from '../../../DependencyInjection/ServiceId';
import container from '../../../DependencyInjection/Container/instance';
import CommandInterface from '../CommandInterface';
import CommandHandlerInterface from '../CommandHandlerInterface';
import BusInstanceServiceResolver from '../../ServiceResolver/BusInstanceServiceResolver';

describe('Provides Testing Utilities for the Command Bus', () =>
{
    it('Command Is Registered to handler Assertion', () =>
    {
        const commandBus = container.get<TestableCommandBus>(ServiceId.CommandBusInterface);

        const command: CommandInterface = {

            getCommandId(): string
            {
                return 'commandbus.test.testable';
            },
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        class TempHandlerClass implements CommandHandlerInterface<any>
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handle(): any
            {
                //
            }
        }

        commandBus.mockHandlerForCommand(
            command.getCommandId(),
            new BusInstanceServiceResolver<TempHandlerClass>(new TempHandlerClass())
        );

        expect(commandBus.commandIsRegisteredToHandler(command.getCommandId(), TempHandlerClass)).toBe(true);
    });

    it('Command Is Registered At all', () =>
    {
        const commandBus = container.get<TestableCommandBus>(ServiceId.CommandBusInterface);

        const command: CommandInterface = {

            getCommandId(): string
            {
                return 'commandbus.test.testable';
            },
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        class TempHandlerClass implements CommandHandlerInterface<any>
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handle(): any
            {
                //
            }
        }

        commandBus.mockHandlerForCommand(
            command.getCommandId(),
            new BusInstanceServiceResolver(new TempHandlerClass())
        );

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
