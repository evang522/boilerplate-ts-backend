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
var CommandBusRegisterException = /** @class */ (function (_super) {
    __extends(CommandBusRegisterException, _super);
    function CommandBusRegisterException(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        return _this;
    }
    CommandBusRegisterException.forCommandId = function (commandId, additionalDetails) {
        return new this(
        // eslint-disable-next-line max-len
        "Registering Command with Id: \"" + commandId + "\" to handler failed. " + (additionalDetails ? ': ' + additionalDetails : ''));
    };
    return CommandBusRegisterException;
}(ExtendableError_1.default));
exports.default = CommandBusRegisterException;
