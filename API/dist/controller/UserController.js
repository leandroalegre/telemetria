"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var Users_1 = require("./../entity/Users");
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); };
    UserController.getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, userRepository, user, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    userRepository = typeorm_1.getRepository(Users_1.Users);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    user = _a.sent();
                    res.send(user);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    res.status(404).json({ message: 'Not result' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    UserController.new = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); };
    UserController.buscarExistente = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var dni, userRepository, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dni = req.params.dni;
                    userRepository = typeorm_1.getRepository(Users_1.Users);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail({ where: { username: dni } })];
                case 2:
                    _a.sent();
                    res.send(true);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    res.send(false);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    UserController.getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, usuarios;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    return [4 /*yield*/, manager.query("SELECT u.*, p.nombre_completo FROM users u, personas p where p.id_persona=u.id_persona")];
                case 1:
                    usuarios = _a.sent();
                    if (usuarios.length > 0) {
                        res.send(usuarios);
                    }
                    else {
                        res.status(404).json({ message: 'No se encontraron resultados' });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    UserController.edit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, id, _a, username, role, userRepository, e_2, validationOpt, errors, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _a = req.body, username = _a.username, role = _a.role;
                    userRepository = typeorm_1.getRepository(Users_1.Users);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(id)];
                case 2:
                    user = _b.sent();
                    user.username = username;
                    user.role = role;
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                case 4:
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(user, validationOpt)];
                case 5:
                    errors = _b.sent();
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, userRepository.save(user)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_3 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'Username already in use' })];
                case 9:
                    res.status(200).json({ message: 'actualizado' });
                    return [2 /*return*/];
            }
        });
    }); };
    UserController.blanquear = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, password, userRepository, user, validationOpt, errors, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    password = req.body.password;
                    userRepository = typeorm_1.getRepository(Users_1.Users);
                    return [4 /*yield*/, userRepository.findOneOrFail({ where: { id: id } })];
                case 1:
                    user = _a.sent();
                    if (!(user.password == '')) return [3 /*break*/, 2];
                    res.status(200).json({ message: 'vacia' });
                    return [3 /*break*/, 8];
                case 2:
                    user.password = password;
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(user, validationOpt)];
                case 3:
                    errors = _a.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, userRepository.save(user)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    e_4 = _a.sent();
                    return [2 /*return*/, res.status(401).json({ message: 'error' })];
                case 7:
                    res.status(200).json({ message: 'actualizado' });
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    }); };
    return UserController;
}());
exports.UserController = UserController;
exports.default = UserController;
//# sourceMappingURL=UserController.js.map