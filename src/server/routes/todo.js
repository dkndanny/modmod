import express from 'express';
import bodyParser from 'body-parser';

let router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    const db = req.db;
    const todos = db.get('todos');
    todos.find({}, (err, docs) => {
        res.json({
            "todos": docs
        });
    });
});

router.post('/create', jsonParser, (req, res) => {
    const db = req.db;
    const todos = db.get('todos');
    if (req.body && req.body.text) {
        todos.insert({
            "text": req.body.text
        }, (err, doc) => {
            if (err) {
                console.error(err);
                res.json({
                    "success": false,
                    "error": "Datebase insertion failed."
                });
            }
            res.json({
                "success": true,
                "todo": doc
            });
        });
    } else {
        res.json({
            "success": false,
            "error": "Todo text needed."
        });
    }
});

router.post('/edit', jsonParser, (req, res) => {
    const db = req.db;
    const todos = db.get('todos');
    if (req.body && req.body._id && req.body.text) {
        todos.updateById(req.body._id, {
            "text": req.body.text
        }, (err, doc) => {
            if (err) {
                console.error(err);
                res.json({
                    "success": false,
                    "error": "Datebase update failed."
                });
            }
            res.json({
                "success": true
            });
        });
    } else {
        res.json({
            "success": false,
            "error": "Todo id and text needed."
        });
    }
});

router.post('/delete', jsonParser, (req, res) => {
    const db = req.db;
    const todos = db.get('todos');
    if (req.body && req.body._id) {
        todos.remove({
            "_id": req.body._id
        }, (err, doc) => {
            if (err) {
                console.error(err);
                res.json({
                    "success": false,
                    "error": "Datebase deletion failed."
                });
            }
            res.json({
                "success": true
            });
        });
    } else {
        res.json({
            "success": false,
            "error": "Todo id needed."
        });
    }
});

export default router;
