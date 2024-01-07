require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const registrationController = require('./controller/registrationController');
const loginController = require('./controller/loginController');
const userPreferenceController = require('./controller/userPreferenceController');
const authJWT = require('./middlewares/authJWT');
const { default: mongoose } = require('mongoose');

const app = express();

mongoose
    .connect('mongodb://127.0.0.1:27017/new-aggregator')
    .then((data) => {console.log("mongo db connected successfully");})
    .catch((err) => {console.log(`mongo db not connected due to :  ${err}`);});

app.use(bodyParser.json());



app.get('/',(req, res)=>{
    return res.send("hello world");
});

app.use('/register', registrationController);
app.use('/login', loginController);
app.use('/user-preference', authJWT.authenticateJWT, userPreferenceController);

//global exception handler 
app.use((error, req, res, next) => {
    console.log(`error in global handler ${error}`);
    
    res
    .status(error.statusCode)
    .json({
        "status" : error.statusCode,
        "message" : error.message
    });
});




app.listen(3000, () => {
    console.log("server started listening at 3000");
})



