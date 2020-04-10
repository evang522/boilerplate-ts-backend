import QueryInterface from './QueryInterface';
import { injectable } from 'inversify';
import QueryBusInterface from './QueryBusInterface';
import QueryHandlerInterface from './QueryHandlerInterface';
import QueryBusRegisterException from './Exception/QueryBusRegisterException';
import QueryBusDispatchException from './Exception/QueryBusDispatchException';
import ServiceResolverInterface from '../../../Domain/Common/ServiceResolverInterface';

@injectable()
class QueryBus implements QueryBusInterface
{
    // eslint-disable-next-line max-len
    protected readonly handlerMapping: Map<string, ServiceResolverInterface<QueryHandlerInterface<any>> | undefined> = new Map();

    public registerHandlerToQuery(
        queryId: string,
        handlerResolver: ServiceResolverInterface<QueryHandlerInterface<any>>
    ): void
    {
        try
        {
            const queryHandlerResolver = this.handlerMapping.get(queryId);

            if (queryHandlerResolver)
            {
                throw new Error(
                    `Cannot reassign Query handler to provided ID ${queryId} as it is already assigned.`
                );
            }

            this.handlerMapping.set(queryId, handlerResolver);
        }
        catch (e)
        {
            throw QueryBusRegisterException.forQueryId(queryId, e.message);
        }
    }

    public handle<IQueryHandlerReturnValue = any>(query: QueryInterface): IQueryHandlerReturnValue
    {
        try
        {
            if (!this.handlerMapping.has(query.getQueryId()))
            {
                throw new Error('Dispatched a query for which there is no handler registered');
            }

            const handlerResolver = this.handlerMapping.get(query.getQueryId())!;

            return handlerResolver.resolveService().handle(query);
        }
        catch (e)
        {
            throw QueryBusDispatchException.forQueryId(query.getQueryId(), e);
        }
    }
}

export default QueryBus;
