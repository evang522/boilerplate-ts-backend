import CommandBusInterface from '../CommandBusInterface';
import CommandInterface from '../CommandInterface';
import CommandHandlerInterface from '../CommandHandlerInterface';
import ServiceResolverInterface from '../../../../Domain/Common/ServiceResolverInterface';

export default interface TestableCommandBusInterface extends CommandBusInterface {
    commandIsRegisteredToAHandler(commandId: string): boolean;
    commandIsRegisteredToHandler(commandId: string, commandHandlerClass: Function): boolean;
    getCallHistory(): CommandInterface[];
    getFirstDispatchedCommand(): CommandInterface | null;
    mockHandlerForCommand(
        commandId: string,
        commandHandlerMock: ServiceResolverInterface<CommandHandlerInterface<any>>
    ): void;
    restore(): void;
}
