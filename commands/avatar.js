module.exports = {
    komut: ("avatar" || "av"),
    async run(Client, msg, args) {
        const discord = require("discord.js")
        const config = require("../config.json")
        if(msg.content == `${config.PREFIX}avatar` || msg.content == `${config.PREFIX}av`){
            const embed = new discord.MessageEmbed()
                .setImage(msg.author.displayAvatarURL({dynamic:true,size: 2048}))
                .setTitle("URL")
                .setColor("#c90808")
                .setURL(msg.author.displayAvatarURL({dynamic:true}))
                .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic:true,size: 2048}))
            msg.channel.send(embed)
        }
        else{
            var value = msg.content.toLowerCase().replace(`${config.PREFIX}avatar `,"").replace(`${config.PREFIX}av `, "");
            var memberCount = msg.guild.memberCount;
            var allMembers = msg.guild.members["cache"].firstKey(memberCount);
            for(var i=0; i<memberCount; i++){
                var valueid = value.replace("<","").replace("@","").replace("!","").replace(">","");
                if(value[0] == "<"){
                    var newValue = value.replace("<","").replace("@","").replace("!","").replace(">","");
                    if(msg.guild.members.cache.get(allMembers[i])["user"].id.toString() == newValue.toString()){
                        var avatarURL = msg.guild.members.cache.get(allMembers[i])["user"].displayAvatarURL({dynamic:true,size: 2048});
                        const embed = new discord.MessageEmbed()
                            .setImage(avatarURL)
                            .setTitle("URL")
                            .setColor("#c90808")
                            .setURL(avatarURL)
                            .setAuthor(msg.author.username, msg.author.avatarURL({dynamic:true,size: 2048}))
                        msg.channel.send(embed)
                    }
                }
                else if(msg.guild.members.cache.get(valueid) != undefined){
                    var avatarURL = msg.guild.members.cache.get(valueid)["user"].displayAvatarURL({dynamic:true,size: 2048});
                    const embed = new discord.MessageEmbed()
                        .setImage(avatarURL)
                        .setTitle("URL")
                        .setColor("#c90808")
                        .setURL(avatarURL)
                        .setAuthor(msg.author.username, msg.author.avatarURL({dynamic:true,size: 2048}))
                    msg.channel.send(embed)
                    break;
                }
                var member = msg.guild.members.cache.get(allMembers[i])["user"].username.toLowerCase().includes(value)
                var member2 = msg.guild.members.cache.get(allMembers[i]).nickname
                if(member2 != null){
                    member2 = member2.toLowerCase().includes(value)
                }
                
                if(member == true || member2 == true){
                    var avatarURL = msg.guild.members.cache.get(allMembers[i])["user"].displayAvatarURL({dynamic:true,size: 2048});
                    const embed = new discord.MessageEmbed()
                        .setImage(avatarURL)
                        .setTitle("URL")
                        .setColor("#c90808")
                        .setURL(avatarURL)
                        .setAuthor(msg.author.username, msg.author.avatarURL({dynamic:true,size: 2048}))
                    msg.channel.send(embed)
                    break;
                }
            }

        }
    }
}
