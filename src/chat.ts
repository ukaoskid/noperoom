import { clearLastLine } from './utils';
import { v4 } from 'uuid';

const moment = require('moment');
const chalk = require('chalk');
const readline = require('readline');

interface Chat {
  t: number;
  m: string;
  c: string;
  n: string;
}

interface ChatInfo {
  title: string;
  message: string;
}

export const printChat = (chat: Chat, me = true) => {
  const date = moment(chat.t).format('YYYY-MM-DD HH:mm:ss');
  console.log(`[${date}] (${chat.n}) ${chalk.hex('b8d8be')(chat.m)}`);
}

export const printInfo = (info: ChatInfo) => {
  console.log(chalk.bgHex('ed9b2b').hex('ffffff').bold(info.title), chalk.bold(info.message));
}

export const chat = async (server: any, channel: string, nickname: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (input: string) => {
    const data = {
      t: Date.now(),
      m: input,
      c: channel,
      n: nickname
    };

    clearLastLine();
    printChat(data);
    server.emit('cm', data);
  });
}

export const newChannelName = () => v4();
