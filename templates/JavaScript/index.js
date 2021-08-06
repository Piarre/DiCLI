const Discord = require('discord.js');
const Client = new Discord.Client();
const { Token } = require('./client.json');
const kickAndBan = require('./commands/kickAndBan');

const presenceParams = {
    activity: {
        name: 'games', // playing games
        type: 'PLAYING' // PLAYING || WATCHING || STREAMING 
    },
}

Client.on('ready', async () => {

    Client.user.setPresence(presenceParams);

    kickAndBan(Client);

    console.log('Bot started');

});

Client.login(Token);