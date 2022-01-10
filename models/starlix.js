const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

var schema = new Schema({
    guildID         : {type:String ,require:true},
    kanalkoruma     : {type:Boolean,require:true},
    kullanicikoruma : {type:Boolean,require:true},
    rolkoruma       : {type:Boolean,require:true},
    timeout         : {type:Array  ,require:false},
    timeout2        : {type:Array  ,require:false},
    kick            : {type:Array  ,require:false},
    ban             : {type:Array  ,require:false},
    reklamkoruma    : {type:Boolean,require:true},
    owokoruma       : {type:Boolean,require:true},
    spamkoruma      : {type:Boolean,require:true},
    jailkurulum     : {type:Boolean,require:true},
    cekilisler      : {type: Array, require: true},
    geridonusum     : {channels:Array, roles: Array, type:Array, require: true},
    sinirsizban     : {type:Array,require:true},
    tagkontrolayarlar      : {tagkontrol: Boolean,tags:Array,discriminatortags:Array,tagkanal:String,verilecekrol: String, type:Array ,require:true}
},{timestamps:true})

const starlix = mongoose.model("data",schema)

module.exports = starlix
