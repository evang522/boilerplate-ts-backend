"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UpdateContainer_1 = __importDefault(require("../../../Domain/Container/Command/UpdateContainer/UpdateContainer"));
var UpdateContainerHandler_1 = __importDefault(require("../../../Domain/Container/Command/UpdateContainer/UpdateContainerHandler"));
var commandBusConfig = [
    {
        commandId: UpdateContainer_1.default.COMMAND_ID,
        handlerClass: UpdateContainerHandler_1.default,
    },
];
exports.default = commandBusConfig;
