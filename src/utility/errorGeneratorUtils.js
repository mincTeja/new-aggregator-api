function formAndHandleError(message, statusCode){
    let error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

module.exports = {formAndHandleError};