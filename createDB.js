var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Griffin");
var Hero = require("./models/Person.js").Hero;
var data = require("./data.js").data;
var async = require("async");

function open(callback){
    mongoose.connection.on("open",callback)
}
function dropDB(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback)
}
function createHeroes(callback){
    async.each(data,function(heroData,callback) {
        var hero = new Hero(heroData);
        hero.save(callback)
    }, callback)
}

async.series([
    open,
    dropDB,
    createHeroes
], function(err){
    if(err) throw err;
    console.log("Ok");
    mongoose.connection.close()
});