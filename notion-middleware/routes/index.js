var express = require('express');
var router = express.Router();
const open = require('open')

/* GET home page. */
router.get('/', function(req, res, next) {

  let client_id = "082160e5-a0b7-46de-ba24-836a29fafdf2"

  async function openNotionAuth(){
    await open(`https://api.notion.com/v1/oauth/authorize?client_id=${client_id}&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A3005%2Fauth%2Fnotion%2Fcallback`, 
    {app: {name: 'google chrome'}})
  }
  
  openNotionAuth()

  res.render('index', { title: 'Express' });
});

module.exports = router;
