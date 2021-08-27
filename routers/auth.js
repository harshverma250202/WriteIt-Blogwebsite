const express = require("express");
const User = require("../models/UserSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json())
const authenticate = require('../middleware/authenticate')



const router = express.Router();




// router.get("/", (req, res) => {
//     res.status(200).json({ message: "Made By Harsh Verma from IIT KGP" });
// });

router.post("/register", async function(req, res) {
    console.log('54')
    const { name, email, phone, password } = req.body;
    console.log(req.body)
    console.log(name, email, phone, password)
    if (!name || !email || !phone || !password) {
        //    return res.send('not complete info')
        return res.status(422).json({ error: "not complete info" });
    }
    try {
        const userexist = await User.findOne({ email });
        // console.log(userexist)
        if (userexist) {
            return res.status(400).json({ error: "user exist" });
        }

        const user = new User({ name, email, phone, password });

        const userreg = await user.save();
        if (userreg) {
            console.log("success saves data");
            res.status(201).json({ message: "user registered" });
        } else {
            return res.status(500).json({ error: "server error" });
        }
    } catch (err) {
        console.log(err);
    }
});

router.post("/login", async(req, res) => {
    console.log("akushdgfiabsvibaskjnvai;envkzjdnfkvn")
    const { email, password } = req.body;
    if (!email || !password) {
        //    return res.send('not complete info')
        return res.status(422).json({ error: "not complete info" });
    }
    try {
        const userexist = await User.findOne({ email });
        const isMatch = userexist ?
            await bcryptjs.compare(password, userexist.password) :
            false;

        if (!isMatch) {
            return res.status(422).json({ error: "invalid cred" });
        } else {
            const token = await userexist.generateAuthToken();
            // console.log(token)
            res.cookie("jwttoken", token, {
                expires: new Date(Date.now() + 2000000000),
                httpOnly: true,
            });
            return res.status(200).json({ userexist });
        }
    } catch (err) {
        console.log(err);
    }
});


router.get("/logout", async(req, res) => {
    await res.clearCookie("jwttoken", { path: "/" })
    console.log('tokencleared')
    return res.status(200).json({ message: "User logged off successfully!" })
})




router.get("/reacttodo", authenticate, (req, res) => {
    return res.status(200).send(req.rootUser)


})

module.exports = router;