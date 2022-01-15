module.exports = {
    komut: "taglar",
    async run(Client, msg, args) {
        const discord = require("discord.js")
        const starlix  = require("../models/starlix")
        var db = await starlix.findOne({guildID: msg.guild.id})
        if(!msg.guild.members.cache.get(msg.author.id).permissions.has("MANAGE_GUILD")) return msg.channel.send("Bu İşlemi Yapmak İçin `MANAGE_GUILD` Yetkisine Sahip Olmanız Gerekir.")
        var taglar= " **TAGLAR** \n";
        var disctaglar = " **DISCRIMINATOR TAGLAR (#0001)** \n";
        db["tagkontrolayarlar"][0]["tags"].map(i => taglar += " "+ i +" \n")
        db["tagkontrolayarlar"][0]["discriminatortags"].map(i => disctaglar += " "+ i +" \n")
        
        var embed = new discord.MessageEmbed()
            .setColor("#00bfbf")
            .setDescription("**Eklediğiniz Taglar** \n\n"+taglar+"\n"+disctaglar)
        msg.channel.send(embed)
    }
}