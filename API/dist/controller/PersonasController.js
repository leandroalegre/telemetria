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
exports.PersonasController = void 0;
var typeorm_1 = require("typeorm");
var Personas_1 = require("../entity/Personas");
var Relaciones_voto_1 = require("../entity/Relaciones_voto");
var PersonasController = /** @class */ (function () {
    function PersonasController() {
    }
    PersonasController.findPersonbyDNI = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var dni, personasRepository, persona, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dni = req.params.dni;
                    personasRepository = typeorm_1.getRepository(Personas_1.Personas);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, personasRepository.findOneOrFail({ where: { dni: dni } })];
                case 2:
                    persona = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    res.send(false);
                    return [3 /*break*/, 4];
                case 4:
                    res.send(persona);
                    return [2 /*return*/];
            }
        });
    }); };
    PersonasController.verificarVoto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id_persona, relacionesVotoRepo, voto, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_persona = req.params.id_persona;
                    relacionesVotoRepo = typeorm_1.getRepository(Relaciones_voto_1.Relaciones_voto);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, relacionesVotoRepo.findOneOrFail({ where: { id_persona: id_persona } })];
                case 2:
                    voto = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    res.send(false);
                    return [3 /*break*/, 4];
                case 4:
                    res.send(voto);
                    return [2 /*return*/];
            }
        });
    }); };
    PersonasController.confirmarVoto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, id_persona, userId, relacionesVotoRepo, voto, error_3, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, id_persona = _a.id_persona, userId = _a.userId;
                    relacionesVotoRepo = typeorm_1.getRepository(Relaciones_voto_1.Relaciones_voto);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, relacionesVotoRepo.findOneOrFail({ where: { id_persona: id_persona } })];
                case 2:
                    voto = _b.sent();
                    voto.estado_voto = 1;
                    voto.fecha_hora = new Date().toLocaleString('en-GB', {
                        timeZone: 'America/Argentina/Cordoba'
                    });
                    ;
                    voto.id_user = userId;
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    res.send(false);
                    return [3 /*break*/, 4];
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, relacionesVotoRepo.save(voto)];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_4 = _b.sent();
                    res.send(false);
                    return [3 /*break*/, 7];
                case 7:
                    res.send(true);
                    return [2 /*return*/];
            }
        });
    }); };
    PersonasController.getPersonaYRol = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, manager, personas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.params.userId;
                    manager = typeorm_1.getManager();
                    return [4 /*yield*/, manager.query("SELECT u.role, p.nombre_completo, p.dni FROM users u, personas p where u.id_persona=p.id_persona", [userId])];
                case 1:
                    personas = _a.sent();
                    if (personas.length > 0) {
                        res.send(personas);
                    }
                    else {
                        res.status(404).json({ message: 'No se encontraron resultados' });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    PersonasController.getReferentes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, referentes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    return [4 /*yield*/, manager.query("SELECT p.id_persona,p.nombre_completo, p.dni FROM relaciones_referente rr, personas p where rr.id_persona_referente=p.id_persona group by rr.id_persona_referente")];
                case 1:
                    referentes = _a.sent();
                    if (referentes.length > 0) {
                        res.send(referentes);
                    }
                    else {
                        res.status(404).json({ message: 'No se encontraron resultados' });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    PersonasController.getReferenteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id_persona, manager, referentes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_persona = req.params.id_persona;
                    manager = typeorm_1.getManager();
                    return [4 /*yield*/, manager.query("SELECT p.id_persona,p.nombre_completo, p.dni FROM relaciones_referente rr, personas p where rr.id_persona_referente=p.id_persona and p.id_persona=? group by p.id_persona", [id_persona])];
                case 1:
                    referentes = _a.sent();
                    if (referentes.length > 0) {
                        res.send(referentes);
                    }
                    else {
                        res.status(404).json({ message: 'No se encontraron resultados' });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    PersonasController.getVotoPadron = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, referenciados;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    return [4 /*yield*/, manager.query("SELECT p.nombre_completo, p.dni, rv.estado_voto FROM relaciones_referente rr, personas p, relaciones_voto rv where rr.id_persona=p.id_persona and rv.id_persona=p.id_persona")];
                case 1:
                    referenciados = _a.sent();
                    if (referenciados.length > 0) {
                        res.send(referenciados);
                    }
                    else {
                        res.status(404).json({ message: 'No se encontraron resultados' });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    PersonasController.getVotosByReferentes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id_persona, manager, referentesvotos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_persona = req.params.id_persona;
                    manager = typeorm_1.getManager();
                    return [4 /*yield*/, manager.query("SELECT rr.id_persona_referente, p.nombre_completo, (SELECT COUNT(estado_voto) FROM relaciones_referente rr, relaciones_voto rv where rr.id_persona_referente=? and rr.id_persona=rv.id_persona and rv.estado_voto=1) as votaron, (SELECT COUNT(estado_voto) FROM relaciones_referente rr, relaciones_voto rv where rr.id_persona_referente=? and rr.id_persona=rv.id_persona and rv.estado_voto=0) as novotaron FROM relaciones_referente rr, relaciones_voto rv, personas p where rr.id_persona_referente=? and rr.id_persona=rv.id_persona and rr.id_persona_referente=p.id_persona group by rr.id_persona_referente", [id_persona, id_persona, id_persona])];
                case 1:
                    referentesvotos = _a.sent();
                    if (referentesvotos.length > 0) {
                        res.send(referentesvotos);
                    }
                    else {
                        res.status(404).json({ message: 'No se encontraron resultados' });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    PersonasController.getPersonasByReferente = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id_persona, manager, personas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id_persona = req.params.id_persona;
                    manager = typeorm_1.getManager();
                    return [4 /*yield*/, manager.query("SELECT p.*, rv.estado_voto FROM relaciones_referente rr, personas p, relaciones_voto rv where id_persona_referente=? and p.id_persona=rr.id_persona and p.id_persona=rv.id_persona", [id_persona])];
                case 1:
                    personas = _a.sent();
                    if (personas.length > 0) {
                        res.send(personas);
                    }
                    else {
                        res.status(400).json({ message: 'No se encontraron resultados' });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    PersonasController.getTotalVotos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, votos, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, manager.query("SELECT COUNT(id_relacion_voto) as total, (SELECT COUNT(id_relacion_voto) from relaciones_voto where estado_voto=1) as voto, (SELECT COUNT(id_relacion_voto) from relaciones_voto where estado_voto=0) as novoto FROM relaciones_voto")];
                case 2:
                    votos = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    res.status(400).json({ message: 'No se encontraron resultados.' });
                    return [3 /*break*/, 4];
                case 4:
                    res.send(votos);
                    return [2 /*return*/];
            }
        });
    }); };
    PersonasController.getTotalVotosOposicion = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, votos, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, manager.query("SELECT COUNT(id_relacion_voto) as total, (SELECT COUNT(id_relacion_voto) from relaciones_voto, personas where estado_voto=1 and personas.oposicion=1 and personas.id_persona=relaciones_voto.id_persona) as voto, (SELECT COUNT(id_relacion_voto) from relaciones_voto, personas where estado_voto=0 and personas.oposicion=1 and personas.id_persona=relaciones_voto.id_persona) as novoto FROM relaciones_voto, personas where personas.oposicion=1 and personas.id_persona=relaciones_voto.id_persona")];
                case 2:
                    votos = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    res.status(400).json({ message: 'No se encontraron resultados.' });
                    return [3 /*break*/, 4];
                case 4:
                    res.send(votos);
                    return [2 /*return*/];
            }
        });
    }); };
    PersonasController.getTotalVotosReferentes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var manager, votos, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    manager = typeorm_1.getManager();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, manager.query("SELECT COUNT(id_relacion_voto) as total, (SELECT COUNT(id_relacion_voto) from relaciones_voto, relaciones_referente where estado_voto=1 and relaciones_voto.id_persona=relaciones_referente.id_persona and relaciones_referente.id_persona_referente>0) as voto, (SELECT COUNT(id_relacion_voto) from relaciones_voto, relaciones_referente where estado_voto=0 and relaciones_voto.id_persona=relaciones_referente.id_persona and relaciones_referente.id_persona_referente>0) as novoto FROM relaciones_voto, relaciones_referente where relaciones_voto.id_persona=relaciones_referente.id_persona and relaciones_referente.id_persona_referente>0")];
                case 2:
                    votos = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _a.sent();
                    res.status(400).json({ message: 'No se encontraron resultados.' });
                    return [3 /*break*/, 4];
                case 4:
                    res.send(votos);
                    return [2 /*return*/];
            }
        });
    }); };
    return PersonasController;
}());
exports.PersonasController = PersonasController;
exports.default = PersonasController;
//# sourceMappingURL=PersonasController.js.map