import { Server } from 'socket.io';
import { printInfo } from './chat';

const express = require('express');
const app = express();
const http = require('http');

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const main = async () => {
  io.on('connection', async (socket) => {
    printInfo({title: 'Connected with', message: socket.id});
    socket.on('cm', (args) => {
      socket.broadcast.emit(args.c, args);
    });
  });

  app.get('/', (req, res) => {
    res.send('<h1>Noperoom server is up</h1>');
  });

  httpServer.listen(process.env.PORT || 3000, () => {
    printInfo({title: 'Server', message: 'Ready'});
  });
}

main();
