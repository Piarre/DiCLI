const { Command, CommandoMessage } = require('discord.js-commando');
const { VoiceConnection } = require('discord.js');
const ytdl = require('ytdl-core-discord');



module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pause',
            group: 'music',
            memberName: 'pause',
            description: 'Pause the current video.'
        });
    }

    /**
     * 
     * @param {CommandoMessage} msg
     * @param {String} message 
     * @param {String} reactions 
     */
    async reply(msg, message, reactions) {
        await msg.reply(message).react(reactions)
        .then(() => {})
        .catch(() => {});
    }

    /**
     * 
     * @param {CommandoMessage} message
     * @param {String} query
     */
    async run(message) {
        if (!message.member.voice.channel) {
            return this.reply("You need to be in a voice channel", "❌")
        }

        if (!message.client.voice.connections.first()) {
            return this.reply("I am not connected to a voice channel, to connect me to a channel enter", "❌")
        }
    } 
}