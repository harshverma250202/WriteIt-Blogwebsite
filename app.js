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
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running live at Localhost:${PORT} `)
});