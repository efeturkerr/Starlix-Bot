module.exports = {
    komut: "sesecek",
    async run(Client, msg, args) {
        var mmbr = msg.mentions.members.first()
        if(!mmbr) return msg.channel.send("Bir Kullanıcı Etiketlemelisiniz.")
        if(!msg.guild.members.cache.get(msg.author.id).voice.channel) return msg.channel.send("Herhangi Bir Ses Kanalında Değilsiniz.")
        if(!mmbr.voice.channel) return msg.channel.send("Belirttiğiniz Kullanıcı Herhangi Bir Ses Kanalında Değil.")
        mmbr.voice.setChannel(msg.guild.members.cache.get(msg.author.id).voice.channel).then(a => {msg.channel.send("Kullanıcı Başarıyla Ses Kanalına Çekildi")}).catch(a => {msg.channel.send("İşlem Sırasında Bir Hata Oluştu.")})
    }
}