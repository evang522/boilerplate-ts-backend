import container from '../../DependencyInjection/Container/instance';
import CommandBus from './CommandBus';
import CommandBusConfigInterface from './config/CommandBusConfigInterface';
import CommandInterface from './CommandInterface';
import CommandHandlerInterface from './CommandHandlerInterface';
import BusContainerIdServiceResolver from '../ServiceResolver/BusContainerIdServiceResolver';
import commandBusConfig from './config/';

describe('Assembled Correctly', () =>
{
    it('For Each Command id in the config, there is an instance established in the container', () =>
    {
        const bus = container.get<CommandBus>(CommandBus);

        commandBusConfig.forEach((configObj: CommandBusConfigInterface) =>
        {
            expect(bus['handlerMapping'].has(configObj.commandId));
        });
    });
});

describe('Registers and Dispatches Commands Correctly', () =>
{
    it('In the case of properly setup config, dispatches command correctly', () =>
    {
        const bus = container.get<CommandBus>(CommandBus);

        const testCommand: CommandInterface = {
            getCommandId: () =>
            {
                return 'command.test.id';
            },
        };

        const commandHandler: CommandHandlerInterface<typeof testCommand> = {
            handle(command: typeof testCommand): string
            {
                return command.getCommandId();
            },
        };

        container.bind('testCommandHandler').toConstantValue(commandHandler);

        bus.registerHandlerToCommand(
            testCommand.getCommandId(),
            // @ts-ignore
            new BusContainerIdServiceResolver('testCommandHandler')
        );

        expect(bus.dispatch(testCommand)).toBe(testCommand.getCommandId());
    });

    it('In the case of Improperly setup config (Handler not Registered), throws an Error on Dispatch', () =>
    {
        container.rebind(CommandBus).toConstantValue(new CommandBus());
        const bus = container.get<CommandBus>(CommandBus);

        const testCommand: CommandInterface = {
            getCommandId: () =>
            {
                return 'command.test.id';
            },
        };

        expect(() =>
        {
            bus.dispatch(testCommand);
        }).toThrow('Dispatched a command for which there is no handler registered');
    });

    it('In the case of Improperly setup config (Handler Already Registered), throws an Error on Register', () =>
    {
        container.rebind(CommandBus).toConstantValue(new CommandBus());
        const bus = container.get<CommandBus>(CommandBus);

        const testCommand: CommandInterface = {
            getCommandId: () =>
            {
                return 'command.test.id';
            },
        };

        const commandHandler: CommandHandlerInterface<typeof testCommand> = {
            handle(command: typeof testCommand): string
            {
                return command.getCommandId();
            },
        };

        container.bind('testCommandHandler').toConstantValue(commandHandler);

        // @ts-ignore
        bus.registerHandlerToCommand(testCommand.getCommandId(), new BusContainerIdServiceResolver('testCommandHandler'));
        expect(() =>
        {
        // @ts-ignore
            bus.registerHandlerToCommand(testCommand.getCommandId(), new BusContainerIdServiceResolver('testCommandHandler'));
        }).toThrow(
            // eslint-disable-next-line max-len
            'Registering Command with Id: "command.test.id" to handler failed. : Cannot reassign Command handler to provided ID command.test.id as it is already assigned.'
        );

        bus.dispatch(testCommand);
    });
});
