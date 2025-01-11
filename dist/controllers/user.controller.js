"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    async getList(_, res, next) {
        try {
            const result = await user_service_1.userService.getList();
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const dto = req.body;
            const result = await user_service_1.userService.create(dto);
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getUser(req, res, next) {
        try {
            const userId = req.params.userId;
            const result = await user_service_1.userService.getUser(userId);
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async change(req, res, next) {
        try {
            const dto = req.body;
            const userId = req.params.userId;
            const user = await user_service_1.userService.change(dto, userId);
            res.status(201).json(user);
        }
        catch (e) {
            next(e);
        }
    }
    async remove(req, res, next) {
        try {
            const dto = req.body;
            await user_service_1.userService.remove(dto);
            res.status(201).json("delete!");
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
