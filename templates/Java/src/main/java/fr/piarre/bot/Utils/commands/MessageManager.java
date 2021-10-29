package fr.piarre.bot.Utils.commands;

import fr.piarre.bot.Main;
import fr.piarre.bot.commands.CommandPing;
import org.javacord.api.event.message.MessageCreateEvent;

import java.util.Arrays;

public class MessageManager {

    private final static CommandRegistry registry = new CommandRegistry();

    static {
        registry.addCommands(new Command(
                // Id
                "ping",
                // Description
                "Ping the bot",
                // Aliase(s)
                new String[] {"ping"},
                // CommandeExecutor
                new CommandPing()
            ));
    }

    private static final String PREFIX = Main.getConfigManager().getToml().getString("bot.prefix");

    public static void create(MessageCreateEvent event) {
        if (event.getMessageContent().startsWith(PREFIX)) {
            String[] args = event.getMessageContent().split(" ");
            String commandName = args[0].substring(PREFIX.length());
            args = args.length == 1 ? new String[0] : Arrays.copyOfRange(args, 1, args.length);

            String[] finalArgs = args;
            registry.getByAlias(commandName).ifPresent(cmd -> cmd.getExecutor().run(event, cmd, finalArgs));
        }
    }
}
