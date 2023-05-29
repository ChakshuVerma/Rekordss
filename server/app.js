const dotenv = require('dotenv');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require("path")
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
dotenv.config({path: './config.env'});

const DB = process.env.DATABASE;
const PORT = process.env.PORT || 5000;

// Database Connection
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    // app.listen    
app.listen(PORT,() => console.log(`Server started at ${PORT}`));
    console.log('Connection Successful');
}).catch((err) => {
    console.log(err);
});

// Increasing the http request size
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use(express.static(path.join(__dirname, "./client/build")));

// Router
app.use(require('./router/auth'));

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}