const User = require('../models/user');
const NewsPreference = require('../models/newsPreference');
const bcrypt = require('bcrypt');
const errorGeneratorUtils = require('../utility/errorGeneratorUtils');
const errorConstant = require('../contants/errorConstants');
const CustomError = require('../errors/CustomError');
const newsPreference = require('../models/newsPreference');

async function performRegistration(data){
    try{
        const existingUser = await User.findOne({email: data.email});
        if(existingUser){
            console.log(existingUser);
            throw new CustomError("Email Already Registered!", errorConstant.BAD_REQUEST_STATUS_CODE);
        }

        const user = new User({
            firstName : data.firstName,
            lastName : data.lastName,
            email : data.email,
            password : bcrypt.hashSync(data.password,8),
            role : data.role
        });
        const savedUser = await user.save();

        const newsPreference = new NewsPreference({
            user : savedUser.id
        });

        await newsPreference.save();


    }catch(err){
        if(err instanceof CustomError){
            throw errorGeneratorUtils.formAndHandleError(err.message, err.statusCode);
        }
        throw errorGeneratorUtils.formAndHandleError(err.message, errorConstant.INTERNAL_SERVER_ERROR_STATUS_CODE);
    }
}


module.exports = {performRegistration};