const loginController = require('express').Router();


loginController.get('/',(req, res) => {
    res.send("sign up page");
});


module.exports = loginController;