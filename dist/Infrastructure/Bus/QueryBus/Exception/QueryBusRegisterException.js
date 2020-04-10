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
var QueryBusRegisterException = /** @class */ (function (_super) {
    __extends(QueryBusRegisterException, _super);
    function QueryBusRegisterException(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        return _this;
    }
    QueryBusRegisterException.forQueryId = function (queryId, additionalDetails) {
        return new this(
        // eslint-disable-next-line max-len
        "Registering Query with Id: \"" + queryId + "\" to handler failed. " + (additionalDetails ? ': ' + additionalDetails : ''));
    };
    return QueryBusRegisterException;
}(ExtendableError_1.default));
exports.default = QueryBusRegisterException;
