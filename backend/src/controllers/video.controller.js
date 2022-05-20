const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const {videoService } = require("../service");

const getVideos = catchAsync(async (req, res) =>{
    const title=req.query.title ? req.query.title :""
    const contentRating=req.query.contentRating ? req.query.contentRating :"All"
    const genre=req.query.genres ? req.query.genres :"All"

    const sortBy=req.query.sortBy ? req.query.sortBy :"releaseDate"
    const videos=await videoService.getVideos(title,contentRating,genre,sortBy)
    res.status(httpStatus.OK).send({videos})
})

const getVideosById=catchAsync(async(req,res)=>{
        let videos=await videoService.getVideosById(req.params.videoId)
        return res.status(httpStatus.OK).send(videos);

})

const postVideos=catchAsync(async(req,res)=>{
        const createVideo=await videoService.createVideo(req.body);
        return res.status(httpStatus.CREATED).send(createVideo)
})

const updateVideos=catchAsync(async(req,res)=>{
        await videoService.updateVideos(req.params.videoId,req.body.vote,req.body.change)
        return res.status(httpStatus.NO_CONTENT).send();
})

const updateViews=catchAsync(async(req,res)=>{
    await videoService.updateViews(req.params.videoId);
    return res.status(httpStatus.NO_CONTENT).send()
})


module.exports={getVideos,getVideosById,postVideos,updateVideos,updateViews}