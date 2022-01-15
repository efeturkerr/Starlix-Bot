module.exports = {
    komut: "unban",
    async run(Client, msg, args) {
        const discord = require("discord.js")
        const config = require("../config.json")
        if(msg.guild.members.cache.get(msg.author.id).hasPermission("BAN_MEMBERS")){
            var member = msg.content.replace(`${config.PREFIX}unban `, "").replace("!","").replace("@","").replace(">","").replace("<","")
            msg.guild.fetchBans().then(i => {
                if(i.get(member) != undefined){
                    msg.guild.members.unban(member).then(i => {const embed = new discord.MessageEmbed().setTitle("İşlem Başarılı").setDescription("Kullanıcının Yasağı Kaldırıldı"); msg.channel.send(embed)}).catch(i => {const embed = new discord.MessageEmbed().setTitle("Bir Hata Oluştu!");msg.channel.send(embed)})
                }
                else{
                    const embed = new discord.MessageEmbed()
                        .setColor("#c90808")
                        .setTitle("Hey")
                        .setDescription("Bu Kullanıcının Zaten Yasağı Yok!")
                    msg.channel.send(embed)
                }
            })
        }
        else{
            const embed = new discord.MessageEmbed()
                .setColor("#c90808")
                .setTitle("Hmm")
                .setDescription("Görünüşe Göre Bu İşlemi Yapmak İçin Yetkin Yok 🧐")
            msg.channel.send(embed)
        }
    }
}