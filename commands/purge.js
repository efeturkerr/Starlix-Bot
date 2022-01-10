module.exports = {
    komut: "purge",
    async run(Client, msg, args) {
        const config = require("../config.json")
        if(msg.guild.members.cache.get(msg.author.id).hasPermission("MANAGE_MESSAGES")){
            if(msg.guild.me.hasPermission("MANAGE_MESSAGES")){
                var parameter = msg.content.replace(`${config.PREFIX}purge `,"")

                if(parseInt(parameter).toString() == "NaN") {msg.channel.send("Eksik ve ya yanlış bir değer girdiniz.")}
                if(parseInt(parameter).toString() != "NaN") {if(parseInt(parameter)>=451 || parseInt(parameter)<1){msg.channel.send("Girdiğiniz Değer 1 ve 450 Aralığında Olmalı")}}
                if(parseInt(parameter).toString() != "NaN" && parseInt(parameter)<=450 && parseInt(parameter)>0){
                    
                    for(var i = 0 ; i< Math.ceil(parseInt(parameter)/99)+1;i++){
                        if(parameter>99){
                            msg.channel.bulkDelete(99)
                            parameter-=99
                        }
                        else{
                            msg.channel.bulkDelete(parameter)
                            break;
                        }
                    }
                    
                }
            }
            else{
                msg.channel.send("Bu İşlemi Yapabilmem İçin `MANAGE_MESSAGES` Yetkisine Sahip Olmam Gerek")
            }
        }
        else{
            msg.channel.send("Bu İşlemi Yapmak İçin `MANAGE_MESSAGES` Yetkisine Sahip Olmalısınız.")
        }
    }
}