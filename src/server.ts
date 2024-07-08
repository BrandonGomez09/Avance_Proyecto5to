
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server as WebSocketServer } from 'ws';
import { saveSensorData, getSensorData } from './database';

const app = express();
const port = 3000;

app.use(express.json());

const server = createServer(app);
const wss = new WebSocketServer({ server });


//Rutas
app.get('/data', async (req: Request, res: Response) => {
  try {
    const data = await getSensorData();
    res.json(data);
  } catch (err: any) {
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
