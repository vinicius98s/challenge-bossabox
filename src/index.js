const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

global.db = require('./database/db');

const tools = require('./controllers/tools');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/tools', tools);

app.get('/', (req, res) => {
    res.send('VUTTR API');
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running on ${port}!`);
});

function normalizePort(val) {
var port = parseInt(val, 10);

if (isNaN(port)) {
    // named pipe
    return val;
}

if (port >= 0) {
    // port number
    return port;
}

return false;
}

module.exports = app;