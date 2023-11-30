const newsController = require('express').Router();


newsController.get('/',(req, res) => {
    res.send("sign up page");
});


module.exports = newsController;