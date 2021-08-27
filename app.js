const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

dotenv.config({ path: './.env' });
require('./databases/conn');
const cookie = require("cookie-parser");
app.use(cookie())

app.use(express.json())




app.use(require('./routers/auth'))
app.use(require('./routers/posts'))
const PORT = process.env.PORT||5000;


if ( process.env.NODE_ENV == "production"){

    app.use(express.static("client/build"));

    const path = require("path");

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    })


}

app.listen(PORT, () => {
    console.log(`Server running live at Localhost:${PORT} `)
});