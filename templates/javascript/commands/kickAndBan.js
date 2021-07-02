const command = require('../command')

module.exports = (Client) => {
    command(Client, ['ban', 'b'], message => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if(
        member.hasPermission('ADMINISTRATOR') || 
        member.hasPermission('BAN_MEMBERS')
      ) {
          const target = mentions.users.first()
          console.log(target)
          if (target) {
              const targetMember = message.guild.members.cache.get(target.id)
              targetMember.ban()
              message.channel.send(`**${tag}, cet utilisateur à été banni(e) !**`)
          } else {
              message.channel.send(`**Veuillez spécifié un utilisateur !**`)
          }
        } else {
            message.channel.send(`**${tag}, Vous n'avez pas la permission de bannir un membre**`)
        }
    })

    command(Client, 'kick', message => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if(
        member.hasPermission('ADMINISTRATOR') || 
        member.hasPermission('KICK_MEMBERS')
      ) {
          const target = mentions.users.first()
          console.log(target)
          if (target) {
              const targetMember = message.guild.members.cache.get(target.id)
              targetMember.kick()
              message.channel.send(`**${tag}, cet utilisateur à été éjecté(e) !**`)
          } else {
              message.channel.send(`**Veuillez spécifié un utilisateur !**`)
          }
        } else {
            message.channel.send(`**${tag}, Vous n'avez pas la permission d'éjecté un membre**`)
        }
    })
}