import TestableQueryBus from './TestableQueryBus';
import ServiceId from '../../../DependencyInjection/ServiceId';
import container from '../../../DependencyInjection/Container/instance';
import QueryInterface from '../QueryInterface';
import QueryHandlerInterface from '../QueryHandlerInterface';
import BusInstanceServiceResolver from '../../ServiceResolver/BusInstanceServiceResolver';

describe('Provides Testing Utilities for the query Bus', () =>
{
    it('query Is Registered to handler Assertion', () =>
    {
        const queryBus = container.get<TestableQueryBus>(ServiceId.QueryBusInterface);

        const query: QueryInterface = {

            getQueryId(): string
            {
                return 'querybus.test.testable';
            },
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        class TempHandlerClass implements QueryHandlerInterface<any>
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handle(): any
            {
                //
            }
        }

        queryBus.mockHandlerForQuery(query.getQueryId(), new BusInstanceServiceResolver(new TempHandlerClass()));

        expect(queryBus.queryIsRegisteredToHandler(query.getQueryId(), TempHandlerClass)).toBe(true);
    });

    it('query Is Registered At all', () =>
    {
        const queryBus = container.get<TestableQueryBus>(ServiceId.QueryBusInterface);

        const query: QueryInterface = {

            getQueryId(): string
            {
                return 'querybus.test.testable';
            },
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        class TempHandlerClass implements QueryHandlerInterface<any>
        {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            handle(): any
            {
                //
            }
        }

        queryBus.mockHandlerForQuery(query.getQueryId(), new BusInstanceServiceResolver(new TempHandlerClass()));

        expect(queryBus.queryIsRegisteredToAHandler(query.getQueryId())).toBe(true);
    });

    // it('Mocks a Handler for a specified query ID', () =>
    // {
    //     const queryBus = container.get<TestableQueryBus>(ServiceId.QueryBusInterface);
    //
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     class TempHandlerClass implements QueryHandlerInterface<any>
    //     {
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         handle(): any
    //         {
    //             //
    //         }
    //     }
    //
    //     const query = new GetCheckoutModelFromCart(UuidLoader.forIdentifier(1), 'de');
    //     queryBus.mockHandlerForQuery(query.getQueryId(), new BusInstanceServiceResolver(new TempHandlerClass()));
    //
    //     expect(queryBus.queryIsRegisteredToHandler(query.getQueryId(), TempHandlerClass)).toBe(true);
    // });

    // it('Cleans up Mock query mappings With Restore Method', () =>
    // {
    //     const queryBus = container.get<TestableQueryBus>(ServiceId.QueryBusInterface);
    //
    //     const query: QueryInterface = {
    //
    //         getQueryId(): string
    //         {
    //             return 'querybus.test.testable';
    //         },
    //     };
    //
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     class TempHandlerClass implements QueryHandlerInterface<any>
    //     {
    //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         handle(): any
    //         {
    //             //
    //         }
    //     }
    //
    //     container.bind(TempHandlerClass).toConstantValue(new TempHandlerClass());
    //
    //     queryBus.registerHandlerToQuery(query.getQueryId(), new BusContainerIdServiceResolver(TempHandlerClass));
    //     queryBus.mockHandlerForQuery(
    //         query.getQueryId(),
    //         new BusInstanceServiceResolver(new GetCheckoutModelFromCartHandler())
    //     );
    //
    //     expect(queryBus.queryIsRegisteredToHandler(query.getQueryId(), GetCheckoutModelFromCartHandler));
    //
    //     // Restore all mocked querys to their original state.
    //     queryBus.restore();
    //
    //     expect(queryBus.queryIsRegisteredToHandler(query.getQueryId(), TempHandlerClass));
    //     expect(queryBus['mockedQueryHandlerRecords'].length).toBe(0);
    // });
});
