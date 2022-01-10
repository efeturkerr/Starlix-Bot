module.exports = {
    komut: "reroll",
    async run(Client, msg, args) {
        const discord = require("discord.js")
        const starlix  = require("../models/starlix")
        const config = require("../config.json")
        const disbut = require('discord-buttons');
        
        var kazanan_sahis;
        var msg_id = msg.content.replace(`${config.PREFIX}reroll `,"")
        var db = await starlix.collection.findOne({guildID:msg.guild.id})
        if(!msg_id) return msg.channel.send(`Çekiliş Mesajının ID'sini De Giriniz (${config.PREFIX}reroll ID).`)
        msg.channel.messages.fetch(msg_id).then(async (a) => {a.embeds.filter(c => {var winnerc = c.description.split("\n")[3].replace("🎊 Kazanan sayısı: ","");if(a.content == "Çekiliş Bitti!"){
            var katilanlar = db["cekilisler"].filter(zort => {if(zort[a.id] != undefined){return zort}})
            katilanlar = katilanlar[0][a.id]["katilanlar"]
            if(parseInt(winnerc) >= 1){
                kazanan_sahis = katilanlar[Math.floor(Math.random()*katilanlar.length)]
                msg.channel.send("Yeni Kazanan: <@"+kazanan_sahis+">")
            }

        }
        else if(a.content == "Çekiliş Zamanı!"){
            var katilanlar = db["cekilisler"].filter(zort => {if(zort[a.id] != undefined){return zort}})
            katilanlar = katilanlar[0][a.id]["katilanlar"]
            let button = new disbut.MessageButton()
            .setStyle("green")
            .setLabel("Çekilişe Katılmak İçin Tıkla!")
            .setID("cekilisekatil")
            .setDisabled()
            var embed = new discord.MessageEmbed()
                .setColor("#ff5656")
                .setDescription(`**Reroll Çekildi!**\nBir Yetkili Reroll Çekti!\nMessageID: ${msg_id}\n🎊 Kazanan sayısı: ${winnerc}`)
            a.edit("Reroll Çekildi!",{embed:embed ,button:button});
            if(parseInt(winnerc) >= 1){
                
                kazanan_sahis = katilanlar[Math.floor(Math.random()*katilanlar.length)]
                
                msg.channel.send("Kazanan: <@"+kazanan_sahis+">")
            }

        }
        else if(a.content == "Reroll Çekildi!"){
            var katilanlar = db["cekilisler"].filter(zort => {if(zort[a.id] != undefined){return zort}})
            katilanlar = katilanlar[0][a.id]["katilanlar"]
            if(parseInt(winnerc) >= 1){
                
                kazanan_sahis = katilanlar[Math.floor(Math.random()*katilanlar.length)]
                
                msg.channel.send("Yeni Kazanan: <@"+kazanan_sahis+">")
            }
        }
    })}).catch((err) => {console.log(err)})
    }
}