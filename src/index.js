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

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000!');
});

module.exports = app;