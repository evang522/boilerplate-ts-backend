"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceId_1 = __importDefault(require("../../../DependencyInjection/ServiceId"));
var instance_1 = __importDefault(require("../../../DependencyInjection/Container/instance"));
var BusInstanceServiceResolver_1 = __importDefault(require("../../ServiceResolver/BusInstanceServiceResolver"));
describe('Provides Testing Utilities for the query Bus', function () {
    it('query Is Registered to handler Assertion', function () {
        var queryBus = instance_1.default.get(ServiceId_1.default.QueryBusInterface);
        var query = {
            getQueryId: function () {
                return 'querybus.test.testable';
            },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var TempHandlerClass = /** @class */ (function () {
            function TempHandlerClass() {
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            TempHandlerClass.prototype.handle = function () {
                //
            };
            return TempHandlerClass;
        }());
        queryBus.mockHandlerForQuery(query.getQueryId(), new BusInstanceServiceResolver_1.default(new TempHandlerClass()));
        expect(queryBus.queryIsRegisteredToHandler(query.getQueryId(), TempHandlerClass)).toBe(true);
    });
    it('query Is Registered At all', function () {
        var queryBus = instance_1.default.get(ServiceId_1.default.QueryBusInterface);
        var query = {
            getQueryId: function () {
                return 'querybus.test.testable';
            },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var TempHandlerClass = /** @class */ (function () {
            function TempHandlerClass() {
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            TempHandlerClass.prototype.handle = function () {
                //
            };
            return TempHandlerClass;
        }());
        queryBus.mockHandlerForQuery(query.getQueryId(), new BusInstanceServiceResolver_1.default(new TempHandlerClass()));
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
