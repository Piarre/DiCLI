const { Command, CommandoMessage } = require('discord.js-commando');
const { VoiceConnection } = require('discord.js');
const ytdl = require('ytdl-core-discord');

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Play a YouTube video.',
            args: [
                {
                    key: 'query',
                    prompt: 'What music do you want to play ?',
                    type: 'string'
                }
            ]
        });
    }

    /**
     * 
     * @param {CommandoMessage} message
     * @param {String} query
     */
    async run(message, { query }) {
        await message.member.voice.channel.join()
        .then((connection) => {
            this.runVideo(message, connection, query);    
        })
        .catch((error) => { console.log(error)});
    }

    /**
     * 
     * @param {CommandoMessage} message
     * @param {VoiceConnection} connection
     * @param {*} video
     */

    async runVideo(message, connection, video) {
        const dispatcher = connection.play( await ytdl(video, { filter: 'audioonly'}), {type: 'opus'});

        client.server.dispatcher = dispatcher;

        dispatcher.on('finish', () => {
            message.member.voice.channel.leave();
        });
    }
}