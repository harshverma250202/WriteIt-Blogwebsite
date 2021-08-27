const jwt = require("jsonwebtoken")
const User = require("../models/UserSchema")
    // const express = require('express');
    // const app = express();
    // const cookie = require("cookie-parser");
    // app.use(cookie())
const authenticate = async(req, res, next) => {
    try {
        const token = req.cookies.jwttoken;
        const verifyToken = jwt.verify(token, process.env.SecretKey)
        console.log('valid authenticate');
        const rootUser = await User.findOne({ _id: verifyToken._id, tokens: token });
        if (!rootUser) {
            throw new Error("User Not found")
        }
        // console.log("Trying to set req params")
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        // console.log("success in setting req params");
        next();

    } catch (err) {
        // console.log(err)
        console.log("not verified in authenticate")
        res.status(401).send("Unauthorized : No token provided ")
    }
}
module.exports = authenticate;