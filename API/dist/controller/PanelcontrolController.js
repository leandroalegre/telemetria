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
exports.PanelcontrolController = void 0;
var Users_1 = require("./../entity/Users");
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var PanelcontrolController = /** @class */ (function () {
    function PanelcontrolController() {
    }
    PanelcontrolController.getAllpersonas = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    return [4 /*yield*/, manager.query("\n      SELECT p.nombre_completo, p.id_persona FROM personas p\n    ")];
                case 1:
                    query = _a.sent();
                    if (query.length > 0) {
                        res.send(query);
                    }
                    else {
                        res.status(404).json({ message: 'No se encontraron resultados' });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    PanelcontrolController.getAllreferentes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    return [4 /*yield*/, manager.query("\n      SELECT p.* FROM personas p, users u WHERE p.id_persona = u.id_persona AND u.role = 'referente'\n    ")];
                case 1:
                    query = _a.sent();
                    if (query.length > 0) {
                        res.send(query);
                    }
                    else {
                        res.status(404).json({ message: 'No se encontraron resultados' });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    PanelcontrolController.getRoleByIdPersona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, id, query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    id = req.params.id;
                    return [4 /*yield*/, manager.query("\n      SELECT u.role FROM users u WHERE u.id_persona = ?\n    ", [id])];
                case 1:
                    query = _a.sent();
                    if (query.length > 0) {
                        res.send(query);
                    }
                    else {
                        res.send(false);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    PanelcontrolController.nuevoReferente = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, id, query, query2, query3, us, validationOpt, errors, userRepository, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    id = req.params.id;
                    return [4 /*yield*/, manager.query("\n      SELECT u.* FROM users u WHERE u.id_persona = ?\n    ", [id])];
                case 1:
                    query = _a.sent();
                    if (!(query.length > 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, manager.query("\n      UPDATE users u SET u.role = 'referente' WHERE u.id_persona = ?\n      ", [id])];
                case 2:
                    query2 = _a.sent();
                    res.send(true);
                    return [3 /*break*/, 9];
                case 3: return [4 /*yield*/, manager.query("\n      SELECT p.* FROM personas p WHERE p.id_persona = ?\n      ", [id])];
                case 4:
                    query3 = _a.sent();
                    us = new Users_1.Users();
                    us.id_persona = query3[0].id_persona;
                    us.username = query3[0].dni;
                    us.password = '';
                    us.role = 'referente';
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(us, validationOpt)];
                case 5:
                    errors = _a.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    userRepository = typeorm_1.getRepository(Users_1.Users);
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, userRepository.save(us)];
                case 7:
                    _a.sent();
                    return [2 /*return*/, res.status(200).json({ message: 'Usuario cargado' })];
                case 8:
                    e_1 = _a.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'Algo mal que no esta bien' })];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    PanelcontrolController.quitarReferente = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, id, query2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    id = req.params.id;
                    return [4 /*yield*/, manager.query("\n      UPDATE users u SET u.role = 'sin rol' WHERE u.id_persona = ?\n      ", [id])];
                case 1:
                    query2 = _a.sent();
                    res.send(true);
                    return [2 /*return*/];
            }
        });
    }); };
    PanelcontrolController.referenciarPersona = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, _a, id_persona, id_persona_referente, query, query2, oldref;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    _a = req.body, id_persona = _a.id_persona, id_persona_referente = _a.id_persona_referente;
                    return [4 /*yield*/, manager.query("\n      SELECT rf.* FROM relaciones_referente rf WHERE rf.id_persona = ?\n    ", [id_persona])];
                case 1:
                    query2 = _b.sent();
                    oldref = query2[0].id_persona_referente;
                    return [4 /*yield*/, manager.query("\n      UPDATE relaciones_referente rf SET rf.id_persona_referente = ? WHERE rf.id_persona = ?\n    ", [id_persona_referente, id_persona])];
                case 2:
                    query = _b.sent();
                    if (oldref == 0) {
                        res.send(true);
                    }
                    else {
                        res.send(false);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    PanelcontrolController.nuevoFiscal = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, id, role, query, query2, query3, us, validationOpt, errors, userRepository, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    id = req.params.id;
                    role = req.body.role;
                    return [4 /*yield*/, manager.query("\n      SELECT u.* FROM users u WHERE u.id_persona = ?\n    ", [id])];
                case 1:
                    query = _a.sent();
                    if (!(query.length > 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, manager.query("\n      UPDATE users u SET u.role = ? WHERE u.id_persona = ?\n      ", [role, id])];
                case 2:
                    query2 = _a.sent();
                    res.send(true);
                    return [3 /*break*/, 9];
                case 3: return [4 /*yield*/, manager.query("\n      SELECT p.* FROM personas p WHERE p.id_persona = ?\n      ", [id])];
                case 4:
                    query3 = _a.sent();
                    us = new Users_1.Users();
                    us.id_persona = query3[0].id_persona;
                    us.username = query3[0].dni;
                    us.password = '';
                    us.role = role;
                    validationOpt = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(us, validationOpt)];
                case 5:
                    errors = _a.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    userRepository = typeorm_1.getRepository(Users_1.Users);
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, userRepository.save(us)];
                case 7:
                    _a.sent();
                    return [2 /*return*/, res.status(200).json({ message: 'Usuario cargado' })];
                case 8:
                    e_2 = _a.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'Algo mal que no esta bien' })];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    PanelcontrolController.nuevaOposicion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, id, oposicion, query, query2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    id = req.params.id;
                    oposicion = req.body.oposicion;
                    if (!(oposicion == 1)) return [3 /*break*/, 5];
                    return [4 /*yield*/, manager.query("\n        SELECT p.* FROM personas p WHERE p.id_persona = ? AND p.oposicion = 1\n      ", [id])];
                case 1:
                    query = _a.sent();
                    if (!(query.length > 0)) return [3 /*break*/, 2];
                    res.send(false);
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, manager.query("\n        UPDATE personas p SET p.oposicion = ? WHERE p.id_persona = ?\n        ", [oposicion, id])];
                case 3:
                    query2 = _a.sent();
                    res.send(true);
                    _a.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5:
                    if (!(oposicion == 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, manager.query("\n        UPDATE personas p SET p.oposicion = ? WHERE p.id_persona = ?\n        ", [oposicion, id])];
                case 6:
                    query2 = _a.sent();
                    res.send(true);
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return PanelcontrolController;
}());
exports.PanelcontrolController = PanelcontrolController;
//# sourceMappingURL=PanelcontrolController.js.map