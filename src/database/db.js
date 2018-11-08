const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://vinicius:vinicius123@ds155243.mlab.com:55243/bossabox-challenge", { useNewUrlParser: true })
            .then(conn => {
                console.log('Connected to database!');
                global.conn = conn.db("bossabox-challenge");
            })
            .catch(err => console.log(err))

const ObjectId = require('mongodb').ObjectId;

function findTools(callback){  
    global.conn.collection("tools").find({}).toArray(callback);
}

module.exports = { findTools }