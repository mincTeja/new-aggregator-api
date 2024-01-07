const userPreferenceController = require('express').Router();
const userPreferenceHelper = require('../helper/userPreferenceHelper');


userPreferenceController.put('/',async (req, res, next) => {
    try{
        await userPreferenceHelper.updateUserPreference(req);
        res.status(200).send("Updated preferences successfully");
    }catch (err){
        console.log(`Something went wrong while updating preferences ${err}`);
        next(err)
    }
});

userPreferenceController.get('/',async (req, res, next) => {
    try{
        const preferences = await userPreferenceHelper.getUserPreference(req);
        res.status(200).json({
            preferences: preferences
        });
    }catch (err){
        console.log(`Something went wrong while updating preferences ${err}`);
        next(err)
    }
});


module.exports = userPreferenceController;