module.exports = {
    komut: "userinfo",
    async run(Client, msg, args) {
        const discord = require("discord.js")
        const config = require("../config.json")

        var id = msg.content.replace(`${config.PREFIX}userinfo `,"").replace(`${config.PREFIX}userinfo`,"").replace(" ","")
        var member = msg.mentions.members.first()
        //if(!member && !msg.guild.members.cache.get(id)) id = msg.author.id
        
        if(msg.content == `${config.PREFIX}userinfo`){
            var embed = new discord.MessageEmbed()
                .setColor("#00ffff")
                .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic:true}))
                .setDescription(`**<@${msg.author.id}> 'nin Kullanıcı Bilgileri.\n\n✮ Hesabın Açılma Tarihi ・ ${msg.author.createdAt.toLocaleDateString("tr")+ " "+msg.author.createdAt.toLocaleTimeString("tr")}\n\n✮ Sunucuya Katılma Tarihi ・ ${msg.guild.members.cache.get(msg.author.id).joinedAt.toLocaleDateString("tr")+" "+msg.guild.members.cache.get(msg.author.id).joinedAt.toLocaleTimeString("tr")}\n\n✮ Kullanıcı Durumu ・ ${msg.author.presence.status.replace("dnd","Rahatsız Etme").replace("offline","Çevrimdışı").replace("idle","Boşta").replace("online"," Çevrimiçi").replace("invisible","Görünmez") }\n\n✮ Kullanıcının ID'si ・ ${msg.author.id}\n\n✮ Kullanıcının Sahip Olduğu En Yüksek Rol ・ <@&${msg.guild.members.cache.get(msg.author.id).roles.highest.id}>**`)
            msg.channel.send(embed)
        }
        else if(member){
            var embed = new discord.MessageEmbed()
                .setColor("#00ffff")
                .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic:true}))
                .setDescription(`**<@${member.id}> 'nin Kullanıcı Bilgileri.\n\n✮ Hesabın Açılma Tarihi ・ ${member.user.createdAt.toLocaleDateString("tr")+ " "+member.user.createdAt.toLocaleTimeString("tr")}\n\n✮ Sunucuya Katılma Tarihi ・ ${member.joinedAt.toLocaleDateString("tr")+" "+member.joinedAt.toLocaleTimeString("tr")}\n\n✮ Kullanıcı Durumu ・ ${member.presence.status.replace("dnd","Rahatsız Etme").replace("offline","Çevrimdışı").replace("idle","Boşta").replace("online"," Çevrimiçi").replace("invisible","Görünmez") }\n\n✮ Kullanıcının ID'si ・ ${member.id}\n\n✮ Kullanıcının Sahip Olduğu En Yüksek Rol ・ <@&${member.roles.highest.id}>**`)
            msg.channel.send(embed)
        }
        else if(msg.guild.members.cache.get(id)){
            var member = msg.guild.members.cache.get(id);
            var embed = new discord.MessageEmbed()
                .setColor("#00ffff")
                .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic:true}))
                .setDescription(`**<@${member.id}> 'nin Kullanıcı Bilgileri.\n\n✮ Hesabın Açılma Tarihi ・ ${member.user.createdAt.toLocaleDateString("tr")+ " "+member.user.createdAt.toLocaleTimeString("tr")}\n\n✮ Sunucuya Katılma Tarihi ・ ${member.joinedAt.toLocaleDateString("tr")+" "+member.joinedAt.toLocaleTimeString("tr")}\n\n✮ Kullanıcı Durumu ・ ${member.presence.status.replace("dnd","Rahatsız Etme").replace("offline","Çevrimdışı").replace("idle","Boşta").replace("online"," Çevrimiçi").replace("invisible","Görünmez") }\n\n✮ Kullanıcının ID'si ・ ${member.id}\n\n✮ Kullanıcının Sahip Olduğu En Yüksek Rol ・ <@&${member.roles.highest.id}>**`)
            msg.channel.send(embed)
        }
        else
        {
            msg.channel.send("Bir Kullanıcı Etiketlemelisiniz Ve Ya Geçerli Bir ID Girmelisiniz.")
        }
    }
}