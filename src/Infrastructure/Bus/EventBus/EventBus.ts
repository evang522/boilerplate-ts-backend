import EventInterface from './EventInterface';
import {
    Container,
    injectable,
} from 'inversify';
import EventHandlerInterface from './EventHandlerInterface';
import EventBusInterface from './EventBusInterface';
import EventBusDispatchException from './Exception/EventBusDispatchException';
import EventBusRegisterException from './Exception/EventBusRegisterException';

@injectable()
class EventBus implements EventBusInterface
{
    private readonly handlerMapping: Map<string, EventHandlerInterface<any>[]> = new Map();

    public constructor(
        private readonly container: Container
    )
    {}

    public registerHandlerToEvent(eventId: string, handlerContainerId: Function): void
    {
        try
        {
            const handler = this.container.get(handlerContainerId);

            const eventHandlers = this.handlerMapping.get(eventId);

            if (eventHandlers)
            {
                eventHandlers.push(handler);
            }
            else
            {
                this.handlerMapping.set(eventId, [ handler ]);
            }
        }
        catch (e)
        {
            throw EventBusRegisterException.forEventId(eventId, e.message);
        }
    }

    public on<TEventType = any>(
        eventId: string,
        handleFunction: (event: TEventType) => void
    ): () => void
    {
        const proxyEventHandlerInterface: EventHandlerInterface<any> = {
            handle: handleFunction,
        };

        if (!this.handlerMapping.get(eventId))
        {
            this.handlerMapping.set(eventId, []);
        }

        this.handlerMapping.get(eventId)!.push(proxyEventHandlerInterface);

        // Return a function to remove the handler as this is necessary for cleanup with React Components.
        return (): void =>
        {
            const handlerList = this.handlerMapping.get(eventId)!;

            const handlerListWithoutCreatedProxyHandler = handlerList.reduce(
                (accumulator: EventHandlerInterface<any>[], handler: EventHandlerInterface<any>) =>
                {
                    if (handler !== proxyEventHandlerInterface)
                    {
                        accumulator.push(handler);
                    }

                    return accumulator;
                }, []);

            this.handlerMapping.set(eventId, handlerListWithoutCreatedProxyHandler);
        };
    }

    public dispatchEvent(event: EventInterface): void
    {
        try
        {
            if (!this.handlerMapping.has(event.getEventId()))
            {
                // If there is no handler registered for the event, don't do anything.
                return;
            }

            this.handlerMapping.get(event.getEventId())!.forEach((handler: EventHandlerInterface<any>) =>
            {
                handler.handle(event);
            });
        }
        catch (e)
        {
            throw EventBusDispatchException.forEventId(event.getEventId(), e);
        }
    }
}

export default EventBus;
