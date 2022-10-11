const Joi = require("joi");
const { objectId,videoLink } = require("./custom.validation");
const values=require("../utils/value")
const getVideos = {
  query: Joi.object().keys({
    title: Joi.string(),
    //genres:Joi.array().items(Joi.string().valid(...values.genres,"All")),
    //genres:Joi.string().valid(...values.genres,"All"),
    genres:Joi.string(),
    contentRating:Joi.string().valid(...values.age,"All"),
    sortBy:Joi.string().valid(...values.sortBy),
  }),
};

const getVideosById={
  params:Joi.object().keys({
    videoId:Joi.string().custom(objectId)
  })
}
const postVideos={
  body:{
    videoId:Joi.string().custom(objectId),
    videoLink:Joi.string().custom(videoLink).required(),
    title: Joi.string().required(),
    genre:Joi.string().valid(...values.genres,"All").required(),
    contentRating:Joi.string().valid(...values.age,"All").required(),
    releaseDate:Joi.string().required(),
    previewImage:Joi.string().required()
  }
}
const updateVideos={
  body:Joi.object().keys({
    vote:Joi.string().valid(...values.vote).required(),
    change:Joi.string().valid(...values.changeValue).required()
  })
}
module.exports = {
    getVideos,
    getVideosById,
    postVideos,
    updateVideos,

};
