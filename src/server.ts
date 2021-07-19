import { createServer as createServerHttp } from 'http';
import { createServer as createServerHttps } from 'https';
import { Server } from 'socket.io';
import { printInfo } from './chat';

const httpServer = process.env.PROD ? createServerHttps() : createServerHttp();
const io = new Server(httpServer);

const main = async () => {
  io.on('connection', async (socket) => {
    printInfo({title: 'Connected with', message: socket.id});
    socket.on('cm', (args) => {
      socket.broadcast.emit(args.c, args);
    });
  });

  httpServer.listen(process.env.PORT || 3000);
  printInfo({title: 'Server', message: 'Ready'});
}

main();
