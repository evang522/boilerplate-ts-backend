import diContainer from '../../DependencyInjection/Container/instance';
import EventBus from './EventBus';
import EventBusConfigInterface from './config/EventBusConfigInterface';
import eventBusConfig from './config';
import EventInterface from './EventInterface';
import EventHandlerInterface from './EventHandlerInterface';

describe('Assembled Correctly', () =>
{
    it('For Each Command id in the config, there is an instance established in the container', () =>
    {
        const bus = diContainer.get<EventBus>(EventBus);

        eventBusConfig.forEach((configObj: EventBusConfigInterface) =>
        {
            expect(bus['handlerMapping'].has(configObj.eventId));
        });
    });
});

describe('Registers and Dispatches Commands Correctly', () =>
{
    it('In the case of properly setup config, dispatches event correctly', () =>
    {
        const bus = diContainer.get<EventBus>(EventBus);
        const spyFunction = jest.fn();
        const testEvent: EventInterface = {
            getEventId: () =>
            {
                return 'event.test.id';
            },
        };

        const eventHandler: EventHandlerInterface<typeof testEvent> = {
            handle(command: typeof testEvent): void
            {
                spyFunction(command.getEventId());
            },
        };

        diContainer.bind('testEventHandler').toConstantValue(eventHandler);

        // @ts-ignore
        bus.registerHandlerToEvent(testEvent.getEventId(), 'testEventHandler');

        bus.dispatchEvent(testEvent);

        expect(spyFunction.mock.calls.length).toBe(1);
    });

    it('In the case of the Handler not being registered in container, throws an Error on register', () =>
    {
        diContainer.rebind(EventBus).toConstantValue(new EventBus(diContainer));
        const bus = diContainer.get<EventBus>(EventBus);

        const testEvent: EventInterface = {
            getEventId: () =>
            {
                return 'event.test.id';
            },
        };

        expect(() =>
        {
            // @ts-ignore
            bus.registerHandlerToEvent(testEvent.getEventId(), 'testEventHandler1');
        }).toThrow('No matching bindings found for serviceIdentifier: testEventHandler1');
    });
});

