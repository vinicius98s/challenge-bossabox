const express = require('express');
const router = express.Router();
global.db = require('../database/db');

router.get('/', (req, res) => {
    db.findTools((err, result) => {
        if(err) return err;
        console.log(result);
        res.json(result);
    });
});

module.exports = router;