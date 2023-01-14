"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = __importDefault(require("../controller/UserController"));
var jwt_1 = require("../middlewares/jwt");
var router = express_1.Router();
router.get('/getUsers', [jwt_1.checkJwt], UserController_1.default.getUsers);
router.patch('/blanquear/:id', [jwt_1.checkJwt], UserController_1.default.blanquear);
exports.default = router;
//# sourceMappingURL=user.js.map