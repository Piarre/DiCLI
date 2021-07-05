using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Threading.Tasks;
using Discord;
using Discord.Commands;
using Discord.WebSocket;

namespace DiscordBot.net
{
    class Program
    {
        private DiscordSocketClient client;
        private CommandService commands;

        static void Main(string[] args) => new Program().runBotAsync().GetAwaiter().GetResult();

        public async Task runBotAsync()
        {
            client = new DiscordSocketClient(new DiscordSocketConfig
            {
                LogLevel = LogSeverity.Debug
            });

            commands = new CommandService();

            client.Log += Log;

            client.Ready += () =>
            {
                Console.WriteLine("Ready !");
                return Task.CompletedTask;
            };

            await InstallCommandsAsync();

            await client.LoginAsync(TokenType.Bot, "TOKEN GOES HERE");
            await client.StartAsync();

            await Task.Delay(-1);
        }

        public async Task InstallCommandsAsync()
        {
            client.MessageReceived += HandleCommandAsync;
            await commands.AddModulesAsync(Assembly.GetEntryAssembly(), null);
        }

        private async Task HandleCommandAsync(SocketMessage pMessage)
        {
            var message = (SocketUserMessage)pMessage;

            if (message == null) return;

            int argPos = 0;

            if (!message.HasCharPrefix('!', ref argPos)) return;

            var context = new SocketCommandContext(client, message);

            var result = await commands.ExecuteAsync(context, argPos, null);

            //ERROR
            if (!result.IsSuccess) await context.Channel.SendMessageAsync(result.ErrorReason);
        }

        private Task Log(LogMessage arg)
        {
            Console.WriteLine(arg.ToString());
            return Task.CompletedTask;
        }
    }
}
