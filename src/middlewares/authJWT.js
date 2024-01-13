
const jwt = require('jsonwebtoken');
const errorGeneratorUtils = require('../utility/errorGeneratorUtils');
const errorConstant = require('../contants/errorConstants');



function authenticateJWT(req, res, next){
    if(req.headers && req.headers.authorisation){
        jwt.verify(req.headers.authorisation, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                console.log(err)
                next(errorGeneratorUtils.formAndHandleError("Authorisation token is invalid", 
                errorConstant.UNAUTHORISED_STATUS_CODE));
            }else{
                req.user = decoded;
                next();
            }
        })

    }else{
        next(errorGeneratorUtils.formAndHandleError("Authorisation token is not present", 
        errorConstant.BAD_REQUEST_STATUS_CODE));
    }
    
}

module.exports = {authenticateJWT};