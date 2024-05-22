const getList = require('./getList');
const getVideoListByUser = require('./getVideoListByUser');
const getSignedCookie = require('./getSignedCookie');
const getS3SignedUrl = require('./getS3SignedUrl');
const postUpload = require('./postUpload');

exports.controllers = {
  getList,
  getVideoListByUser,
  getSignedCookie,
  getS3SignedUrl,
  postUpload
}