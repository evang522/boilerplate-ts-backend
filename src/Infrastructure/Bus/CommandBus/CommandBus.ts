/* eslint-disable @typescript-eslint/no-explicit-any */
import CommandInterface from './CommandInterface';
import { injectable } from 'inversify';
import CommandBusInterface from './CommandBusInterface';
import CommandHandlerInterface from './CommandHandlerInterface';
import CommandBusRegisterException from './Exception/CommandBusRegisterException';
import CommandBusDispatchException from './Exception/CommandBusDispatchException';
import ServiceResolverInterface from '../../../Domain/Common/ServiceResolverInterface';

@injectable()
class CommandBus implements CommandBusInterface
{
    protected readonly handlerMapping: Map<
        string,
        ServiceResolverInterface<CommandHandlerInterface<any>
            > | undefined> = new Map();

    public registerHandlerToCommand(
        commandId: string,
        handlerResolver: ServiceResolverInterface<CommandHandlerInterface<any>>
    ): void
    {
        try
        {
            const commandHandler = this.handlerMapping.get(commandId);

            if (commandHandler)
            {
                throw new Error(
                    `Cannot reassign Command handler to provided ID ${commandId} as it is already assigned.`
                );
            }

            this.handlerMapping.set(commandId, handlerResolver);
        }
        catch (e)
        {
            throw CommandBusRegisterException.forCommandId(commandId, e.message);
        }
    }

    public dispatch<ICommandHandlerReturnValue = void>(command: CommandInterface): ICommandHandlerReturnValue
    {
        try
        {
            if (!this.handlerMapping.has(command.getCommandId()))
            {
                throw new Error('Dispatched a command for which there is no handler registered');
            }

            const handlerResolver = this.handlerMapping.get(command.getCommandId())!;
            const handler = handlerResolver.resolveService();

            return handler.handle(command);
        }
        catch (e)
        {
            console.log(e);
            throw CommandBusDispatchException.forCommandId(command.getCommandId(), e);
        }
    }
}

export default CommandBus;
