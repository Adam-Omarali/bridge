var express = require('express');
var router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


async function getAccessToken(code){
    const res = await fetch('https://api.notion.com/v1/oauth/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic MDgyMTYwZTUtYTBiNy00NmRlLWJhMjQtODM2YTI5ZmFmZGYyOnNlY3JldF9wY0ZiSDlYZFk2NUZKMXBvU2wxSHpSa0dVeHIzc2tGa29SS2dzaTc2UjZ2',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "http://localhost:3005/auth/notion/callback"
        })
    })

    return await res.json()
}

/* GET users listing. */
router.get('/notion/callback', async function(req, res, next) {

    let code = req.query.code
    let data = await getAccessToken(code)

    res.redirect('../../changes?v=' + data.access_token)

});

module.exports = router;