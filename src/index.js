const bodyParser = require('body-parser');
const express = require('express');
const registrationController = require('./controller/registrationController');

const app = express();

app.use(bodyParser.json());



app.get('/',(req, res)=>{
    return res.send("hello world");
});

app.use('/register', registrationController);




app.listen(3000, () => {
    console.log("server started listening at 3000");
})



