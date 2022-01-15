module.exports = {
    komut: "çekiliş",
    async run(Client, msg, args) {
        const disbut = require('discord-buttons');
        const discord = require("discord.js")
        const starlix  = require("../models/starlix")
        const config = require("../config.json")
        var ms  = 0;
        var db = await starlix.collection.findOne({guildID:msg.guild.id})
        var item = msg.content.replace(`${config.PREFIX}çekiliş `,"").replace(`${config.PREFIX}çekiliş`,"");
        var winnercount;
        var string ="";
        var sure = item.split(" ")
        sure.shift()
        sure.filter(sr => {
            if(isNaN(parseFloat(sr.substr(0,sr.length-1))) == false){
                item = item.replace(sr,"")
                var timeParameter = sr.substr(sr.length-1,sr.length+1).toLowerCase()
                var num = sr.substr(0,sr.length-1)

                if(timeParameter == "h"){
                    ms+= num*3600000
                    string+= num+ " Saat "
                }
                if(timeParameter == "d"){
                    ms+= num*3600000*24
                    string+= num+ " Gün "
                }
                if(timeParameter == "w"){
                    winnercount = num
                }
                if(timeParameter =="m"){
                    ms+= num*60000
                    string+= num+ " Dakika "
                }
                if(timeParameter == "s"){
                    ms += num*1000
                    string+= num + " Saniye "
                }
            }
        })
        
        
        if(ms == 0) return msg.channel.send("Bir Süre Belirmediniz.")
        if(!winnercount) return msg.channel.send("Kazanan Sayısını Belirtmediniz.")
        if(item.split(" ").length-1 == item.length) return msg.channel.send("Çekilişi Yapılacak Nesneyi Belirmediniz.")

        let button = new disbut.MessageButton()
            .setStyle("green")
            .setLabel("Çekilişe Katılmak İçin Tıkla!")
            .setID("cekilisekatil")

        var schema = {}
        var embed = new discord.MessageEmbed()
            .setColor("#ff5656")
            .setDescription(`**${item}**\n\n🎁 Çekilişe katılmak için aşağıdaki butona tıklayın!\n🎊 Kazanan sayısı: ${winnercount}\n✨ Oluşturan: <@${msg.author.id}>\n🕐 Süre: ${string}`)
        msg.channel.send("Çekiliş Zamanı!",{embed:embed,button:button}).then(async a => {
            
            schema[a.id] = {"katilanlar": []};
            db["cekilisler"].push(schema)
            await starlix.updateOne({guildID: msg.guild.id}, {cekilisler: db["cekilisler"]})
            setTimeout(async () => {
                if(a.deletable == true && a.content == "Çekiliş Zamanı!"){
                    var db = await starlix.collection.findOne({guildID:a.guild.id})
                    var kazananlar = []
                    var katilanlar = db["cekilisler"].filter(x => {if(x[a.id] != undefined){return x}})
                    katilanlar = katilanlar[0][a.id]["katilanlar"]
                    if(katilanlar.length < winnercount){a.edit("Katılım Yetersiz",{embed: embed.setDescription(`**${item} Çekiliş Katılım Yetersizliğinden Dolayı İptal Olmuştur**\n\n✨ Oluşturan: <@${msg.author.id}>\n🎊 Kazanan sayısı: ${winnercount}`),button:button.setDisabled()});return msg.channel.send(a.url+"\n Bu Çekiliş Katılım Yetersizliğinden Dolayı İptal Olmuştur.")}
                    if(winnercount == 1){
                        var kazananSahis = katilanlar[Math.floor(Math.random()*katilanlar.length)]
                        var embed1 = new discord.MessageEmbed()
                            .setColor("#ff5656")
                            .setDescription("**"+item+ " Çekilişi Sona Erdi! Kazanan: <@"+kazananSahis+">**" )
                        a.channel.send("@everyone & @here",{embed:embed1})
                        a.edit("Çekiliş Bitti!",{embed: embed.setDescription(`**${item} Çekilişi Bitti!**\n\n✨ Oluşturan: <@${msg.author.id}>\n🎊 Kazanan sayısı: ${winnercount}\nKazanan: <@${kazananSahis}>`),button:button.setDisabled()});
                    }
                    else{
                        var str = item+ " Çekilişi Sona Erdi! \n\n Kazananlar:"
                        var kazananlarString= ""
                        function yap(){
                            var kazananSahis = katilanlar[Math.floor(Math.random()*katilanlar.length)]
                            if(kazananlar.includes(kazananlar)){
                                yap()
                            }
                            else{
                                kazananlar.push(kazananSahis);
                            }
                        }
                        for(var i =0; i<winnercount; i++){
                            var kazananSahis = katilanlar[Math.floor(Math.random()*katilanlar.length)]
                            if(kazananlar.includes(kazananlar)){
                                yap();
                            }
                            else{
                                kazananlar.push(kazananSahis);
                            }
                        }
                        for(var s = 0; s< winnercount;s++){
                            str+= " <@"+kazananlar[s]+"> "
                            kazananlarString += " <@"+kazananlar[s]+"> "
                        }
                        var embed1 = new discord.MessageEmbed()
                            .setColor("#ff5656")
                            .setDescription(str)
                            
                        a.channel.send("@everyone & @here",{embed:embed1})
                        a.edit("Çekiliş Bitti!",{embed: embed.setDescription(`**${item} Çekilişi Bitti!**\n\n✨ Oluşturan: <@${msg.author.id}>\n🎊 Kazanan sayısı: ${winnercount}\nKazananlar: ${kazananlarString}`),button:button.setDisabled()});
                    }
                }
            },ms)
        })
    }
}