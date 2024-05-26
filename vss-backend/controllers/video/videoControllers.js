const getVideoList = require('./getVideoList');
const getVideoListByUser = require('./getVideoListByUser');
const getSignedCookie = require('./getSignedCookie');
const getS3SignedUrl = require('./getS3SignedUrl');
const postUpload = require('./postUpload');

exports.controllers = {
  getVideoList,
  getVideoListByUser,
  getSignedCookie,
  getS3SignedUrl,
  postUpload
}