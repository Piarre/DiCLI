import discord
from discord.ext import commands
import datetime

Token = "PASTE YOUR TOKEN HERE (get your own on : https://discord.com/developers/applications, go to : 'Bot' -> 'Token' -> copy)"
Prefix = "YOUR PERSONAL BOT PREFIX"

kickLogs = open(r"templates\python\logs\kick.txt", "a")
banLogs = open(r"templates\python\logs\ban.txt", "a")

logsDatetime = datetime.datetime.now()

client = commands.Bot(Prefix)    

@client.event
async def on_ready():
    print(f"We have logged in as {client.user}")
    await client.change_presence(activity=discord.Activity(type=discord.ActivityType.watching, name=f"{client.command_prefix}help"))
    print(discord.__version__)

@client.command()
async def clear(ctx, nombre : int):
    message = await ctx.channel.history(limit = nombre + 1).flatten()
    for message in message:
        await message.delete()

@client.command()
async def kick(ctx, user : discord.User, *reason):
    userKicker = ctx.message.author.id
    kickUser = user.id
    await ctx.guild.kick(user, reason = reason)
    await ctx.send(f"<@{kickUser}>, was kicked <@{userKicker}> for reason : {reason} ")
    kickLogs.write(f"{logsDatetime} {ctx.message.author.name} kicked {user} for : {reason} \n")
    kickLogs.close()

@client.command()
async def ban(ctx, user : discord.User, *reason):
    userBan = ctx.message.author.id
    banUser = user.id
    await ctx.guild.ban(user, reason = reason)
    await ctx.send(f"<@{banUser}>, was banned <@{userBan}> for reason : {reason} ")
    banLogs.write(f"{logsDatetime} {ctx.message.author.name} banned {user} for reason : {reason} \n")
    banLogs.close()

client.run(Token)
