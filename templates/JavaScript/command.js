const { Prefix } = require('./client.json')

module.exports = (client, aliases, callback) => {
    if (typeof aliases === 'string') {
        aliases = [aliases]
    }

    client.on('message', message => {
        const { content } = message;

        aliases.forEach(alias => {
            const command = `${Prefix}${alias}`
            if (content.startsWith(`${command} `) || content === command) {
                console.log(`${command} à été éxécuté`)
                callback(message)
            }
        })
    })
}