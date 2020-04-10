"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var instance_1 = __importDefault(require("../../DependencyInjection/Container/instance"));
var QueryBus_1 = __importDefault(require("./QueryBus"));
var BusContainerIdServiceResolver_1 = __importDefault(require("../ServiceResolver/BusContainerIdServiceResolver"));
var config_1 = __importDefault(require("./config/"));
describe('Assembled Correctly', function () {
    it('For Each Query id in the config, there is a handler established in the container', function () {
        var bus = instance_1.default.get(QueryBus_1.default);
        config_1.default.forEach(function (configObj) {
            expect(bus['handlerMapping'].has(configObj.queryId));
        });
    });
});
describe('Registers and Dispatches Querys Correctly', function () {
    it('In the case of properly setup config, dispatches query correctly', function () {
        var bus = instance_1.default.get(QueryBus_1.default);
        var testQuery = {
            getQueryId: function () {
                return 'query.test.id';
            },
        };
        var queryHandler = {
            handle: function (query) {
                return query.getQueryId();
            },
        };
        instance_1.default.bind('testQueryHandler').toConstantValue(queryHandler);
        // @ts-ignore
        bus.registerHandlerToQuery(testQuery.getQueryId(), new BusContainerIdServiceResolver_1.default('testQueryHandler'));
        expect(bus.handle(testQuery)).toBe(testQuery.getQueryId());
    });
    it('In the case of Improperly setup config (Handler not Registered), throws an Error on Dispatch', function () {
        instance_1.default.rebind(QueryBus_1.default).toConstantValue(new QueryBus_1.default());
        var bus = instance_1.default.get(QueryBus_1.default);
        var testQuery = {
            getQueryId: function () {
                return 'query.test.id';
            },
        };
        expect(function () {
            bus.handle(testQuery);
        }).toThrow('Dispatching Query with Id: "query.test.id" failed. : Dispatched a query for which there is no handler registered');
    });
    it('In the case of Improperly setup config (Handler Already Registered), throws an Error on Register', function () {
        instance_1.default.rebind(QueryBus_1.default).toConstantValue(new QueryBus_1.default());
        var bus = instance_1.default.get(QueryBus_1.default);
        var testQuery = {
            getQueryId: function () {
                return 'query.test.id';
            },
        };
        var queryHandler = {
            handle: function (query) {
                return query.getQueryId();
            },
        };
        instance_1.default.bind('testQueryHandler').toConstantValue(queryHandler);
        // @ts-ignore
        bus.registerHandlerToQuery(testQuery.getQueryId(), new BusContainerIdServiceResolver_1.default('testQueryHandler'));
        expect(function () {
            // @ts-ignore
            bus.registerHandlerToQuery(testQuery.getQueryId(), 'testQueryHandler');
        }).toThrow(
        // eslint-disable-next-line max-len
        'Registering Query with Id: "query.test.id" to handler failed. : Cannot reassign Query handler to provided ID query.test.id as it is already assigned.');
        bus.handle(testQuery);
    });
});
