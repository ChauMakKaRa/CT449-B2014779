const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})

router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createAt: new Date()
    });
    res.status(201).send();
});

router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id) });
    res.status(200).send();
})

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://localhost:27017/database_PTWEB',{
            useNewUrlParser: true,
        },
    );
    console.log('kết nối database thành công')

    return client.db('database_PTWEB').collection('posts');
}

module.exports = router;