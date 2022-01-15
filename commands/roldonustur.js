module.exports = {
    komut: "roldönüştür",
    async run(Client, msg, args) {
        const starlix  = require("../models/starlix")
        const config = require("../config.json")
        var db = await starlix.collection.findOne({guildID:msg.guild.id})
        var parameter = msg.content.toLowerCase().replace(`${config.PREFIX}roldönüştür`,"").replace(" ","")
        if(!parseInt(parameter)){
            return msg.channel.send(`1 ve 5 Arasında Rakam Belirtmelisiniz, Geri Getireceğiniz Rolü Görmek İçin ${config.PREFIX}geridönüşüm Komudunu Kullanabilirsiniz`)
        }
        var roles = db["geridonusum"][1]["roles"][parameter-1]
        if(!roles) return msg.channel.send("Belirttiğiniz Rolü Bulamadım.");
        msg.guild.roles.create(roles).then(() => {msg.channel.send("Rol Geri Getirildi!")})
    }
}