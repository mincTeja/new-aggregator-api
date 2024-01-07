const registrationController = require('express').Router();
const registrationHelper = require('../helper/registrationHelper');


registrationController.post('/', async (req, res, next) => {
    try{
        await registrationHelper.performRegistration(req.body);
        res.status(201).send("User created successfully");
    }catch(err){
        console.log("somthing went wrong while registration : ", err);
        next(err);
    }
});


module.exports = registrationController;