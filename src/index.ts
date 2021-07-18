import {prompt, Question} from 'inquirer';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {chat, printChat} from "./chat";
import {getJwt} from "./jwt";
const chalk = require('chalk');

const httpServer = createServer();
const io = new Server(httpServer);

const main = async () => {
    const ipAddress: Question[] = [{
        name: 'ip',
        type: 'input',
        message: 'IP Address'
    }];

    const answers = await prompt<any>(ipAddress);
    const token = getJwt(answers);
    console.log(chalk.bold('Token'), chalk.hex('ff993c').bold(token));

    io.on('connection', async (socket) => {
        console.log(chalk.bgHex('75c44c').bold(`Connected with ${chalk.hex('ff993c').bold(socket.id)}`));
        socket.on('cm', (args, callback) => {
            printChat(args);
        });
    });
    httpServer.listen(3000, 'localhost');
    await chat(io);
}

main();
