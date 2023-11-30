const userPreferenceController = require('express').Router();


userPreferenceController.get('/',(req, res) => {
    res.send("sign up page");
});


module.exports = userPreferenceController;