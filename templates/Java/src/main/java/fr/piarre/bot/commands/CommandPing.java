package fr.piarre.bot.commands;

import java.awt.*;
import fr.piarre.bot.Utils.commands.*;
import org.javacord.api.entity.message.embed.EmbedBuilder;
import org.javacord.api.event.message.MessageCreateEvent;

public class CommandPing implements CommandExecutor {

    @Override
    public void run(MessageCreateEvent event, Command command, String[] args) {

        EmbedBuilder embed = new EmbedBuilder();
            embed
                    .setTitle("Pinging...")
                    .setColor(Color.ORANGE);

        event.getChannel().sendMessage("Pong !").thenAccept(message -> {
            long unixBot = message.getCreationTimestamp().toEpochMilli();
            long unixUser = event.getMessage().getCreationTimestamp().toEpochMilli();
            long ping = unixBot - unixUser;


            embed
                    .setColor(Color.GREEN)
                    .setTitle("Pong !")
                    .setDescription("With ping : " + ping + "ms !");

            message.edit(embed);
        });
    }
}
