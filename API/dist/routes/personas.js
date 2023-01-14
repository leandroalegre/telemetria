"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_1 = require("./../middlewares/jwt");
var express_1 = require("express");
var PersonasController_1 = __importDefault(require("../controller/PersonasController"));
var router = express_1.Router();
router.get('/findPersonbyDNI/:dni', [jwt_1.checkJwt], PersonasController_1.default.findPersonbyDNI);
router.get('/verificarVoto/:id_persona', [jwt_1.checkJwt], PersonasController_1.default.verificarVoto);
router.get('/confirmarVoto/:id_persona/:userId', [jwt_1.checkJwt], PersonasController_1.default.confirmarVoto);
router.get('/getPersonaYRol/:userId', [jwt_1.checkJwt], PersonasController_1.default.getPersonaYRol);
router.get('/getReferentes', [jwt_1.checkJwt], PersonasController_1.default.getReferentes);
router.get('/getVotosByReferentes/:id_persona', [jwt_1.checkJwt], PersonasController_1.default.getVotosByReferentes);
router.get('/getPersonasByReferente/:id_persona', [jwt_1.checkJwt], PersonasController_1.default.getPersonasByReferente);
router.get('/getTotalVotos', [jwt_1.checkJwt], PersonasController_1.default.getTotalVotos);
router.get('/getTotalVotosOposicion', [jwt_1.checkJwt], PersonasController_1.default.getTotalVotosOposicion);
router.get('/getTotalVotosReferentes', [jwt_1.checkJwt], PersonasController_1.default.getTotalVotosReferentes);
router.get('/getReferenteUser/:id_persona', [jwt_1.checkJwt], PersonasController_1.default.getReferenteUser);
router.get('/getVotoPadron', [jwt_1.checkJwt], PersonasController_1.default.getVotoPadron);
exports.default = router;
//# sourceMappingURL=personas.js.map