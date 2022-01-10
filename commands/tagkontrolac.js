module.exports = {
    komut: "tagkontrolaç",
    async run(Client, msg, args) {
        const starlix  = require("../models/starlix")
        var db = await starlix.findOne({guildID: msg.guild.id})
        if(!msg.guild.members.cache.get(msg.author.id).permissions.has("MANAGE_GUILD")) return msg.channel.send("Bu İşlemi Yapmak İçin `MANAGE_GUILD` Yetkisine Sahip Olmanız Gerekir.")
        if(db["tagkontrolayarlar"][0]["tagkontrol"]) return msg.channel.send("Tag Kontrol Sistemi Zaten Açık.")
        var role = msg.mentions.roles.first();  
        var chnl = msg.mentions.channels.first();
        if(!role) return msg.channel.send("Tag Alındığında Verilecek Rolü Etiketlemelisiniz!");
        if(!chnl) return msg.channel.send("Tag Alındığında Mesaj Atılacak Kanalı Etiketlemelisiniz!");
        db["tagkontrolayarlar"][0]["verilecekrol"] = role.id
        db["tagkontrolayarlar"][0]["tagkanal"] = chnl.id
        db["tagkontrolayarlar"][0]["tagkontrol"] = true
        console.log(db["tagkontrolayarlar"])
        starlix.updateOne({guildID:msg.guild.id},{tagkontrolayarlar:db["tagkontrolayarlar"]}, () => {}) //role
        msg.channel.send("Tag kontrol sistemi başarı ile açıldı, kontrol edilmesi istediğiniz tagları **m!tagekle** komudu ile ekleyebilir, **m!tagsil** komudu ile silebilirsiniz.");
    }
}