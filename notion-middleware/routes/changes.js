var express = require('express');
var router = express.Router();
const { Client } = require('@notionhq/client');
const { updatePage } = require('@notionhq/client/build/src/api-endpoints');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


async function getMethod(){
    const res = await fetch("http://localhost:3000/method", {
        method: 'GET'
    })
    return await res.json()
}


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

// async function updatePage(notion, id){
//     const response = await notion.pages.update({
//         page_id: id,
//         properties: {
//             "Details": {
//                 "rich_text": [
//                   {
//                     "type": "text",
//                     "text": {
//                       "content": "Some more text with "
//                     }
//                   },
//             ]}
//         }})
// }

async function deletePage(notion, id){

    const response = await notion.pages.update({
    page_id: id,
    archived: true
  });

}

async function createPage(notion){

    let database_id = "2de77b6978cf40ad90403c54fa970b6e"

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
                            "content": "Just created a new page!"
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

    const method = await getMethod()

    console.log(method)
    console.log(1)
    if(method === "Create"){
        await createPage(notion)
    }
    else if(method === "Delete"){
        const ret = (await searchPage(notion, 'delete')).results
        await deletePage(notion, ret[0].id)
    }
    // else{
    //     const ret = (await searchPage(notion, 'update')).results
    //     await updatePage(notion, ret[0].id)
    // }

    // for(let i = 0; i < ret.length; i++){
    //     await deletePage(notion, ret[i].id)
    // }

    //updates

    res.send('changes');
});

module.exports = router;
