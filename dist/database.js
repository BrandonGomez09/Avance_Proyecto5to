"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSensorData = saveSensorData;
exports.getSensorData = getSensorData;
const promise_1 = __importDefault(require("mysql2/promise"));
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Gomezbga09',
    database: 'sensores',
    port: 3306,
});
async function saveSensorData(data) {
    const { humidity, temperature, motor_speed } = data;
    const query = 'INSERT INTO sensores (humidity, temperature, motor_speed) VALUES (?, ?, ?)';
    const values = [humidity, temperature, motor_speed];
    await pool.query(query, values);
}
async function getSensorData() {
    const query = 'SELECT * FROM sensores ORDER BY timestamp DESC LIMIT 100';
    const [rows] = await pool.query(query);
    return rows;
}
