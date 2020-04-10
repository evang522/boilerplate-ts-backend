export default interface EventHandlerInterface<IEvent> {
    handle(event: IEvent): void;
}
