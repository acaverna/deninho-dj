// - Dotenv config
require("dotenv").config()
const Discord = require("discord.js")
const fs = require("fs")
const path = require("path")

const bot = new Discord.Client()
bot.commands = new Discord.Collection()
bot.queues = new Map()
const commandFiles = fs
    .readdirSync(path.join(__dirname,"/commands"))
    .filter(filename => filename.endsWith("js"))

for(let filename of commandFiles){
    const command = require(`./commands/${filename}`)

    bot.commands.set(command.name, command)
}

bot.login(process.env.DISCORD_TOKEN)

bot.on("message", msg => {
    if(!msg.content.startsWith(process.env.PREFIX) || msg.author.bot)return

    const args = msg.content.slice(process.env.PREFIX.length).split(" ")
    const command = args.shift()

    try{
        bot.commands.get(command).execute(bot,msg,args)
    }catch(e){
        return msg.reply("Não conheço esse comando...")
    }
})