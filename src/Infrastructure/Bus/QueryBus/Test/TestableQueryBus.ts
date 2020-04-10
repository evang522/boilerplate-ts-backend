/* eslint-disable @typescript-eslint/no-explicit-any */
import TestableQueryBusInterface from './TestableQueryBusInterface';
import QueryBus from '../QueryBus';
import QueryHandlerInterface from '../QueryHandlerInterface';
import QueryInterface from '../QueryInterface';
import ServiceResolverInterface from '../../../../Domain/Common/ServiceResolverInterface';

class TestableQueryBus extends QueryBus implements TestableQueryBusInterface
{
    private mockedQueryHandlerRecords: IMockedQueryHandlerRecord[] = []
    private callHistory: QueryInterface[] = [];

    public queryIsRegisteredToHandler(
        queryId: string,
        queryHandlerClass: Function
    ): boolean
    {
        const queryHandlerResolver = this.handlerMapping.get(queryId);

        if (!queryHandlerResolver)
        {
            return false;
        }

        return (queryHandlerResolver.resolveService() instanceof queryHandlerClass);
    }

    public handle<IQueryHandlerReturnValue = void>(query: QueryInterface): IQueryHandlerReturnValue
    {
        this.callHistory.push(query);

        return super.handle(query);
    }

    public queryIsRegisteredToAHandler(queryId: string): boolean
    {
        const queryHandler = this.handlerMapping.get(queryId);

        return Boolean(queryHandler);
    }

    public mockHandlerForQuery(
        queryId: string,
        queryHandlerMock: ServiceResolverInterface<QueryHandlerInterface<any>>
    ): void
    {
        this.mockedQueryHandlerRecords.push({
            queryId,
            queryHandlerMock: queryHandlerMock,
            previousHandler: this.handlerMapping.get(queryId),
        });
        this.handlerMapping.set(queryId, queryHandlerMock);
    }

    public getCallHistory(): QueryInterface[]
    {
        return this.callHistory;
    }

    public restore(): void
    {
        this.mockedQueryHandlerRecords.forEach((record: IMockedQueryHandlerRecord) =>
        {
            this.handlerMapping.set(record.queryId, record.previousHandler);
        });

        this.mockedQueryHandlerRecords = [];
        this.callHistory = [];
    }
}

export default TestableQueryBus;

interface IMockedQueryHandlerRecord {
    queryId: string;
    queryHandlerMock: ServiceResolverInterface<QueryHandlerInterface<any>>;
    previousHandler: ServiceResolverInterface<QueryHandlerInterface<any>> | undefined;
}
