const registrationController = require('express').Router();


registrationController.get('/',(req, res) => {
    res.send("sign up page");
});


module.exports = registrationController;