module.exports = {
    komut: "jail",
    async run(Client, msg, args) {
        const discord = require("discord.js")
        const starlix  = require("../models/starlix")
        if(!msg.guild.members.cache.get(msg.author.id).roles.cache.find(role => role.name.toLowerCase().includes("jail") || role.name.toLowerCase().includes("police"))) return msg.channel.send("Bu Komudu Kullanmak İçin Gereken Role Sahip Değilsiniz.")
        if(starlix.findOne({guildID: msg.guild.id})["jailkurulum"]) return msg.channel.send("JAIL Sistemi Kurulu Değil.")
        var member = msg.mentions.members.first();
        var category  = msg.guild.channels.cache.find(chnl => chnl.type=="category" && (chnl.name.toLocaleLowerCase("tr").includes("hapis") ||chnl.name.toLocaleLowerCase("tr").includes("mapus") ||chnl.name.toLocaleLowerCase("tr").includes("jail") ||chnl.name.toLocaleLowerCase("tr").includes("silivri")))
        if(!member) return msg.channel.send("Bir Kullanıcı Etiketlemelisiniz!")
        if(member.id == Client.user.id || member.id == msg.guild.ownerID || member.id == msg.author.id) return msg.channel.send("Bu Kişiyi Hapise Atamazsın!")
        var logchnl = msg.guild.channels.cache.find(cn => cn.type=="text" && cn.name.toLowerCase().includes("hapis-log") || cn.name.toLowerCase().includes("mapus-log") ||cn.name.toLowerCase().includes("jail-log") || cn.name.toLowerCase().includes("hapishane-log"))
        var embed = new discord.MessageEmbed().setDescription(`**Bir Kullanıcı Hapise Atıldı.\n\n${member.user.tag}, ${msg.author.tag} Tarafından Hapise Atıldı.**`).setColor("#c90808")
        msg.guild.channels.cache.map(i => {i.createOverwrite(member, {VIEW_CHANNEL:false, READ_MESSAGE_HISTORY:false})})
        msg.guild.channels.create(member.user.tag,{type:"text",parent:category.id,permissionOverwrites:[{type:"member",id:member.id,allow:["SEND_MESSAGES","READ_MESSAGE_HISTORY","VIEW_CHANNEL"]}, {type:"role",id:msg.guild.id,deny:["VIEW_CHANNEL","READ_MESSAGE_HISTORY","SEND_MESSAGES"]}]}).then( a => {logchnl.send(embed)})
        msg.channel.send("Kişi Hapise Atıldı")
    }
}