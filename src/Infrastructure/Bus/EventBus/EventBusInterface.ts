import EventInterface from './EventInterface';

export default interface EventBusInterface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerHandlerToEvent(eventId: string, handlerContainerId: any): void;

    dispatchEvent(event: EventInterface): void;
}
