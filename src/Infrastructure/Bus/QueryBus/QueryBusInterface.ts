import QueryInterface from './QueryInterface';

export default interface QueryBusInterface {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerHandlerToQuery(queryId: string, handlerContainerId: any): void;

    handle(query: QueryInterface): void;
}
