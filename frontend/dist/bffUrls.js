"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scheme = 'http';
const host = 'localhost';
const port = 7071;
const baseUrl = `${scheme}://${host}:${port}/api`;
exports.default = {
    todos: `${baseUrl}/todos`,
};
//# sourceMappingURL=bffUrls.js.map