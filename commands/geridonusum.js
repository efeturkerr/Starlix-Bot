module.exports = {
    komut: "geridönüşüm",
    async run(Client, msg, args) {
        const discord = require("discord.js")
        
        const starlix  = require("../models/starlix")
        var db = await starlix.collection.findOne({guildID:msg.guild.id})
        var channels = db["geridonusum"][0]["channels"]
        var roles = db["geridonusum"][1]["roles"]
        var chnlText = ""
        var roleText = ""
        for(var i =0; i<channels.length;i++){
            chnlText+=`${i+1} - `+channels[i].name+ "\n"  
        }
        for(var i =0; i<roles.length;i++){
            roleText+=`${i+1} - `+roles[i]["data"].name+ "\n"
        }
        var embed = new discord.MessageEmbed()
            .setColor("#d8d8d8")
            .addField("Silinen Son 5 Kanal",chnlText,true)
            .addField("Silinen Son 5 Rol",roleText, true)
            .setDescription("En Son Sildiğiniz Kanal Ve Ya Rol En Alt Sırada Yer Almaktadır.")
        msg.channel.send(embed)
    }
}