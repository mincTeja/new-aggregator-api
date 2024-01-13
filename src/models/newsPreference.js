const mongoose = require('mongoose')


var newsPreference = new mongoose.Schema(
    {
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        preferences : {
            type : [String],
            default : []
        }
    }
);

module.exports = mongoose.model('NewsPreference', newsPreference);