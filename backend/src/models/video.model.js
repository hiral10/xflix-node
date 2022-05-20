const mongoose = require("mongoose");
const {genres,age}=require("../utils/value")
const videoSchema = mongoose.Schema(
  {
    videoLink: {
      type: String,
      required: true,
      trim: true,
      unique:true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    
    genre: {
      type: String,
      required: true,
      trim: true,
      validate(value){
          if(!genres.includes(value)){
              throw new Error("Invalid genre")
          }
      }
    },
    contentRating: {
      type: String,
      required: true,
      trim: true,
      validate(value){
        if(!age.includes(value)){
            throw new Error("Invalid age rating")
        }
    }
    },
    releaseDate: {
     type:String,
     required: true,
    },
    previewImage:{
        type:String,
        required: true,
        trim:true,
    },
    votes:{
        upVotes:{
          type:Number,
          default:0,
        },
        downVotes:{
          type:Number,
          default:0,
        },
    },
    viewCount:{
        type:Number,
        default:0,
    },
  }
);

/**
 * @typedef Product
 */
const Video = mongoose.model("Videos", videoSchema);

module.exports.Video = Video;

