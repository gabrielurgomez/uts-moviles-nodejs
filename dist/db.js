"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
const pool = (0, promise_1.createPool)({
    host: '127.0.0.1',
    user: 'root',
    password: 'Gabriel.456*',
    port: 3306,
    database: 'movilesuts'
});
exports.pool = pool;
