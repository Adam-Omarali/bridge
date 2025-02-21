var express = require('express');
var router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function getAccessToken(code) {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const res = await fetch("https://api.notion.com/v1/oauth/token", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Basic ${encoded}`,
        },
        body: JSON.stringify({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "http://localhost:3005/auth/notion/callback",
        }),
    });

    return await res.json();
}

/* GET users listing. */
router.get('/notion/callback', async function(req, res, next) {
    let code = req.query.code;
    let data = await getAccessToken(code);

    // Redirect back to React app with token
    res.redirect(`http://localhost:3001?token=${data.access_token}`);
});

// router.post('/notion/callback', async function(req, res) {
//     const { code } = req.body;
    
//     try {
//         const data = await getAccessToken(code);
//         console.log('Token exchange response:', data);
//         res.json(data);
//     } catch (error) {
//         console.error('Error getting access token:', error);
//         res.status(500).json({ error: 'Failed to get access token' });
//     }
// });

module.exports = router;