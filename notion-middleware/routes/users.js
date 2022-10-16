var express = require('express');
var router = express.Router();
const open = require('open');

/* GET users listing. */
router.get('/', function(req, res, next) {
  async function openNotion(){
    await open('https://notion.so', {app: {name: 'google chrome'}})
  }
  
  openNotion()
  res.send('respond with a resource');
});

module.exports = router;
