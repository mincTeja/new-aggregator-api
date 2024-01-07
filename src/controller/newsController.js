const newsController = require('express').Router();
const newAggregatorHelper = require('../helper/newAggregatorHelper');

newsController.get('/',async (req, res, next) => {
    try{
        const articles = await newAggregatorHelper.getNews(req);
        return res.status(200).json({
            articles: articles
        });
    } catch(err){
        console.log(`Something went wrong while fetching news ${err}`);
        next(err);
    }
});


module.exports = newsController;