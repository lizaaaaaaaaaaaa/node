"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const api_errors_1 = require("../errors/api-errors");
const fs_service_1 = require("../services/fs.service");
class UserRepository {
    async getList() {
        return await (0, fs_service_1.read)();
    }
    async create(dto) {
        const users = await (0, fs_service_1.read)();
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name: dto.name,
            email: dto.email,
            password: dto.password,
        };
        users.push(newUser);
        await (0, fs_service_1.write)(users);
        return users;
    }
    async getUser(userId) {
        const users = await (0, fs_service_1.read)();
        return users.find((user) => user.id === Number(userId));
    }
    async change(dto, userId) {
        const users = await (0, fs_service_1.read)();
        const index = users.findIndex((user) => user.id === Number(userId));
        if (index === -1) {
            throw new api_errors_1.ApiError("User not found", 404);
        }
        const user = users[index];
        user.name = dto.name;
        user.email = dto.email;
        user.password = dto.password;
        await (0, fs_service_1.write)(users);
        return user;
    }
    async remove(dto) {
        const users = await (0, fs_service_1.read)();
        const index = users.findIndex((user) => user.id === Number(dto.userId));
        if (index === -1) {
            throw new api_errors_1.ApiError("User not found", 404);
        }
        users.splice(index, 1);
        await (0, fs_service_1.write)(users);
    }
}
exports.userRepository = new UserRepository();
