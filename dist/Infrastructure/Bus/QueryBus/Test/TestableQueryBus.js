"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var QueryBus_1 = __importDefault(require("../QueryBus"));
var TestableQueryBus = /** @class */ (function (_super) {
    __extends(TestableQueryBus, _super);
    function TestableQueryBus() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mockedQueryHandlerRecords = [];
        _this.callHistory = [];
        return _this;
    }
    TestableQueryBus.prototype.queryIsRegisteredToHandler = function (queryId, queryHandlerClass) {
        var queryHandlerResolver = this.handlerMapping.get(queryId);
        if (!queryHandlerResolver) {
            return false;
        }
        return (queryHandlerResolver.resolveService() instanceof queryHandlerClass);
    };
    TestableQueryBus.prototype.handle = function (query) {
        this.callHistory.push(query);
        return _super.prototype.handle.call(this, query);
    };
    TestableQueryBus.prototype.queryIsRegisteredToAHandler = function (queryId) {
        var queryHandler = this.handlerMapping.get(queryId);
        return Boolean(queryHandler);
    };
    TestableQueryBus.prototype.mockHandlerForQuery = function (queryId, queryHandlerMock) {
        this.mockedQueryHandlerRecords.push({
            queryId: queryId,
            queryHandlerMock: queryHandlerMock,
            previousHandler: this.handlerMapping.get(queryId),
        });
        this.handlerMapping.set(queryId, queryHandlerMock);
    };
    TestableQueryBus.prototype.getCallHistory = function () {
        return this.callHistory;
    };
    TestableQueryBus.prototype.restore = function () {
        var _this = this;
        this.mockedQueryHandlerRecords.forEach(function (record) {
            _this.handlerMapping.set(record.queryId, record.previousHandler);
        });
        this.mockedQueryHandlerRecords = [];
        this.callHistory = [];
    };
    return TestableQueryBus;
}(QueryBus_1.default));
exports.default = TestableQueryBus;
