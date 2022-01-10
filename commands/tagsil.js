module.exports = {
    komut: "tagsil",
    async run(Client, msg, args) {
        const starlix  = require("../models/starlix")
        const config = require("../config.json")
        var db = await starlix.findOne({guildID: msg.guild.id})
        if(!msg.guild.members.cache.get(msg.author.id).permissions.has("MANAGE_GUILD")) return msg.channel.send("Bu İşlemi Yapmak İçin `MANAGE_GUILD` Yetkisine Sahip Olmanız Gerekir.")
        var tag = msg.content.replace(`${config.PREFIX}tagsil `, "").replace(`${config.PREFIX}tagsil\n`,"").replace(" ","");
        if(tag == `${config.PREFIX}tagsil`) return msg.channel.send("Bir Tag Belirtmelisiniz.");
        
        if(tag[0] == "#" && tag.length == 5) {
            db["tagkontrolayarlar"][0]["discriminatortags"].splice(db["tagkontrolayarlar"][0]["discriminatortags"].indexOf(tag),1)
            starlix.updateOne({guildID:msg.guild.id},{tagkontrolayarlar:db["tagkontrolayarlar"]}, () => {})
            return msg.channel.send(`Tagınız(${tag}) Başarıyla Silindi. Mevcut Taglarınızı Görüntülemek İçin **${config.PREFIX}taglar** komudunu kullanabilirsiniz.`)
        }
        
        else{
            if(db["tagkontrolayarlar"][0]["tags"].length>=6) return msg.channel.send("Tag ekleme sınırına ulaştınız. Ekli olan taglarınızı görmek için m!taglar komudunu, bir tag silmek için m!tagsil komudunu kullanabilirsiniz.");
            db["tagkontrolayarlar"][0]["tags"].splice(db["tagkontrolayarlar"][0]["tags"].indexOf(tag),1)
            starlix.updateOne({guildID:msg.guild.id},{tagkontrolayarlar:db["tagkontrolayarlar"]}, () => {})
            return msg.channel.send(`Tagınız(${tag}) Başarıyla Silindi. Mevcut Taglarınızı Görüntülemek İçin **${config.PREFIX}taglar** komudunu kullanabilirsiniz.`)
        } 
    }
}