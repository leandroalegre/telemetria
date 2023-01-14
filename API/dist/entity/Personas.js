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
exports.Personas = void 0;
var typeorm_1 = require("typeorm");
var Personas = /** @class */ (function () {
    // @Unique(['legajo'])
    function Personas() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Personas.prototype, "id_persona", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 256 }),
        __metadata("design:type", String)
    ], Personas.prototype, "nombre_completo", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 11 }),
        __metadata("design:type", String)
    ], Personas.prototype, "genero", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 256 }),
        __metadata("design:type", String)
    ], Personas.prototype, "dni", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 256 }),
        __metadata("design:type", String)
    ], Personas.prototype, "tipo_dni", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 512 }),
        __metadata("design:type", String)
    ], Personas.prototype, "direccion", void 0);
    __decorate([
        typeorm_1.Column("varchar", { length: 512 }),
        __metadata("design:type", String)
    ], Personas.prototype, "barrio", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Personas.prototype, "oposicion", void 0);
    Personas = __decorate([
        typeorm_1.Entity()
        // @Unique(['legajo'])
    ], Personas);
    return Personas;
}());
exports.Personas = Personas;
//# sourceMappingURL=Personas.js.map