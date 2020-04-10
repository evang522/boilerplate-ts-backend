import CommandInterface from './CommandInterface';
import CommandHandlerInterface from './CommandHandlerInterface';
import ServiceResolverInterface from '../../../Domain/Common/ServiceResolverInterface';

export default interface CommandBusInterface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerHandlerToCommand(
        commandId: string,
        handlerResolver: ServiceResolverInterface<CommandHandlerInterface<any>>
    ): void;

    dispatch(command: CommandInterface): void;
}
