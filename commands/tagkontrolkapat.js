module.exports = {
    komut: "tagkontrolkapat",
    async run(Client, msg, args) {
        const starlix  = require("../models/starlix")
        var db = await starlix.findOne({guildID: msg.guild.id})
        if(!msg.guild.members.cache.get(msg.author.id).permissions.has("MANAGE_GUILD")) return msg.channel.send("Bu İşlemi Yapmak İçin `MANAGE_GUILD` Yetkisine Sahip Olmanız Gerekir.")
        if(db["tagkontrolayarlar"][0]["tagkontrol"] == false) return msg.channel.send("Tag Kontrol Sistemi Zaten Kapalı .")
        db["tagkontrolayarlar"][0]["tagkontrol"] = false
        db["tagkontrolayarlar"][0]["tags"] = []
        db["tagkontrolayarlar"][0]["discriminatortags"] = []
        starlix.updateOne({guildID:msg.guild.id},{tagkontrolayarlar:db["tagkontrolayarlar"]}, () => {})
        msg.channel.send("Tag kontrol sistemi başarı ile kapatıldı");
    }
}