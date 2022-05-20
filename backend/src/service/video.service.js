const { Video } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const values=require("../utils/value")
const getVideos = async (title,contentRating,genre,sortBy) => {
 const titleMatch={title:{$regex:title,$options:"i"}}
 const contentRatings=getContentRatings(contentRating);
 const contentMatching={contentRating:{$in:contentRatings}}
 
 let genreValue=getGenre(genre)
 let genreMatch={genre:{$in:genreValue}}
 
const videos=await Video.find({
    ...titleMatch,
    ...contentMatching,
    ...genreMatch,
})
const sortMatch=sortByVideos(videos,sortBy);
return sortMatch
};

const getContentRatings=(contentRating)=>{
const contentRatings=[...values.age];
if(contentRating==="All"){
    return contentRatings
}
const contentRatingIndex=contentRatings.indexOf(contentRating);
const getContentRatings=contentRatings.splice(contentRatingIndex)
return getContentRatings;
}
const getGenre=(genre)=>{
    const genreVal=[...values.genres];
    if(genre==="All"){
        return genreVal
    }
    
    let getGenreValue = genreVal.filter(val => genre.split(",").includes(val));
    return getGenreValue;
}
const sortByVideos=(videos,sortBy)=>{
videos.sort((video1,video2)=>{
    let match1=video1[sortBy];
    let match2=video2[sortBy];
    if(sortBy==="releaseDate"){
        match1=new Date(match1).getTime();
        match2=new Date(match2).getTime();
    }
    if(match1>match2){
        return -1
    }
    return 1
})
return videos;
}
const getVideosById=async(id)=>{
    const getVideoId=await Video.findOne({_id:id});
    return getVideoId;
}
const createVideo=async(body)=>{
        let videos= await Video.create(body);
        return videos

}
const updateVideos=async(id,vote,change)=>{
    let findVideo=await Video.findOne({_id:id});
    if(findVideo===null){
        throw new ApiError(httpStatus.BAD_REQUEST,"Video Id not present")
    }
    if(vote==="downVote" && change==="increase"){
        findVideo.votes.downVotes++;
    }
    else if(vote==="downVote" && change==="decrease"){
        findVideo.votes.downVotes--;
    }
    vote==="upVote" && change==="increase" && findVideo.votes.upVotes++ 
    vote==="upVote" && change==="decrease" && findVideo.votes.upVotes-- 
    
    await findVideo.save();
   return findVideo;
}

const updateViews=async(id)=>{
    let increaseViewById=await Video.findOne({_id:id});
    if(increaseViewById===null){
        throw new ApiError(httpStatus.BAD_REQUEST,"ID not present")
    }
    increaseViewById.viewCount++;
    await increaseViewById.save();
    return increaseViewById;
} 


module.exports = {
    getVideos,
    getVideosById,
    createVideo,
    updateVideos,
    updateViews,
};
