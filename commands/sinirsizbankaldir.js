module.exports = {
    komut: "sinirsizbankaldir",
    async run(Client, msg, args) {
        const discord = require("discord.js")
        const starlix  = require("../models/starlix")
        const config = require("../config.json")
        var db = await starlix.collection.findOne({guildID:msg.guild.id})
        if(msg.guild.members.cache.get(msg.author.id).hasPermission("ADMINISTRATOR")){
            var prmtr = msg.content.replace(`${config.PREFIX}sınırsızbankaldır `," ").replace("@","").replace("!","").replace("<","").replace(">","").replace(" ","")
            if(db["sinirsizban"].includes(prmtr) == true){
                db["sinirsizban"].splice(db["sinirsizban"].indexOf(prmtr),1)
                await starlix.updateOne({guildID: msg.guild.id}, {sinirsizban: db["sinirsizban"]},() => {})
                msg.guild.members.unban(prmtr)
                const embed = new discord.MessageEmbed().setTitle("İşlem Başarılı").setDescription("Kullanıcının Sınırsız Banı Kaldırıldı"); msg.channel.send(embed)
            }
            else{
                if(prmtr == "" && prmtr == " "){
                    const embed = new discord.MessageEmbed()
                        .setColor("#c90808")
                        .setTitle("Hey!")
                        .setDescription(`Bu Komut\n${config.PREFIX}sınırsızbankaldır @kişi\nŞeklinde Kullanılır.`)
                    msg.channel.send(embed)
                }
                else{
                    const embed = new discord.MessageEmbed()
                        .setColor("#c90808")
                        .setTitle("Ops")
                        .setDescription("Bu Kişinin Sınırsız Banı Olduğunu Sanmıyorum.")
                    msg.channel.send(embed)
                }

            }
        }
        else{
            const embed = new discord.MessageEmbed()
                .setColor("#c90808")
                .setTitle("Ops")
                .setDescription("Bu İşlemi Yapmak İçin Yeterli Yetkin Yok")
            msg.channel.send(embed)
        }
    }
}