"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = __importDefault(require("../controller/AuthController"));
var router = express_1.Router();
// login
router.post('/login', AuthController_1.default.login);
// Change password
router.post('/change-password', AuthController_1.default.changePassword);
router.post('/refresh-token', AuthController_1.default.refreshToken);
router.patch('/new-password', AuthController_1.default.nwpass);
exports.default = router;
//# sourceMappingURL=auth.js.map