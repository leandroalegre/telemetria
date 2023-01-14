"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("./auth"));
var user_1 = __importDefault(require("./user"));
var panelcontrol_1 = __importDefault(require("./panelcontrol"));
var personas_1 = __importDefault(require("./personas"));
var routes = express_1.Router();
routes.use('/auth', auth_1.default);
routes.use('/users', user_1.default);
routes.use('/panelcontrol', panelcontrol_1.default);
routes.use('/personas', personas_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map