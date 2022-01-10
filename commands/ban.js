    module.exports = {
    komut: "ban",
    async run(Client, msg, args) {
        const discord = require("discord.js")
        const config = require("../config.json")
        if(msg.guild.members.cache.get(msg.author.id).hasPermission("BAN_MEMBERS")){ //
            var member = msg.content.replace(`${config.PREFIX}ban`,"").replace(`${config.PREFIX}b`,"").replace(`${config.PREFIX}b `,"").replace(`${config.PREFIX}ban `,"").replace("!","").replace(">","").replace("<","").replace("@","").replace(" ","")
            if(parseInt(member) != msg.guild.owner.id){
                if(msg.guild.members.cache.get(member)!=undefined){
                    if(member != msg.author.id){
                        if(member!= Client.user.id){
                            if(msg.guild.members.cache.get(member).bannable == true){
                                msg.guild.members.cache.get(member).ban({reason:"Banned."}).then(i=> {const embed = new discord.MessageEmbed().setTitle("Kullanıcı Sunucudan Yasaklandı 🥸");msg.channel.send(embed)})
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
                                .setDescription("Sunucudan Kendimi Yasaklayamam 😳")
                            msg.channel.send(embed)      
                        }
                    }
                    else{
                        const embed = new discord.MessageEmbed()
                            .setColor("#c90808")
                            .setTitle("H-Hey 😳")
                            .setDescription("Sunucudan Kendini Yasaklayamazsın 😳")
                        msg.channel.send(embed)
                    }
                }
                else{
                    const embed = new discord.MessageEmbed()
                        .setColor("#c90808")
                        .setTitle("O Da Kim?")
                        .setDescription("Sunucudan Yasaklamak İstediğiniz Kişiyi Tanımıyorum 🧐")
                    msg.channel.send(embed)
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