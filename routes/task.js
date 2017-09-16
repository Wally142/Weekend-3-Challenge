var router = require('express').Router();



router.get('/', function (req, res) {
    console.log('Get that Route')
    res.sendStatus(202);
});

 router.post('/', function(req, res) {
    console.log('Post that Route', req.body)
    res.sendStatus(201);
});

module.exports = router;