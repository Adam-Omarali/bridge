let express = require("express");
let router = express.Router();
let data = require("../lib/data.json")

router.get("/", function (req, res, next) {
    console.log(data.method)
    res.json(data.method);
});

module.exports = router;
