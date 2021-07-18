import { prompt } from 'inquirer';
import { io } from 'socket.io-client';
import { chat, newChannelName, printChat, printInfo } from './chat';

const main = async () => {
  const hostname = [
    {
      name: 'hostname',
      type: 'input',
      message: 'Server'
    },
    {
      name: 'nickname',
      type: 'input',
      message: 'Nickname'
    },
    {
      name: 'channelType',
      type: 'list',
      message: 'Channel',
      choices: ['Create', 'Join']
    }
  ];

  let channel = newChannelName();
  const answers = await prompt<any>(hostname);

  const nickname = answers.nickname;
  if (answers.channelType === 'Join') {
    const channelName = [
      {
        name: 'channel',
        type: 'input',
        message: 'Channel name'
      }
    ];
    const channelNameAnswer = await prompt<any>(channelName);
    channel = channelNameAnswer.channel
  }

  printInfo({title: 'Channel', message: channel});

  const server = io(`http://${answers.hostname}:3000`, {
    query: {channel}
  });

  server.on('connect', async () => {
    printInfo({title: 'Server', message: 'Connected'});
  });

  server.on(channel, (args, callback) => {
    printChat(args);
  })

  await chat(server, channel, nickname);
}

main();
