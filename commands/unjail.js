module.exports = {
    komut: "unjail",
    async run(Client, msg, args) {
        const discord = require("discord.js")
        const starlix  = require("../models/starlix")
        const config = require("../config.json")
        if(!msg.guild.members.cache.get(msg.author.id).roles.cache.find(role => role.name.toLowerCase().includes("jail") || role.name.toLowerCase().includes("police"))) return msg.channel.send("Bu Komudu Kullanmak İçin Gereken Role Sahip Değilsiniz.")
        if(starlix.findOne({guildID: msg.guild.id})["jailkurulum"]) return msg.channel.send("JAIL Sistemi Kurulu Değil")
        var member = msg.mentions.members.first()
        if(!member) return msg.channel.send("Bir Kullanıcı Etiketlemelisiniz!")
        msg.guild.channels.cache.map(i => {if(i.permissionOverwrites.get(member.id).type == "member" && i.permissionOverwrites.get(member.id).allow.bitfield ==68608){i.delete()};i.permissionOverwrites.find(o => o.type == "member" && o.id == member.id).delete()})
        msg.channel.send("Kişi Hapisten Atıldı")
        var logchnl = msg.guild.channels.cache.find(cn => cn.type=="text" && cn.name.toLowerCase().includes("hapis-log") || cn.name.toLowerCase().includes("mapus-log") ||cn.name.toLowerCase().includes("jail-log") || cn.name.toLowerCase().includes("hapishane-log"))
        if(!logchnl) return 
        var embed = new discord.MessageEmbed().setDescription(`**Bir Kullanıcı Hapisten Çıkarıldı.\n\n${member.user.tag}, ${msg.author.tag} Tarafından Hapisten Çıkarıldı.**`).setColor("#c90808")
        logchnl.send(embed)
    }
}