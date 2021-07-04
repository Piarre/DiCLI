const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
    commandPrefix: '!'
});

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerGroup('music', 'Music')
    .registerDefaultCommands({
		help: false,
	})
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.server = {
    queue: [],
    currentVideo: {title: "", url: ""},
    dispatcher: null,
};

client.once('ready', () => {
    console.log(`Connected with ${client.user.tag} -- (${client.user.id})`)
});

client.on('error', (err) => console.error(err));

client.login("TOKEN GOES HERE");