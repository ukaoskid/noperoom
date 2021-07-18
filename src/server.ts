import { createServer } from 'http';
import { Server } from 'socket.io';
import { printInfo } from './chat';

const httpServer = createServer();
const io = new Server(httpServer);

const main = async () => {
  io.on('connection', async (socket) => {
    printInfo({title: 'Connected with', message: socket.id});
    socket.on('cm', (args) => {
      socket.broadcast.emit(args.c, args);
    });
  });

  httpServer.listen(3000);
  printInfo({title: 'Server', message: 'Ready'});
}

main();
