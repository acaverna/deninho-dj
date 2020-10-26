const execute = (bot, msg, args) => {
    msg.channel.send("Olá :woman_cook: ")
}

module.exports = {
    name:'hello',
    help:'retorna "olá"',
    execute,
}