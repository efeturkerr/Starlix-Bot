module.exports = {
    komut: "kanaldönüştür",
    async run(Client, msg, args) {
        const config = require("../config.json")
        const starlix  = require("../models/starlix")
        var db = await starlix.collection.findOne({guildID:msg.guild.id})
        var parameter = msg.content.toLowerCase().replace(`${config.PREFIX}kanaldönüştür`,"").replace(" ","")
        if(!parseInt(parameter)){
            return msg.channel.send(`1 ve 5 Arasında Rakam Belirtmelisiniz, Geri Getireceğiniz Kanalı Görmek İçin ${config.PREFIX}geridönüşüm Komudunu Kullanabilirsiniz`)
        }
        var channels = db["geridonusum"][0]["channels"]
        msg.guild.channels.create(channels[parameter-1].name,{type:channels[parameter-1].type,permissionOverwrites:channels[parameter-1].permissionOverwrites,nsfw:channels[parameter-1].nswf,rateLimitPerUser:channels[parameter-1].rateLimitPerUser}).then(() => {msg.channel.send("Kanal Geri Getirildi!")})
    }
}