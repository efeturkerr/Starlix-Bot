module.exports = {
    komut: "sınırsızban",
    async run(Client, msg, args) {
        const discord = require("discord.js")
        const starlix  = require("../models/starlix")
        const config = require("../config.json")
        var db = await starlix.collection.findOne({guildID:msg.guild.id})
        if(msg.guild.members.cache.get(msg.author.id).hasPermission("ADMINISTRATOR")){
            var member = msg.content.replace(`${config.PREFIX}sınırsızban `,"").replace("!","").replace(">","").replace("<","").replace("@","").replace(" ","")
            if(parseInt(member) != msg.guild.owner.id){
                if(msg.guild.members.cache.get(member)!=undefined ){
                    if(member != Client.user.id){
                        if(member != msg.author.id){
                            if(msg.guild.members.cache.get(member).bannable == true){
                                msg.guild.members.cache.get(member).ban({reason:"Banned."}).then(async i=> {if(db["sinirsizban"].includes(member) == false){db["sinirsizban"].push(member);await starlix.updateOne({guildID: msg.guild.id}, {sinirsizban: db["sinirsizban"]},() => {});const embed = new discord.MessageEmbed().setTitle("Kullanıcı Sunucudan Sınırsız Yasaklandı.");msg.channel.send(embed)}})
                            }
                            else{
                                const embed = new discord.MessageEmbed()
                                    .setColor("#c90808")
                                    .setTitle("Ops")
                                    .setDescription("Bu Kişiyi Yasaklayamıyorum.")
                                    .addField("Sebep 1","Bu Işlemi Yapmam Için Yetkim Olmayabilir",false)
                                    .addField("Sebep 2", "Sahip Olduğum Rol Işlem Yapılacak Kişinin Rolü Altında Olabilir",false)
                                msg.channel.send(embed)
                            }
                        }
                        else{
                            const embed = new discord.MessageEmbed()
                                .setColor("#c90808")
                                .setTitle("H-Hey 😳")
                                .setDescription("Kendini Yasaklayamazsın 😳")
                            msg.channel.send(embed)
                        }
                    }
                    else{
                        const embed = new discord.MessageEmbed()
                            .setColor("#c90808")
                            .setTitle("H-Hey 😳")
                            .setDescription("Kendimi Yasaklayamam 😳")
                        msg.channel.send(embed)
                    }
                
                }

                else{
                    if(db["sinirsizban"].includes(member)){
                        const embed = new discord.MessageEmbed()
                            .setColor("#c90808")
                            .setTitle("Ğ?")
                            .setDescription("Bu Kişi Zaten Sınırsız Banlılar Listesinde 🧐")
                        msg.channel.send(embed)
                    }
                    else{
                        const embed = new discord.MessageEmbed()
                            .setColor("#c90808")
                            .setTitle("O Da Kim?")
                            .setDescription("Sunucudan Sınırsız Yasaklamak İstediğiniz Kişiyi Tanımıyorum 🧐")
                        msg.channel.send(embed)
                    }
                } 
            }
            else{
                const embed = new discord.MessageEmbed()
                    .setColor("#c90808")
                    .setTitle("Hata!")
                    .setDescription("Sunucu Sahibini Sunucudan Yasaklayamazsınız 🧐")
                msg.channel.send(embed)
            }
        }
        else{
            const embed = new discord.MessageEmbed()
                .setColor("#c90808")
                .setTitle("Hata!")
                .setDescription("Kullanıcı Yasaklama Yetkinizi Bulamadım 🧐")
            msg.channel.send(embed)
        }
    }
}