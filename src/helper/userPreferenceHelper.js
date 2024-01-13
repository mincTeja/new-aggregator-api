const NewsPreference = require('../models/newsPreference');
const errorGeneratorUtils = require('../utility/errorGeneratorUtils');
const errorConstant = require('../contants/errorConstants');

async function updateUserPreference(data){
    try{
        await NewsPreference.updateOne({user: data.user.id}, {$set : {preferences: data.body.preferences}});
    } catch(err) {
        throw errorGeneratorUtils.formAndHandleError("Something went wrong while updating preferences", 
        errorConstant.INTERNAL_SERVER_ERROR_STATUS_CODE);
    }
}

async function getUserPreference(data){
    try{
        const preferencesData = await NewsPreference.findOne({user: data.user.id});
        return preferencesData.preferences;
    } catch(err){
        throw errorGeneratorUtils.formAndHandleError("Something went wrong while getting preferences", 
        errorConstant.INTERNAL_SERVER_ERROR_STATUS_CODE);
    }
}

module.exports = {updateUserPreference, getUserPreference};