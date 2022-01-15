module.exports = {
    komut: "slowmode",
    async run(Client, msg, args) {
        const config = require("../config.json")
        var sure = msg.content.replace(`${config.PREFIX}slowmode `,"").replace(`${config.PREFIX}slowmode`,"")
        var ms = 0;
        sure = sure.split(" ")
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
        if(ms == 0){
            msg.channel.setRateLimitPerUser(ms).then(a => {msg.channel.send("Slowmode Kapatıldı.")}).catch(a => {msg.channel.send("İşlem Sırasında Bir Hata Oluştu.")})
        }
        else if(ms < 21600000){
            ms = ms/1000
            msg.channel.setRateLimitPerUser(ms).then(a => {msg.channel.send("Bu Kanala "+ ms + " Saniye Slowmode Koyuldu.")})
        }
        else{
            msg.channel.send("En Fazla 6 Saat Slowmode Koyabilirsiniz!")
        }
    }
}