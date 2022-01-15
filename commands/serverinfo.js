module.exports = {
    komut: "serverinfo",
    async run(Client, msg, args) {
        const discord = require("discord.js")
        const config = require("../config.json")
        var guild = msg.content.replace(`${config.PREFIX}serverinfo`,"").replace(" ","")
        if(msg.content.toLowerCase() == `${config.PREFIX}serverinfo`){
            guild = msg.guild.id
        }
        var text = 0;
        var voice = 0;
        var online = 0;
        var dnd = 0;
        if(Client.guilds.cache.get(guild) != undefined){
            Client.guilds.cache.get(guild).channels.cache.filter(i => {if(i.type.toString() == "text"){text++}})
            Client.guilds.cache.get(guild).channels.cache.filter(i => {if(i.type.toString() == "voice"){voice++}})
            Client.guilds.cache.get(guild).members.cache.filter(i => {if(i.presence.status == "online"){online++}})
            Client.guilds.cache.get(guild).members.cache.filter(i => {if(i.presence.status == "dnd"){dnd++}})
            var iconurl = msg.guild.iconURL()
            const embed = new discord.MessageEmbed()
                .setColor("#d8d8d8")
                .setTitle("Server Info")
                .setThumbnail(msg.guild.iconURL({dynamic:true}))
                .addFields({name:"🔤・Server Name", value:`> ${Client.guilds.cache.get(guild).name}`,inline:true},
                {name:"🆔・Server ID", value:`> ${Client.guilds.cache.get(guild).id}`,inline:true},
                {name:"👑・Owner", value:`> <@${Client.guilds.cache.get(guild).owner.id}>`,inline:true},
                {name:"📅・Created At", value:`> ${Client.guilds.cache.get(guild).createdAt.toLocaleDateString("tr")+ " " + Client.guilds.cache.get(guild).createdAt.toLocaleTimeString("tr")}`,inline:true},
                {name:"👤・Member Count ("+Client.guilds.cache.get(guild).memberCount+")", value:`> **Online** ${online}\n> **Dnd** ${dnd}`,inline:true},
                {name:"🏷️・Role Count", value:`> ${Client.guilds.cache.get(guild).roles.cache.size}`,inline:true},
                {name:"Channels",value:`> ${Client.guilds.cache.get("929435523402055712").emojis.cache.get("931247654107770891")} ${text} ${Client.guilds.cache.get("929435523402055712").emojis.cache.get("931247643609399417")} ${voice}`, inline:true},
                {name:"😸・Emoji Count", value:`> ${Client.guilds.cache.get(guild).emojis.cache.size}`,inline:true})
            msg.channel.send(embed)
        }
        else{
            msg.channel.send("Belirttiğiniz Sunucuda Bulunmuyorum Ya Da Yanlış Bir ID Girdiniz.")
        }
    }
}