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
var CommandBus_1 = __importDefault(require("../CommandBus"));
var TestableCommandBus = /** @class */ (function (_super) {
    __extends(TestableCommandBus, _super);
    function TestableCommandBus() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mockedCommandRecords = [];
        _this.callHistory = [];
        return _this;
    }
    TestableCommandBus.prototype.commandIsRegisteredToHandler = function (commandId, commandHandlerClass) {
        var commandHandlerResolver = this.handlerMapping.get(commandId);
        if (!commandHandlerResolver) {
            return false;
        }
        return (commandHandlerResolver.resolveService() instanceof commandHandlerClass);
    };
    TestableCommandBus.prototype.dispatch = function (command) {
        this.callHistory.push(command);
        return _super.prototype.dispatch.call(this, command);
    };
    TestableCommandBus.prototype.commandIsRegisteredToAHandler = function (commandId) {
        var commandHandler = this.handlerMapping.get(commandId);
        return Boolean(commandHandler);
    };
    TestableCommandBus.prototype.mockHandlerForCommand = function (commandId, commandHandlerMock) {
        this.mockedCommandRecords.push({
            commandId: commandId,
            commandHandlerMock: commandHandlerMock,
            previousHandler: this.handlerMapping.get(commandId),
        });
        this.handlerMapping.set(commandId, commandHandlerMock);
    };
    TestableCommandBus.prototype.getCallHistory = function () {
        return this.callHistory;
    };
    TestableCommandBus.prototype.getFirstDispatchedCommand = function () {
        return this.getCallHistory()[0] || null;
    };
    TestableCommandBus.prototype.restore = function () {
        var _this = this;
        this.mockedCommandRecords.forEach(function (record) {
            _this.handlerMapping.set(record.commandId, record.previousHandler);
        });
        this.mockedCommandRecords = [];
        this.callHistory = [];
    };
    return TestableCommandBus;
}(CommandBus_1.default));
exports.default = TestableCommandBus;
