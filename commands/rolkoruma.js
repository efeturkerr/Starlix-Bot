module.exports = {
    komut: "rolkoruma",
    async run(Client, msg, args) {
        const discord = require("discord.js")
        const starlix  = require("../models/starlix")
        const config = require("../config.json")
        if(msg.guild.members.cache.get(msg.author.id).hasPermission("MANAGE_GUILD")){
            var parameter = msg.content.replace(`${config.PREFIX}rolkoruma `,"")
            if(parameter.toLocaleLowerCase("tr").includes("aç")){
                starlix.findOne({guildID: msg.guild.id},(err,result) => {if(err){}else{
                    
                    if(result.rolkoruma){
                        const embed = new discord.MessageEmbed()
                        .setTitle("Hmm")
                        .setDescription("Görünüşe Göre Rol Koruma Zaten Açık")
                        msg.channel.send(embed)
                    }
                    else{
                        starlix.updateOne({guildID:msg.guild.id},{rolkoruma:true},() =>{})
                        const embed = new discord.MessageEmbed()
                            .setTitle("İşlem Başarılı")
                            .setDescription("Rol Koruma Açıldı")
                        msg.channel.send(embed)
                    }
                }})
            
            }
            else if(parameter.toLocaleLowerCase("tr").includes("kapat")){
                starlix.findOne({guildID: msg.guild.id},(err,result) => {if(err){}else{
                    if(result.rolkoruma == false){
                        const embed = new discord.MessageEmbed()
                        .setTitle("Hmm")
                        .setDescription("Görünüşe Göre Rol Koruma Zaten Kapalı")
                        msg.channel.send(embed)
                    }
                    else{
                        starlix.updateOne({guildID:msg.guild.id},{rolkoruma:false},() =>{})
                        const embed = new discord.MessageEmbed()
                            .setTitle("İşlem Başarılı")
                            .setDescription("Rol Koruma Kapatıldı")
                        msg.channel.send(embed)
                    }
                }})
            }
        }
        else{
            const embed = new discord.MessageEmbed()
                .setTitle("Ops")
                .setDescription("Bu İşlemi Yapmak İçin `MANAGE_GUILD` Yetkisine Sahip Olmalısınız")
        }
    }
}