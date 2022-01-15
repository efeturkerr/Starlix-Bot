module.exports = {
    komut: "tagekle",
    async run(Client, msg, args) {
        const starlix  = require("../models/starlix")
        const config = require("../config.json")
        var db = await starlix.findOne({guildID: msg.guild.id})
        if(!msg.guild.members.cache.get(msg.author.id).permissions.has("MANAGE_GUILD")) return msg.channel.send("Bu İşlemi Yapmak İçin `MANAGE_GUILD` Yetkisine Sahip Olmanız Gerekir.")
        if(db["tagkontrolayarlar"][0]["tagkontrol"] == false) return msg.channel.send("Önce Tag Kontrol Sistemini Açmalısınız.")
        var tag = msg.content.replace(`${config.PREFIX}tagekle `, "").replace(`${config.PREFIX}tagekle\n`,"");
        if(tag == `${config.PREFIX}tagekle`) return msg.channel.send("Bir Tag Belirtmelisiniz.");
        
        if(tag[0] == "#" && tag.length == 5) {
            if(db["tagkontrolayarlar"][0]["discriminatortags"].length>=3) return msg.channel.send(`Discriminator(#0001) Tag ekleme sınırına ulaştınız. Ekli olan taglarınızı görmek için ${config.PREFIX}taglar komudunu, bir tag silmek için ${config.PREFIX}tagsil komudunu kullanabilirsiniz.`);
            db["tagkontrolayarlar"][0]["discriminatortags"].push(tag)
            starlix.updateOne({guildID:msg.guild.id},{tagkontrolayarlar:db["tagkontrolayarlar"]}, () => {})
        }
        
        else{
            if(db["tagkontrolayarlar"][0]["tags"].length>=6) return msg.channel.send(`Tag ekleme sınırına ulaştınız. Ekli olan taglarınızı görmek için ${config.PREFIX}taglar komudunu, bir tag silmek için ${config.PREFIX}tagsil komudunu kullanabilirsiniz.`);
            db["tagkontrolayarlar"][0]["tags"].push(tag)
            starlix.updateOne({guildID:msg.guild.id},{tagkontrolayarlar:db["tagkontrolayarlar"]}, () => {})
        } 
        msg.channel.send(`Tagınız(${tag}) Başarıyla Eklendi. Mevcut Taglarınızı Görüntülemek İçin ${config.PREFIX}taglar komudunu kullanabilirsiniz.`);
    }
}