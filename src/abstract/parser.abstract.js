"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
var Parser = /** @class */ (function () {
    function Parser(options) {
        this.baseUrl = options.baseUrl;
        this.timeout = options.timeout;
        this.timeDelay = options.timeDelay;
        this.cities = options.cities;
    }
    return Parser;
}());
exports.Parser = Parser;
