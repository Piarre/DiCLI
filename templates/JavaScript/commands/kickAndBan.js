const command = require('../command.js')

module.exports = (Client) => {
    command(Client, ['ban', 'b'], message => {
        const { member, mentions } = message

        const tag = `<@${member.id}>` //who ban or kick

        if(
        member.hasPermission('ADMINISTRATOR') || 
        member.hasPermission('BAN_MEMBERS')
      ) {
          const target = mentions.users.first()
          console.log(target)
          if (target) {
              const targetMember = message.guild.members.cache.get(target.id)
              targetMember.ban()
              message.channel.send(`**Utilisateur**, ${targetMember} **bannie(e) par :** ${tag} **!**`)
          } else {
              message.channel.send(`${tag}, **Veuillez spécifié un utilisateur !**`)
          }
        } else {
            message.channel.send(`${tag}, **Vous n'avez pas la permission de bannire(e) un membre !**`)
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
              message.channel.send(`**Utilisateur**, ${targetMember} **éjecté(e) par :** ${tag} **!**`)
          } else {
              message.channel.send(`${tag}, **Veuillez spécifié un utilisateur !**`)
          }
        } else {
            message.channel.send(`${tag}, **Vous n'avez pas la permission d'éjecté(e) un membre !**`)
        }
    })
}