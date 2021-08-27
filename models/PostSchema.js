const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true
    },
    ownerid: {
        type: String,
        requred: true
    },
    owneremail: {
        type: String,
        requred: true
    },
    text: {
        type: String,
        requred: true
    },
    likes: {
        number: {
            type: Number,
            required: true
        },
        likeid: []
    },
    dislikes: {
        number: {
            type: Number,
            required: true
        },
        dislikeid: []
    }

})




const Post = mongoose.model('POST', PostSchema);

module.exports = Post;