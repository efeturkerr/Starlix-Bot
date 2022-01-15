module.exports = {
    komut: "toplurolal",
    async run(Client, msg, args) {
        var role = msg.mentions.roles.first()
        if(!role) return msg.channel.send("Bir Rol Etiketlemelisiniz!")
        var messg = msg.channel.send("İşlem Yapılıyor...")
        if(msg.guild.members.cache.get(Client.user.id).roles.highest.position<role.position) return msg.channel.send("Bu Rol Beni Rolümden Yukarıda! Bu İşlemi Yapamam.")
        msg.guild.members.cache.map(b => {
            b.roles.remove(role)
        })
        messg.then(i => {if(i.editable == true){i.edit("İşlem Tamamlandı.")}})
    }
}