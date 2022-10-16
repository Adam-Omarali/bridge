var express = require('express');
var router = express.Router();
const { Client } = require('@notionhq/client');


async function searchPage(notion, query){
    const response = await notion.search({
        query: query,
        sort: {
          direction: 'descending',
          timestamp: 'last_edited_time',
        },
        filter: {
            value: 'page',
            property: 'object'
        }
      });
    return response
}

async function deletePage(notion, id){

    const response = await notion.pages.update({
    page_id: id,
    archived: true
  });

}

async function createPage(notion){

    let database_id = "7efcd3c2379b4fb69d382dc8a3009a4d"

    const response = await notion.pages.create({
        "parent": {
            "type": "database_id",
            "database_id": database_id
        },
        "properties": {
            "Name": {
                "title": [
                    {
                        "text": {
                            "content": "Tuscan kale"
                        }
                    }
                ]
            }
        },
    });

    // console.log(response)

}

/* GET users listing. */
router.get('/', async function(req, res, next) {

    let access_token = req.query.v

    const notion = new Client({
        auth: access_token
    })

    // await createPage(notion)

    const ret = (await searchPage(notion, 'life')).results
    console.log(ret)
    // for(let i = 0; i < ret.length; i++){
    //     await deletePage(notion, ret[i].id)
    // }

    //updates

    res.send('changes');
});

module.exports = router;
