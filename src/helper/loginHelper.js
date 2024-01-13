
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorGeneratorUtils = require('../utility/errorGeneratorUtils');
const errorConstant = require('../contants/errorConstants');
const CustomError = require('../errors/CustomError');

async function loginUser(data){
    try{
        const userDetails = await User.findOne({email: data.email});
        if(userDetails){
            if(!bcrypt.compareSync(data.password, userDetails.password)){
                throw new CustomError("Incorrect Password", errorConstant.UNAUTHORISED_STATUS_CODE);
            }
            const payload = {
                id: userDetails.id,
                email : userDetails.email,
                firstName: userDetails.firstName,
                lastName : userDetails.lastName,
                role : userDetails.role
            };
        
            return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '24h'});
        } else{
            throw new CustomError("Emails doesn't exists!", errorConstant.BAD_REQUEST_STATUS_CODE);
        }
    } catch(err){
        if(err instanceof CustomError){
            throw errorGeneratorUtils.formAndHandleError(err.message, err.statusCode);
        }
        throw errorGeneratorUtils.formAndHandleError(err.message, errorConstant.INTERNAL_SERVER_ERROR_STATUS_CODE);
    }
}

module.exports = {loginUser};