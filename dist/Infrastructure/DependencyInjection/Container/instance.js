"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ContainerLoader_1 = __importDefault(require("./ContainerLoader"));
var container = ContainerLoader_1.default.load();
exports.default = container;
