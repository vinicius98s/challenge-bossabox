const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://vinicius:vinicius123@ds155243.mlab.com:55243/bossabox-challenge", { useNewUrlParser: true }, (err, conn) => {
    if(err) return err;
    console.log('Connected to database!');
    global.conn = conn.db('bossabox-challenge');
});

const ObjectId = require('mongodb').ObjectId;

findTools = callback => {  
    global.conn.collection('tools').find({}).toArray(callback);
};

findTool = (tag, callback) => {
    global.conn.collection('tools').find({ tags: tag }).toArray(callback);
};

insertTool = (data, callback) => {
    global.conn.collection('tools').insertOne(data, callback);
};

deleteTool = (id, callback) => {
    global.conn.collection('tools').deleteOne({ '_id': ObjectId(id) }, callback);
};

module.exports = { findTools, findTool, insertTool, deleteTool }