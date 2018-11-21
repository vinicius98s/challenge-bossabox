const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

global.db = require('./database/db');

const tools = require('./controllers/tools');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/tools', tools);

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req, res) => {
    res.send('VUTTR API');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});

module.exports = app;