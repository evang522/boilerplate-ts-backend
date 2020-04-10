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
var ExtendableError_1 = __importDefault(require("../../../../Domain/Common/Exception/ExtendableError"));
var EventBusRegisterException = /** @class */ (function (_super) {
    __extends(EventBusRegisterException, _super);
    function EventBusRegisterException(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        return _this;
    }
    EventBusRegisterException.forEventId = function (eventId, additionalDetails) {
        return new this(
        // eslint-disable-next-line max-len
        "Registering Event with Id: \"" + eventId + "\" to handler failed. " + (additionalDetails ? ': ' + additionalDetails : ''));
    };
    return EventBusRegisterException;
}(ExtendableError_1.default));
exports.default = EventBusRegisterException;
