"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const api_errors_1 = require("../errors/api-errors");
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    async getList() {
        return await user_repository_1.userRepository.getList();
    }
    async create(dto) {
        return await user_repository_1.userRepository.create(dto);
    }
    async getUser(userId) {
        const user = await user_repository_1.userRepository.getUser(userId);
        if (!user) {
            throw new api_errors_1.ApiError("User not found", 404);
        }
        return user;
    }
    async change(dto, userId) {
        if (!dto.name || dto.name.length < 3) {
            throw new api_errors_1.ApiError("Name is required and should be minimum 3 symbols", 400);
        }
        if (!dto.email || !dto.email.includes("@")) {
            throw new api_errors_1.ApiError("Email is required", 400);
        }
        if (!dto.password || dto.password.length < 8) {
            throw new api_errors_1.ApiError("Password is required and should be minimum 8 symbols", 400);
        }
        const user = await user_repository_1.userRepository.change(dto, userId);
        if (!user) {
            throw new api_errors_1.ApiError("User not found", 404);
        }
        return user;
    }
    async remove(dto) {
        await user_repository_1.userRepository.remove(dto);
    }
}
exports.userService = new UserService();
