module.exports = {
    komut: "jailkur",
    async run(Client, msg, args) {
        const starlix  = require("../models/starlix")
        if(!msg.guild.members.cache.get(msg.author.id).permissions.has("ADMINISTRATOR")) return msg.channel.send("Bu İşlemi Yapabilmek İçin `ADMINISTRATOR` Yetkisine Sahip Olmalısınız.")
        var db = await starlix.findOne({guildID: msg.guild.id})
        if(db["jailkurulum"]){
            msg.channel.send("JAIL Zaten Kurulu")
        }
        else{
            msg.guild.roles.create({data:{name:"👮‍♂️ POLICE 👮‍♂️"}}).then(a => {
                msg.guild.channels.create("Hapishane",{type:"category",permissionOverwrites:[{type:"role",id:a.id,allow:["VIEW_CHANNEL","SEND_MESSAGES","READ_MESSAGE_HISTORY"]},{type:"role",id:msg.guild.id,deny:["VIEW_CHANNEL","READ_MESSAGE_HISTORY"]}]}).then(b => {
                    msg.guild.channels.create("hapis-log",{type: "text", parent:b.id ,permissionOverwrites:[{type:"role",id:a.id,allow:["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]},{type:"role",id:msg.guild.id,deny:["READ_MESSAGE_HISTORY","SEND_MESSAGES","VIEW_CHANNEL"]}]})
                })
            })
            starlix.updateOne({guildID:msg.guild.id},{jailkurulum:true}, () => {})
            msg.channel.send("JAIL Kuruldu.")
        }
    }
}   