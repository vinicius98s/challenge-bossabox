const express = require('express');
const router = express.Router();
global.db = require('../database/db');

router.get('/', (req, res) => {
    const tag = req.query.tag;
    console.log(tag);

    if(!tag) {
        db.findTools((err, result) => {
            if(err) return err;
            res.json(result);
        });
    } else {
        db.findTool(tag, (err, result) => {
            if(err) return err;
            res.json(result);
        });
    }
});

router.post('/', (req, res) => {
    const tool = req.body;

    db.insertTool(tool, (err, result) => {
        if(err) return err;
        res.json(result.ops[0]);
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    db.deleteTool(id, (err, result) => {
        if(err) return err;
        res.json(result);
    });
});

module.exports = router;