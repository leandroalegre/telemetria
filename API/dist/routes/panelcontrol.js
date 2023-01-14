"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var jwt_1 = require("../middlewares/jwt");
var PanelcontrolController_1 = require("../controller/PanelcontrolController");
var router = express_1.Router();
router.get('/getallpersonas', [jwt_1.checkJwt], PanelcontrolController_1.PanelcontrolController.getAllpersonas);
router.get('/getrolebyidpersona/:id', [jwt_1.checkJwt], PanelcontrolController_1.PanelcontrolController.getRoleByIdPersona);
router.get('/nuevoreferente/:id', [jwt_1.checkJwt], PanelcontrolController_1.PanelcontrolController.nuevoReferente);
router.get('/getallreferentes', [jwt_1.checkJwt], PanelcontrolController_1.PanelcontrolController.getAllreferentes);
router.patch('/quitarreferente/:id', [jwt_1.checkJwt], PanelcontrolController_1.PanelcontrolController.quitarReferente);
router.patch('/referenciarpersona/:dump', [jwt_1.checkJwt], PanelcontrolController_1.PanelcontrolController.referenciarPersona);
router.patch('/nuevofiscal/:id', [jwt_1.checkJwt], PanelcontrolController_1.PanelcontrolController.nuevoFiscal);
router.patch('/nuevaoposicion/:id', [jwt_1.checkJwt], PanelcontrolController_1.PanelcontrolController.nuevaOposicion);
exports.default = router;
//# sourceMappingURL=panelcontrol.js.map