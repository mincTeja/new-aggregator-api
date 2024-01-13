const NewsPreference = require('../models/newsPreference');
const errorGeneratorUtils = require('../utility/errorGeneratorUtils');
const errorConstant = require('../contants/errorConstants');
const { default: axios } = require('axios');



async function getNews(data){
    try{

        const userPreferences = await NewsPreference.findOne({user: data.user.id});

        const queryParams = {
          country : "in",
          apiKey : process.env.VENDOR_API_KEY,
        }
        if(userPreferences.preferences.length>0){
          const articles = [];
            const requests = userPreferences.preferences.map(async ele =>{
              queryParams.category = ele;
              const response = await axios.get(process.env.VENDOR_ENDPOINT, {params: queryParams});
              return response.data.articles;
            })

            const responses = await Promise.all(requests);
            articles.push(...responses.flat());
            return articles;
        }else{
          const response = await axios.get(process.env.VENDOR_ENDPOINT, {params: queryParams});
          return response.data.articles;
        }

    }catch(err){
      console.log(err);
        throw errorGeneratorUtils.formAndHandleError("Something went wrong while getting news", 
        errorConstant.INTERNAL_SERVER_ERROR_STATUS_CODE);
    }
}

module.exports = {getNews};