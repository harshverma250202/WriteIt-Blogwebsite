const express = require("express");
const Post = require("../models/PostSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticate = require('../middleware/authenticate')



const router = express.Router();


router.post('/post', authenticate, async(req, res) => {


    try {
        const text = req.body.text;
        console.log(req.body, 'democheck')
        const likes = { number: 0, likeid: [] };
        const dislikes = { number: 0, dislikeid: [] };
        const name = req.rootUser.name;
        const owneremail = req.rootUser.email;
        const ownerid = req.userID;
        // console.log(req.body.rootUser)
        // const name='check'
        const NewPost = new Post({ name, ownerid, owneremail, text, likes, dislikes })


        const newpost = await NewPost.save();
        if (newpost) {
            console.log("success saves data");
            res.status(201).json({ message: "Post saved" });
        } else {
            return res.status(500).json({ error: "server error" });
        }
    } catch (err) {
        console.log(err);
    }

})


router.put('/update/:id', authenticate, async(req, res) => {
    try {
        const text = req.body.text;
        console.log(req.body)
        const id = req.params.id


        const updatepost = await Post.findOneAndUpdate({ _id: id }, { $set: { text } })
        console.log(updatepost, req.userID)
        if (updatepost) {
            console.log("success saves data");
            res.status(201).json({ message: "Post updated" });
        } else {
            return res.status(500).json({ error: "server error" });
        }
    } catch (err) {
        console.log(err);
    }



})

router.put('/:constraint/:id', authenticate, async(req, res) => {
    try {

        const id = req.params.id;
        const con = req.params.constraint;
        userid = req.userID;
        console.log(userid)



        const post = await Post.findOne({ _id: id })
        if (post) {
            console.log("success saves data");
            like = post.likes.likeid.indexOf(userid)
            dislike = post.dislikes.dislikeid.indexOf(userid)
                // console.log(like,dislike,userid)
            if (con == 'like') {

                if (like < 0 && dislike < 0) {
                    post.likes.likeid.push(String(userid))


                    await Post.findOneAndUpdate({ _id: id }, { $set: { likes: { number: post.likes.number + 1, likeid: post.likes.likeid } } })
                }

                if (like < 0 && dislike >= 0) {

                    post.likes.likeid.push(String(userid))
                    let arr = post.dislikes.dislikeid.filter((e) => { return e != String(userid) })
                    console.log(arr);
                    await Post.findOneAndUpdate({ _id: id }, { $set: { likes: { number: post.likes.number + 1, likeid: post.likes.likeid }, dislikes: { number: post.dislikes.number - 1, dislikeid: arr } } })
                }




            } else if (con == 'dislike') {
                if (like < 0 && dislike < 0) {
                    post.dislikes.dislikeid.push(String(userid));
                    await Post.findOneAndUpdate({ _id: id }, { $set: { dislikes: { number: post.dislikes.number + 1, dislikeid: post.dislikes.dislikeid } } })
                }
                if (like >= 0 && dislike < 0) {
                    post.dislikes.dislikeid.push(String(userid));

                    let arr = post.likes.likeid.filter((e) => { return e != String(userid) })
                    console.log(arr);
                    await Post.findOneAndUpdate({ _id: id }, { $set: { likes: { number: post.likes.number - 1, likeid: arr }, dislikes: { number: post.dislikes.number + 1, dislikeid: post.dislikes.dislikeid } } })
                }
            }
            res.status(201).json({ message: con });
        } else {
            return res.status(500).json({ error: "server error" });
        }


    } catch (err) {
        console.log(err);
    }



})


router.delete('/delete/:id', authenticate, async(req, res) => {
    try {

        const id = req.params.id;


        const deletepost = await Post.findOneAndDelete({ _id: id })
        if (deletepost) {
            console.log("deleted post");
            res.status(201).json({ message: `Post deleted  ${id}` });
        } else {
            return res.status(500).json({ error: "server error" });
        }
    } catch (err) {
        console.log(err);
    }



})

router.get('/all', async(req, res) => {
    Post.find({}).then((data) => { return res.send(data) })
})

module.exports = router;