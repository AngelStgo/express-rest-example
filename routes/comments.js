const express = require('express');
const router = express.Router();

const comments = require("../data/comments");

router
    .route('/')
    .get((req, res) => {
       res.json(comments) // import parameter
    }
)

    .post((req, res) => {
        // if(req.body)
        const newComment = {
            id: Number(comment[comments.length -1].id) + 1,
            userId:  req.body.userId,
            postId:  req.body.postId,
            body: req.body.body,
        }
        comments.push(newComment)
        res.json(newComment)
    })
router  
    .route('/:commentID')
    .get((req, res) => {
        const comment = comments.find(comment => comment.id === req.params.commentID)
        res.json(comment)
    })

module.exports = router;