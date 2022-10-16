let express = require('express');
let router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(1)
    console.log(req.body.cmd)
    res.send("works!")
});

router.get('/', function(req, res, next) {
    console.log(1)
    res.send("works 1")
});

module.exports = router;