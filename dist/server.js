"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const ws_1 = require("ws");
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const server = (0, http_1.createServer)(app);
const wss = new ws_1.Server({ server });
//Rutas
app.get('/data', async (req, res) => {
    try {
        const data = await (0, database_1.getSensorData)();
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// WebSocket
wss.on('connection', (ws) => {
    console.log('WebSocket connected');
    ws.send(JSON.stringify({ message: 'WebSocket connected' }));
    ws.on('message', (message) => {
        console.log(`Received message from client: ${message}`);
    });
});
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
