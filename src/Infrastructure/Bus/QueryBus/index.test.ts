import container from '../../DependencyInjection/Container/instance';
import QueryBus from './QueryBus';
import QueryBusConfigInterface from './config/QueryBusConfigInterface';
import QueryInterface from './QueryInterface';
import QueryHandlerInterface from './QueryHandlerInterface';
import BusContainerIdServiceResolver from '../ServiceResolver/BusContainerIdServiceResolver';
import queryBusConfig from './config/';

describe('Assembled Correctly', () =>
{
    it('For Each Query id in the config, there is a handler established in the container', () =>
    {
        const bus = container.get<QueryBus>(QueryBus);

        queryBusConfig.forEach((configObj: QueryBusConfigInterface) =>
        {
            expect(bus['handlerMapping'].has(configObj.queryId));
        });
    });
});

describe('Registers and Dispatches Querys Correctly', () =>
{
    it('In the case of properly setup config, dispatches query correctly', () =>
    {
        const bus = container.get<QueryBus>(QueryBus);

        const testQuery: QueryInterface = {
            getQueryId: () =>
            {
                return 'query.test.id';
            },
        };

        const queryHandler: QueryHandlerInterface<typeof testQuery> = {
            handle(query: typeof testQuery): any
            {
                return query.getQueryId();
            },
        };

        container.bind('testQueryHandler').toConstantValue(queryHandler);

        // @ts-ignore
        bus.registerHandlerToQuery(testQuery.getQueryId(), new BusContainerIdServiceResolver('testQueryHandler'));

        expect(bus.handle<string>(testQuery)).toBe(testQuery.getQueryId());
    });

    it('In the case of Improperly setup config (Handler not Registered), throws an Error on Dispatch', () =>
    {
        container.rebind(QueryBus).toConstantValue(new QueryBus());
        const bus = container.get<QueryBus>(QueryBus);

        const testQuery: QueryInterface = {
            getQueryId: () =>
            {
                return 'query.test.id';
            },
        };

        expect(() =>
        {
            bus.handle(testQuery);
        }).toThrow('Dispatching Query with Id: "query.test.id" failed. : Dispatched a query for which there is no handler registered');
    });

    it('In the case of Improperly setup config (Handler Already Registered), throws an Error on Register', () =>
    {
        container.rebind(QueryBus).toConstantValue(new QueryBus());
        const bus = container.get<QueryBus>(QueryBus);

        const testQuery: QueryInterface = {
            getQueryId: () =>
            {
                return 'query.test.id';
            },
        };

        const queryHandler: QueryHandlerInterface<typeof testQuery> = {
            handle(query: typeof testQuery): any
            {
                return query.getQueryId();
            },
        };

        container.bind('testQueryHandler').toConstantValue(queryHandler);

        // @ts-ignore
        bus.registerHandlerToQuery(testQuery.getQueryId(), new BusContainerIdServiceResolver('testQueryHandler'));
        expect(() =>
        {
        // @ts-ignore
            bus.registerHandlerToQuery(testQuery.getQueryId(), 'testQueryHandler');
        }).toThrow(
            // eslint-disable-next-line max-len
            'Registering Query with Id: "query.test.id" to handler failed. : Cannot reassign Query handler to provided ID query.test.id as it is already assigned.'
        );

        bus.handle(testQuery);
    });
});
