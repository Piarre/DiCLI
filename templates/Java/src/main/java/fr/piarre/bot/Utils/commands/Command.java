package fr.piarre.bot.Utils.commands;

public class Command {

    private final String id, description;
    private final String[] aliases;
    private final CommandExecutor  executor;

    public Command(String id, String description, String[] aliases, CommandExecutor executor) {
        this.id = id;
        this.description = description;
        this.aliases = aliases;
        this.executor = executor;
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String[] getAliases() {
        return aliases;
    }

    public CommandExecutor getExecutor() {
        return executor;
    }

}
