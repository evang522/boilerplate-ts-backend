import TestableCommandBusInterface from './TestableCommandBusInterface';
import CommandBus from '../CommandBus';
import CommandInterface from '../CommandInterface';
import CommandHandlerInterface from '../CommandHandlerInterface';
import ServiceResolverInterface from '../../../../Domain/Common/ServiceResolverInterface';

class TestableCommandBus extends CommandBus implements TestableCommandBusInterface
{
    private mockedCommandRecords: IMockedCommandRecord[] = []
    private callHistory: CommandInterface[] = [];

    public commandIsRegisteredToHandler(
        commandId: string,
        commandHandlerClass: Function
    ): boolean
    {
        const commandHandlerResolver = this.handlerMapping.get(commandId);

        if (!commandHandlerResolver)
        {
            return false;
        }

        return (commandHandlerResolver.resolveService() instanceof commandHandlerClass);
    }

    public dispatch<ICommandHandlerReturnValue = void>(command: CommandInterface): ICommandHandlerReturnValue
    {
        this.callHistory.push(command);

        return super.dispatch(command);
    }

    public commandIsRegisteredToAHandler(commandId: string): boolean
    {
        const commandHandler = this.handlerMapping.get(commandId);

        return Boolean(commandHandler);
    }

    public mockHandlerForCommand(
        commandId: string,
        commandHandlerMock: ServiceResolverInterface<CommandHandlerInterface<any>>
    ): void
    {
        this.mockedCommandRecords.push({
            commandId,
            commandHandlerMock: commandHandlerMock,
            previousHandler: this.handlerMapping.get(commandId),
        });
        this.handlerMapping.set(commandId, commandHandlerMock);
    }

    public getCallHistory(): CommandInterface[]
    {
        return this.callHistory;
    }

    public getFirstDispatchedCommand(): CommandInterface | null
    {
        return this.getCallHistory()[0] || null;
    }

    public restore(): void
    {
        this.mockedCommandRecords.forEach((record) =>
        {
            this.handlerMapping.set(record.commandId, record.previousHandler);
        });

        this.mockedCommandRecords = [];
        this.callHistory = [];
    }
}

export default TestableCommandBus;

interface IMockedCommandRecord {
    commandId: string;
    commandHandlerMock: ServiceResolverInterface<CommandHandlerInterface<any>>;
    previousHandler: ServiceResolverInterface<CommandHandlerInterface<any>> | undefined;
}
