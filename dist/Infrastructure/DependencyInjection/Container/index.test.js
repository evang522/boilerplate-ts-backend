"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ContainerLoader_1 = __importDefault(require("./ContainerLoader"));
describe('Loads a Container With Specific Settings', function () {
    it('With Default Context of Transient', function () {
        var container = ContainerLoader_1.default.load();
        expect(container.options.defaultScope).toBe('Transient');
    });
    it('With Auto Binding true', function () {
        var container = ContainerLoader_1.default.load();
        expect(container.options.autoBindInjectable).toBe(true);
    });
});
