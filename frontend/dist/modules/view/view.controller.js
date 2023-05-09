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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewController = void 0;
const common_1 = require("@nestjs/common");
const view_service_1 = require("./view.service");
let ViewController = class ViewController {
    constructor(viewService) {
        this.viewService = viewService;
    }
    static(req, res) {
        const handle = this.viewService.getNextServer().getRequestHandler();
        handle(req, res);
    }
    async api_todos(req, res) {
        const todos = await this.viewService.getTodos(req);
        res.json(todos);
    }
    async assets(req, res) {
        await this.viewService.handler(req, res);
    }
    async favicon(req, res) {
        await this.viewService.handler(req, res);
    }
};
__decorate([
    (0, common_1.Get)('todos'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ViewController.prototype, "static", null);
__decorate([
    (0, common_1.Get)('api/todos'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ViewController.prototype, "api_todos", null);
__decorate([
    (0, common_1.Get)('_next*'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ViewController.prototype, "assets", null);
__decorate([
    (0, common_1.Get)('favicon.ico'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ViewController.prototype, "favicon", null);
ViewController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [view_service_1.ViewService])
], ViewController);
exports.ViewController = ViewController;
//# sourceMappingURL=view.controller.js.map