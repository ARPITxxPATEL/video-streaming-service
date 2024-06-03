const router = require('express').Router();
const videoController = require('../controllers/video/videoControllers');
const auth = require('../middleware/auth');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const userIdSchema = Joi.object({
    user_id: Joi.number().required()
});

const videoIdSchema = Joi.object({
    video_id: Joi.string().required()
});

const uploadSchema = Joi.object({
    video_id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().allow(null, ''),
    user_id: Joi.number().required()
});

router.get('/list', auth, videoController.controllers.getVideoList);
router.get('/list/user/:user_id', auth, validator.params(userIdSchema), videoController.controllers.getVideoListByUser);
router.get('/signed-cookie/video/:video_id', auth, validator.params(videoIdSchema), videoController.controllers.getSignedCookie);
router.get('/s3-signed-url', auth, videoController.controllers.getS3SignedUrl);

router.post('/uploaded', auth, validator.body(uploadSchema), videoController.controllers.postUpload);

module.exports = router;