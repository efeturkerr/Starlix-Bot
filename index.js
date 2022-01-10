const discord  = require("discord.js");
const config   = require("./config.json")
const mongoose = require("mongoose");
const starlix  = require("./models/starlix")
const Client   = new discord.Client();
Client.commands = new discord.Collection();
const disbut = require('discord-buttons');
const { readdirSync } = require("fs");
const { join } = require("path")
disbut(Client)

const commandFiles = readdirSync(join(__dirname,"commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(join(__dirname, "commands", `${file}`));
	Client.commands.set(command.komut, command);
}

const dbURL = config.DBURL

mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true}).then(a => {
    console.log("Veri Tabanına Başarıyla Bağlanıldı.")
}).then(() => {Client.login(config.TOKEN);})

Client.on("ready", () =>{
    console.log(`${Client.user.username} Ready.`)
})

Client.on("guildCreate", (guild) =>{
    starlix.findOne({guildID: guild.id}).then(a => {if(a == undefined){
        const strx = new starlix({
            guildID          : guild.id,
            kanalkoruma      : true,
            kullanicikoruma  : true,
            rolkoruma        : true,
            reklamkoruma     : true,
            owokoruma        : true,
            spamkoruma       : true,
            jailkurulum      : false,
            cekilisler       : [],
            sinirsizban      : [],
            geridonusum      : [{channels:[]}, {roles: []}],
            tagkontrolayarlar: [{tagkontrol: false,tags:[],discriminatortags:[],tagkanal:"",verilecekrol:""}]
        })
        strx.save()
    }})

})


Client.on("clickButton", async (button) => {
    await button.reply.defer().catch(() => {})
    var db = await starlix.collection.findOne({guildID:button.message.guild.id})
    //console.log(db["cekilisler"])
    var katilanlar = db["cekilisler"].filter(zort => {if(zort[button.message.id] != undefined){return zort}})
    if(button.id == "cekilisekatil"&& katilanlar[0][button.message.id]["katilanlar"].includes(button.clicker.user.id) == false){
        //islem.arrayBilgiYazdir(button.guild.id,"cekilisler",button.message.id,"katilanlar",button.clicker.user.id)
        db["cekilisler"].filter((x) => {if(x[button.message.id] != undefined){x[button.message.id]["katilanlar"].push(button.clicker.user.id);}})
        await starlix.updateOne({guildID: button.guild.id}, {cekilisler: db["cekilisler"]})
        await button.channel.send("<@" + button.clicker.user.id+">, Çekilişe Başarı İle Katıldınız.").then(a => {setTimeout( () => {a.delete()},6000)})
    }
})

Client.on("channelDelete", async chnl =>{
    var settings = await starlix.collection.findOne({guildID:chnl.guild.id})

    if(settings.kanalkoruma){
        const logs = await chnl.guild.fetchAuditLogs({ limit: 1, type: 'CHANNEL_DELETE' });
        const logs2 = await chnl.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' });
        const log = logs.entries.first();
        if(settings["geridonusum"][0]["channels"].length<6 && log.changes[1].old === 0){
            if (Date.now() - log.createdTimestamp < 5000) {
                var schemaChannel = {name:log.changes[0].old,type:log.changes[1].old,permissionOverwrites:log.changes[2].old,nsfw:log.changes[3].old,rateLimitPerUser:log.changes[4].old}
                settings["geridonusum"][0]["channels"].push(schemaChannel)
                if(settings["geridonusum"][0]["channels"].length==6){
                    settings["geridonusum"][0]["channels"].splice(0,1);
                }
                await starlix.updateOne({guildID:chnl.guild.id}, {geridonusum:settings["geridonusum"]})

            }
        }

        var db = await starlix.collection.findOne({guildID:chnl.guild.id})
        if(db["timeout2"].find(i => {if(i[log.executor.id] != undefined){return 1}}) == undefined){
            var schema = {}
            schema[log.executor.id] = [log.target.id]
            db["timeout2"].push(schema)
            
            if (Date.now() - log.createdTimestamp < 5000 &&  log.executor.id!=chnl.guild.owner.id && chnl.guild.members.cache.get(log.executor.id).permissions.has("ADMINISTRATOR")!=true) {
                await starlix.updateOne({guildID: chnl.guild.id}, {timeout2: db["timeout2"]})
                setTimeout(async () => {
                    db["timeout2"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id] = [];await starlix.updateOne({guildID: chnl.guild.id}, {timeout2: db["timeout2"]}, {new: true}); return 1}})
                },900000)
            }
        }
        else{
            if(db["timeout2"].find(i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id].length <3){
                if (Date.now() - log.createdTimestamp < 5000 &&  log.executor.id!=chnl.guild.owner.id && chnl.guild.members.cache.get(log.executor.id).permissions.has("ADMINISTRATOR")==false) {    
                    db["timeout2"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id].push(log.target.id);await starlix.updateOne({guildID: chnl.guild.id}, {timeout2: db["timeout2"]}, {new: true}); return 1}})
                    if(db["timeout2"].find(async i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id].length== 3){
                        log.executor.send("Kanal Silme Sınırına Ulaştınız! Bir Kanal Daha Silerseniz Sunucudan Yasaklanacaksınız. Limit 15 Dakika İçinde Sıfırlanacaktır.")
                        setTimeout(async () => {
                            db["timeout2"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id] = [];await starlix.updateOne({guildID: chnl.guild.id}, {timeout2: db["timeout2"]}, {new: true}); return 1}})
                        },900000)
                    }
                }
            }
            else{
                db["timeout2"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id].push(log.target.id);await starlix.updateOne({guildID: chnl.guild.id}, {timeout2: db["timeout2"]}, {new: true}); return 1}})
                db["timeout2"].find(async i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id].map(i => {logs2.entries.map(b => {if(b.target.id == i){chnl.guild.channels.create(b.changes[0].old,{type:b.changes[1].old,permissionOverwrites:b.changes[2].old,nsfw:b.changes[3].old,rateLimitPerUser:b.changes[4].old}).then(p => {chnl.guild.owner.send("`"+b.changes[0].old+"` "+ "İsimli Kanal Yeniden Oluşturuldu.");db["timeout2"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id].splice(db["timeout2"].find(async i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id].indexOf(log.target.id),1);await starlix.updateOne({guildID: chnl.guild.id}, {timeout2: db["timeout2"]}, {new: true}); return 1}})})}})})
                
                if(chnl.guild.members.cache.get(log.executor.id).bannable == true){
                    chnl.guild.members.cache.get(log.executor.id).ban({reason:"4 Channel Delete."})
                    chnl.guild.owner.send("Merhaba, "+ "`"+chnl.guild.name+"`"+ " İsimli Sunucunuzda "+ "`"+chnl.guild.members.cache.get(log.executor.id).user.username+"`"+" Kullanıcı Adlı Üye 60 Saniye İçinde 4 Kanal Sildiğinden Dolayı Sunucudan Yasaklandı")
                }
                else{
                    chnl.guild.owner.send("Merhaba, "+ "`"+chnl.guild.name+"`"+ " İsimli Sunucunuzda "+ "`"+chnl.guild.members.cache.get(log.executor.id).user.username+"`"+" Kullanıcı Adlı Üye 60 Saniye İçinde 4 Kanal Sildi Fakat Kişiyi Banlamak İçin Yetkim Yoktu.")
                }
            }
            
        }
    }
})

Client.on("roleDelete", async (role) =>{ 
    var settings = await starlix.collection.findOne({guildID:role.guild.id})
    if(settings.rolkoruma){
        const logs = await role.guild.fetchAuditLogs({ limit: 1, type: 'ROLE_DELETE' });
        const logs2 = await role.guild.fetchAuditLogs({ type: 'ROLE_DELETE' });
        const log = logs.entries.first();

        if(settings["geridonusum"][1]["roles"].length<6){
            
            if (Date.now() - log.createdTimestamp < 5000) {
                var schemaRole = {data:{name:log.changes[0].old,hoist:log.changes[4].old,mentionable:log.changes[5].old,permissions:log.changes[1].old}}
                settings["geridonusum"][1]["roles"].push(schemaRole)
                if(settings["geridonusum"][1]["roles"].length==6){
                    settings["geridonusum"][1]["roles"].splice(0,1);
                }
                await starlix.updateOne({guildID:role.guild.id}, {geridonusum:settings["geridonusum"]})

            }
        }
        
        var db = await starlix.collection.findOne({guildID:role.guild.id})
        if(db["timeout"].find(i => {if(i[log.executor.id] != undefined){return 1}}) == undefined){
            var schema = {}
            schema[log.executor.id] = [log.target.id]
            db["timeout"].push(schema)
            
            if (Date.now() - log.createdTimestamp < 5000 &&  log.executor.id!=role.guild.owner.id && role.guild.members.cache.get(log.executor.id).permissions.has("ADMINISTRATOR")!=true) {
                await starlix.updateOne({guildID: role.guild.id}, {timeout: db["timeout"]})
                setTimeout(async () => {
                    db["timeout"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id] = [];await starlix.updateOne({guildID: role.guild.id}, {timeout: db["timeout"]}, {new: true}); return 1}})
                },900000)
                
            }
        }
        else{
            if(db["timeout"].find(i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id].length <3){
                if (Date.now() - log.createdTimestamp < 5000 &&  log.executor.id!=role.guild.owner.id && role.guild.members.cache.get(log.executor.id).permissions.has("ADMINISTRATOR")==false) {    
                    db["timeout"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id].push(log.target.id);await starlix.updateOne({guildID: role.guild.id}, {timeout: db["timeout"]}, {new: true}); return 1}})
                    if(db["timeout"].find(async i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id].length== 3){
                        log.executor.send("Rol Silme Sınırına Ulaştınız! Bir Rol Daha Silerseniz Sunucudan Yasaklanacaksınız. Limit 15 Dakika İçinde Sıfırlanacaktır.")
                        setTimeout(async () => {
                            db["timeout"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id] = [];await starlix.updateOne({guildID: role.guild.id}, {timeout: db["timeout"]}, {new: true}); return 1}})
                        },900000)
                    }
                }
            }
            else{
                db["timeout"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id].push(log.target.id);await starlix.updateOne({guildID: role.guild.id}, {timeout: db["timeout"]}, {new: true}); return 1}})
                db["timeout"].find(async i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id].map(i => {logs2.entries.map(b => {if(b.target.id == i){role.guild.roles.create({data:{name:b.changes[0].old,hoist:b.changes[4].old,mentionable:b.changes[5].old,permissions:b.changes[1].old}}).then(p => {role.guild.owner.send("`"+ b.changes[0].old+"`"+ " İsimli Rol Yeniden Oluşturuldu" );db["timeout"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id].splice(db["timeout"].find(async i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id].indexOf(log.target.id),1);await starlix.updateOne({guildID: role.guild.id}, {timeout: db["timeout"]}, {new: true}); return 1}})})}})})
                
                if(role.guild.members.cache.get(log.executor.id).bannable == true){
                    role.guild.members.cache.get(log.executor.id).ban({reason:"4 Role Delete."})
                    role.guild.owner.send("Merhaba, "+ "`"+role.guild.name+"`"+ " İsimli Sunucunuzda "+ "`"+role.guild.members.cache.get(log.executor.id).user.username+"`"+" Kullanıcı Adlı Üye 60 Saniye İçinde 4 Rol Sildiğinden Dolayı Sunucudan Yasaklandı")
                }
                else{
                    role.guild.owner.send("Merhaba, "+ "`"+role.guild.name+"`"+ " İsimli Sunucunuzda "+ "`"+role.guild.members.cache.get(log.executor.id).user.username+"`"+" Kullanıcı Adlı Üye 60 Saniye İçinde 4 Rol Sildi Fakat Kişiyi Banlamak İçin Yetkim Yoktu.")
                }
            }
            
        }
    }
})


Client.on("guildMemberRemove", async (mmbr) => {
    var db = await starlix.collection.findOne({guildID:mmbr.guild.id})
    if(db.kullanicikoruma){
        const logs = await mmbr.guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_KICK' });
        const log = logs.entries.first();

        if(db["kick"].find(i => {if(i[log.executor.id] != undefined){return 1}}) == undefined){
            var schema = {}
            schema[log.executor.id] = 0
            db["kick"].push(schema)
            if (Date.now() - log.createdTimestamp < 5000 &&  log.executor.id!=mmbr.guild.owner.id && mmbr.guild.members.cache.get(log.executor.id).permissions.has("ADMINISTRATOR")!=true) {
                await starlix.updateOne({guildID: mmbr.guild.id}, {kick: db["kick"]})
                setTimeout(async () => {   
                    db["kick"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id] = 0;await starlix.updateOne({guildID: mmbr.guild.id}, {kick: db["kick"]}, {new: true}); return 1}})
                },600000)
            }
        }
        else{ 
            
            if(db["kick"].find(i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id] <= 2){
                
                if (Date.now() - log.createdTimestamp < 5000 &&  log.executor.id!=mmbr.guild.owner.id && mmbr.guild.members.cache.get(log.executor.id).permissions.has("ADMINISTRATOR")==false) {
                    var sayi = db["kick"].find(i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id]
                    db["kick"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id] = sayi+1;await starlix.updateOne({guildID: mmbr.guild.id}, {kick: db["kick"]}, {new: true}); return 1}})
                    var db = await starlix.collection.findOne({guildID:mmbr.guild.id})
                    console.log(db["kick"])
                    if(db["kick"].find(i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id] == 2){
                        console.log("----")
                        log.executor.send("Kullanıcı Atma Sınırına Ulaştınız! Bir Kullanıcı Daha Atarsanız Sunucudan Yasaklanacaksınız. Limit 4 Dakika Sonra Sıfırlanacaktır.")
                        setTimeout(async () => {   
                            db["kick"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id] = 0;await starlix.updateOne({guildID: mmbr.guild.id}, {kick: db["kick"]}, {new: true}); return 1}})
                        },240000)
                    }
                }

            }
            
            else{
                var sayi = db["kick"].find(i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id]
                db["kick"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id] = sayi+1;await starlix.updateOne({guildID: mmbr.guild.id}, {kick: db["kick"]}, {new: true}); return 1}})
                db["kick"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id] = 0;await starlix.updateOne({guildID: mmbr.guild.id}, {kick: db["kick"]}, {new: true}); return 1}})
                        
                if(mmbr.guild.members.cache.get(log.executor.id).bannable == true){
                    mmbr.guild.members.cache.get(log.executor.id).ban({reason:"4 Member Kick."})
                    mmbr.guild.owner.send("Merhaba, "+ "`"+mmbr.guild.name+"`"+ " İsimli Sunucunuzda "+ "`"+mmbr.guild.members.cache.get(log.executor.id).user.username+"`"+" Kullanıcı Adlı Üye 60 Saniye İçinde Sunucudan 4 Kişi Attığından Dolayı Sunucudan Yasaklandı")
                }
                else{
                    mmbr.guild.owner.send("Merhaba, "+ "`"+mmbr.guild.name+"`"+ " İsimli Sunucunuzda "+ "`"+mmbr.guild.members.cache.get(log.executor.id).user.username+"`"+" Kullanıcı Adlı Üye 60 Saniye İçinde Sunucudan 4 Kişi Attı Fakat Kişiyi Banlamak İçin Yetkim Yoktu.")
                }
            }
            
        }
    }
})

Client.on("guildBanAdd", async guild => {
    var settings = await starlix.collection.findOne({guildID:guild.id})
    if(settings.kullanicikoruma){
        const logs = await guild.fetchAuditLogs({ limit: 1, type: 'MEMBER_BAN' });
        const log = logs.entries.first();

        if(settings["ban"].find(i => {if(i[log.executor.id] != undefined){return 1}}) == undefined){
            var schema = {}
            schema[log.executor.id] = 0
            settings["ban"].push(schema)
            if (Date.now() - log.createdTimestamp < 5000 &&  log.executor.id!=guild.owner.id && guild.members.cache.get(log.executor.id).permissions.has("ADMINISTRATOR")!=true) {
                await starlix.updateOne({guildID: guild.id}, {ban: settings["ban"]})
                setTimeout(async () => {   
                    settings["ban"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id] = 0;await starlix.updateOne({guildID: guild.id}, {kick: settings["kick"]}, {new: true}); return 1}})
                },600000)
            }
        }
        else{ 
            
            if(settings["ban"].find(i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id] < 2){
                
                if (Date.now() - log.createdTimestamp < 5000 &&  log.executor.id!=guild.owner.id && guild.members.cache.get(log.executor.id).permissions.has("ADMINISTRATOR")==false) {
                    var sayi = settings["ban"].find(i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id]
                    settings["ban"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id] = sayi+1;await starlix.updateOne({guildID: guild.id}, {ban: settings["ban"]}, {new: true}); return 1}})
                    
                    if(settings["ban"].find(i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id] == 2){
                        log.executor.send("Kullanıcı Yasaklama Sınırına Ulaştınız! Bir Kullanıcı Daha Yasaklarsanız Sunucudan Yasaklanacaksınız. Limit 4 Dakika Sonra Sıfırlanacaktır.")
                        setTimeout(async () => {   
                            settings["ban"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id] = 0;await starlix.updateOne({guildID: guild.id}, {ban: settings["ban"]}, {new: true}); return 1}})
                        },240000)
                    }
                }
            }
            
            else{
                var sayi = settings["ban"].find(i => {if(i[log.executor.id] != undefined){return 1}})[log.executor.id]
                settings["ban"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id] = sayi+1;await starlix.updateOne({guildID: guild.id}, {ban: settings["ban"]}, {new: true}); return 1}})
                settings["ban"].find(async i => {if(i[log.executor.id] != undefined){i[log.executor.id] = 0;await starlix.updateOne({guildID: guild.id}, {ban: settings["ban"]}, {new: true}); return 1}})
                        
                if(guild.members.cache.get(log.executor.id).bannable){
                    guild.members.cache.get(log.executor.id).ban({reason:"4 Member Ban."})
                    guild.owner.send("Merhaba, "+ "`"+guild.name+"`"+ " İsimli Sunucunuzda "+ "`"+guild.members.cache.get(log.executor.id).user.username+"`"+" Kullanıcı Adlı Üye 60 Saniye İçinde Sunucudan 4 Kişi Yasakladığından Dolayı Sunucudan Yasaklandı")
                }
                else{
                    guild.owner.send("Merhaba, "+ "`"+guild.name+"`"+ " İsimli Sunucunuzda "+ "`"+guild.members.cache.get(log.executor.id).user.username+"`"+" Kullanıcı Adlı Üye 60 Saniye İçinde Sunucudan 4 Kişi Yasakladı Fakat Kişiyi Banlamak İçin Yetkim Yoktu.")
                }
            }
            
        }
    }
})



Client.on("message", async (msg) => {
    if(!msg.content.startsWith(config.PREFIX)) return;
    const args = msg.content.slice(config.PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(!Client.commands.has(command)) return;

    try{
        Client.commands.get(command).run(Client, msg, args)
    } catch (error){
        console.error(error)
    }

    if(msg.author.id == "408785106942164992"){
        starlix.findOne({guildID: msg.guild.id},(err,result) => {if(err){}else{
            if(result.owokoruma == true&&!msg.channel.name.toLowerCase().includes("owo") && !msg.content.includes("leveled up!") ){
                msg.delete()
                msg.channel.send("Bu Kanalda OwO Oynayamazsınız.").then(a => {
                    setTimeout(() => {a.delete()}, 5000)
                })
            }
        }})
    }

})
