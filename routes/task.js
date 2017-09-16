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
    


 router.post('/', function(req, res) {
     console.log('In post route', req.body);
     var newTask = req.body;
     pool.connect(function (error, client, done) {
         if (error) {
             console.log(error);
             res.sendStatus(500);
         } else {
             var queryString = 'INSERT INTO list (task) VALUES ($1);';
             var chores = [newTask]; 
            client.query(queryString, [newTask], function (queryErr, resultObj) {
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

module.exports = router;