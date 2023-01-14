"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relaciones_voto = void 0;
var typeorm_1 = require("typeorm");
var Relaciones_voto = /** @class */ (function () {
    // @Unique(['legajo'])
    function Relaciones_voto() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Relaciones_voto.prototype, "id_relacion_voto", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Relaciones_voto.prototype, "id_persona", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Relaciones_voto.prototype, "id_colegio", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Relaciones_voto.prototype, "estado_voto", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Relaciones_voto.prototype, "fecha_hora", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Relaciones_voto.prototype, "id_user", void 0);
    Relaciones_voto = __decorate([
        typeorm_1.Entity()
        // @Unique(['legajo'])
    ], Relaciones_voto);
    return Relaciones_voto;
}());
exports.Relaciones_voto = Relaciones_voto;
//# sourceMappingURL=Relaciones_voto.js.map