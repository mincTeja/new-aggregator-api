const loginController = require('express').Router();
const loginHelper = require('../helper/loginHelper');


loginController.post('/', async(req, res, next) => {
    try{
        const token = await loginHelper.loginUser(req.body);
        res.status(200).json({token : token});
    } catch(err) {
        console.log(`Something went wrong while logging in ${err}`);
        next(err);
    }
});


module.exports = loginController;