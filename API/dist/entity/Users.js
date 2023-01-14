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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var bcrypt = __importStar(require("bcryptjs"));
var Users = /** @class */ (function () {
    function Users() {
    }
    Users.prototype.hashPassword = function () {
        var salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    };
    Users.prototype.checkPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Users.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Users.prototype, "id_persona", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.MinLength(6),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Users.prototype, "username", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Users.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Users.prototype, "role", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], Users.prototype, "refreshToken", void 0);
    Users = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique(['username'])
    ], Users);
    return Users;
}());
exports.Users = Users;
//# sourceMappingURL=Users.js.map