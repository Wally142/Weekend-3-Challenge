var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function (req, res) {
    console.log('Get that Route')
    pool.connect(function (error, client, done) {
        if (error) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM list;', function (queryErr, resultObj) {
                done();
                if (queryErr) {
                    console.log(queryErr);
                    res.sendStatus(500);
                } else {
                    console.log(resultObj.rows);
                    res.send(resultObj.rows);
                }
            });
        }
    })
});


router.post('/', function (req, res) {
    console.log('In post route', req.body);
    var newTask = req.body;
    pool.connect(function (error, client, done) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            var queryString = 'INSERT INTO list (task, complete) VALUES ($1, $2);';
            var chores = [newTask.task, newTask.complete];
            client.query(queryString, chores, function (queryErr, resultObj) {
                done();
                if (queryErr) {
                    res.sendStatus(500)
                } else {
                    res.sendStatus(201)
                }
            });
        }
    })
});


router.delete('/:id', function (req, res) {
    var dbId = req.params.id;
    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            client.query('DELETE FROM list WHERE id = $1;', [dbId], function (queryErr, result) {
                done();
                if (queryErr) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
            });
        }
    }
    )
});


router.put('/:id', function (req, res) {
    var update = req.params.id;
    //var fin = req.body;
    console.log('put complete', update);
    pool.connect(function (conErr, client, done) {
        if (conErr) {
            console.log(conErr);
            res.sendStatus(500);
        } else {
            client.query('UPDATE list SET complete = true WHERE complete = false AND id = $1', [update], function (queryErr, result) {
                done();
                if (queryErr) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(202);
                }
            });
        }
    }
    )
});


module.exports = router;