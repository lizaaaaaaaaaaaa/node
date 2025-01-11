"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = exports.read = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const pathToFile = node_path_1.default.resolve(process.cwd(), "db", "users.json");
const read = async () => {
    try {
        const json = await promises_1.default.readFile(pathToFile, "utf-8");
        return json ? JSON.parse(json) : [];
    }
    catch (error) {
        console.log("Error:", error.message);
        return [];
    }
};
exports.read = read;
const write = async (users) => {
    try {
        await promises_1.default.writeFile(pathToFile, JSON.stringify(users, null, 2));
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.write = write;
