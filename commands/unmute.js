module.exports = {
    komut: "unmute",
    async run(Client, msg, args) {
        if(msg.guild.members.cache.get(msg.author.id).permissions.has("MUTE_MEMBERS")){
            let muted = msg.guild.roles.cache.find(role => role.name.toLowerCase().includes("muted") || role.name.toLowerCase().includes("susturulmuş"))
            var member = msg.mentions.members.first();
            if(!member) return msg.channel.send("Bir Kullanıcıyı Etiketlemelisiniz.")
            if(member.roles.cache.find(role => role.name.toLowerCase().includes("muted") || role.name.toLowerCase().includes("susturulmuş")) != undefined){
                member.roles.remove(muted).catch(x => {msg.channel.send("İşlem Sırasında Bir Hata Oluştu.")}).then((x) => {msg.channel.send("Kullanıcının Susturulması Başarıyla Kaldırıldı")})
            }
            else{
                msg.channel.send("Bu Kullanıcının Zaten Susturması Yok")
            }
        }
    }
}