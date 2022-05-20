const express = require("express");
const {videoController} = require("../../controllers/")
const validate = require("../../middlewares/validate");
const videoValidation = require("../../validations/video.validation");
const router = express.Router();

router.get("/",validate(videoValidation.getVideos),videoController.getVideos)
router.get("/:videoId",validate(videoValidation.getVideosById),videoController.getVideosById)
router.post("/",validate(videoValidation.postVideos),videoController.postVideos)
router.patch("/:videoId/votes",validate(videoValidation.updateVideos),videoController.updateVideos)
router.patch("/:videoId/views",videoController.updateViews)
module.exports=router