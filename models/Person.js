var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var heroSchema = mongoose.Schema({
    title: String,
    nick: {
        type: String,
        unique: true,
        required: true
    },
    avatar: String,
    desc: String,
    created:{
        type:Date,
        default: Date.now
    }
});
exports.Hero = mongoose.model('Hero', heroSchema);