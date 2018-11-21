const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

global.db = require('./database/db');

const tools = require('./controllers/tools');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/tools', tools);

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
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