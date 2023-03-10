"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Users_1 = require("../entity/Users");
var jwt = __importStar(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var class_validator_1 = require("class-validator");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, username, password, manager, userRepository, user, e_1, token, refreshToken, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, username = _a.username, password = _a.password;
                    manager = typeorm_1.getManager();
                    if (!(username)) {
                        return [2 /*return*/, res.status(200).json({ message: 'incorrecto' })];
                    }
                    userRepository = typeorm_1.getRepository(Users_1.Users);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail({ where: { username: username } })];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    return [2 /*return*/, res.status(200).json({ message: 'incorrecto' })];
                case 4:
                    if (user.role == "sin rol") {
                        return [2 /*return*/, res.status(200).json({ message: 'sin rol' })];
                    }
                    if (user.password === "") {
                        return [2 /*return*/, res.status(200).json({ message: 'blanco', username: user.username, id: user.id })];
                    }
                    //Check password
                    if (!user.checkPassword(password)) {
                        return [2 /*return*/, res.status(200).json({ message: 'incorrecto' })];
                    }
                    token = jwt.sign({ userId: user.id, username: user.username }, config_1.default.jwtSecret, { expiresIn: '3h' });
                    refreshToken = jwt.sign({ userId: user.id, username: user.username }, config_1.default.jwtSecretRefresh, { expiresIn: '86400' });
                    user.refreshToken = refreshToken;
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, userRepository.save(user)];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _b.sent();
                    return [2 /*return*/, res.status(400).json({ message: 'mal' })];
                case 8:
                    res.json({ message: 'OK', token: token, refreshToken: refreshToken, userId: user.id, role: user.role, username: user.username, id_persona: user.id_persona });
                    return [2 /*return*/];
            }
        });
    }); };
    AuthController.changePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, _a, oldPassword, newPassword, userRepository, user, e_2, validationOps, errors;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                    if (!(oldPassword && newPassword)) {
                        res.status(400).json({ message: 'Old password & new password are required' });
                    }
                    userRepository = typeorm_1.getRepository(Users_1.Users);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(userId)];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    res.status(400).json({ message: 'Somenthing goes wrong!' });
                    return [3 /*break*/, 4];
                case 4:
                    if (!user.checkPassword(oldPassword)) {
                        return [2 /*return*/, res.status(401).json({ message: 'Check your old Password' })];
                    }
                    user.password = newPassword;
                    validationOps = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(user, validationOps)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    // Hash password
                    user.hashPassword();
                    userRepository.save(user);
                    res.json({ message: 'Password change!' });
                    return [2 /*return*/];
            }
        });
    }); };
    AuthController.nwpass = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, password, id, userRepository, user, e_3, validationOps, errors;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, password = _a.password, id = _a.id;
                    if (!(password)) {
                        res.status(400).json({ message: 'Debe completar los campos' });
                    }
                    userRepository = typeorm_1.getRepository(Users_1.Users);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _b.sent();
                    return [3 /*break*/, 4];
                case 4:
                    user.password = password;
                    validationOps = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(user, validationOps)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        //return res.status(400).json(errors);
                    }
                    // Hash password
                    user.hashPassword();
                    userRepository.save(user);
                    res.status(200).json({ message: 'exito' });
                    return [2 /*return*/];
            }
        });
    }); };
    AuthController.refreshToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var refreshToken, userRepository, user, verifyResult, username, error_2, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    refreshToken = req.headers.refresh;
                    if (!(refreshToken)) {
                        res.status(400).json({ message: 'mal' });
                    }
                    userRepository = typeorm_1.getRepository(Users_1.Users);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    verifyResult = jwt.verify(refreshToken, config_1.default.jwtSecretRefresh);
                    username = verifyResult.username;
                    return [4 /*yield*/, userRepository.findOneOrFail({ where: { username: username } })];
                case 2:
                    user = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    res.status(400).json({ message: error_2 });
                    return [3 /*break*/, 4];
                case 4:
                    token = jwt.sign({ userId: user.id, username: user.username }, config_1.default.jwtSecret, { expiresIn: '120' });
                    res.json({ message: 'OK', token: token });
                    return [2 /*return*/];
            }
        });
    }); };
    return AuthController;
}());
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map