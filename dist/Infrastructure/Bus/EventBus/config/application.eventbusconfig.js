"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceLayerLoaded_1 = __importDefault(require("../../../../Application/Boot/Event/ServiceLayerLoaded/ServiceLayerLoaded"));
var ServiceLayerLoadedHandler_1 = __importDefault(require("../../../../Application/Boot/Event/ServiceLayerLoaded/ServiceLayerLoadedHandler"));
var applicationEventBusHandlersConfig = [
    {
        eventId: ServiceLayerLoaded_1.default.EVENT_ID,
        handlerClass: ServiceLayerLoadedHandler_1.default,
    },
];
exports.default = applicationEventBusHandlersConfig;
