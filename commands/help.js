module.exports = {
    komut: "help",
    async run(Client, msg, args) {
        const discord = require("discord.js")
        const embed = new discord.MessageEmbed()
            .setTitle("✮ STARLIX Komutları")
            .setColor("#005fbf")
            .setDescription("https://www.starlix.xyz")
        msg.channel.send(embed)
    }
}