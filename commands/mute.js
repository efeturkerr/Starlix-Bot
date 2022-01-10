module.exports = {
    komut: "mute",
    async run(Client, msg, args) {
        const config = require("../config.json")
        if(msg.guild.members.cache.get(msg.author.id).permissions.has("MUTE_MEMBERS")){
            let muterole = msg.guild.roles.cache.find(role => role.name.toLowerCase().includes("muted") || role.name.toLowerCase().includes("susturulmuş"));
            var mmbr = msg.mentions.members.first();
            if(!mmbr) return msg.channel.send("Herhangi bir kişiyi etiketlemediniz.");
            if(mmbr.id == msg.guild.ownerID) return msg.channel.send("Hey, Sunucu Sahibini Susturamazsın!")
            if(mmbr.id == msg.author.id) return msg.channel.send("Hey, Kendini Susturamazsın!")
            if(mmbr.id == Client.user.id) return msg.channel.send("Hey, Beni Susturamazsın Yo Yo Ben Susmam!")
            var sure = msg.content.replace("<@!","").replace("> ","").replace(mmbr.id,"").replace(`${config.PREFIX}mute `,"").replace(">","").replace("<@","").replace("@","")
            if(!muterole){
                msg.guild.roles.create({data:{name:"Muted",permissions:66560}}).then(a => {msg.guild.channels.cache.map( x => {x.createOverwrite(a,{"SEND_MESSAGES": false})});mmbr.roles.add(a)})
                setTimeout(() => {if(mmbr.roles.cache.find(role => role.id == muted.id)){mmbr.roles.remove(muted)}},900000) 
                msg.channel.send("Muted Rolü Bulunamadığı İçin Yeni Bir Rol Oluşturuldu Ve Kullanıcı 15 Dakika Susturuldu.")
            } 
            else{
                let muted = msg.guild.roles.cache.find(role => role.name.toLowerCase().includes("muted") || role.name.toLowerCase().includes("susturulmuş"))
                mmbr.roles.add(muted);
                sure = sure.split(" ");
                let ms = 0;
                let tur = 0;
                if(sure.length > 4) return msg.channel.send("En Fazla 4 Adet Süre Belirten Değer Verebilirsiniz.")
                sure.filter(sr => {
                    if(isNaN(parseFloat(sr.substr(0,sr.length-1))) != false){
                        var index = sure.indexOf(sr);
                        if (index > -1) {
                          sure.splice(index, 1);
                        }
                    }
                    if(isNaN(parseFloat(sr.substr(0,sr.length-1))) == false){
                        var a = sr.substr(sr.length-1,sr.length+1).toLowerCase()
                        var num = sr.substr(0,sr.length-1)

                        if(a == "h"){
                            ms+= num*3600000
                        }

                        else if(a == "d"){
                            ms+= num*3600000*24
                        }

                        else if(a =="m"){
                            ms+= num*60000
                        }
                        else if(a == "s"){
                            ms += num*1000
                        }
                    }
                })
                if(sure.length==0){

                    setTimeout(() => {if(mmbr.roles.cache.find(role => role.id == muted.id)){mmbr.roles.remove(muted)}},15000);
                    return msg.channel.send("Herhangi bir süre belirtmediğinizden dolayı kullanıcı 15 dakika susturuldu.");

                }

                setTimeout(() => {if(mmbr.roles.cache.find(role => role.id == muted.id)){mmbr.roles.remove(muted)}},ms)
                msg.channel.send("Kullanıcı, Belirttiğiniz Süre Kadar Susturuldu.");
            }
        }
    }
}