import axios from 'axios';
import { getAuthToken } from './auth';

const API_URL = 'http://localhost:3006';
const THUMBNAIL_CLOUD_API_URL = 'https://d1fikrc8oaf3kg.cloudfront.net';

export const getThumbnailImageURL = (video_id) => {
  return `${THUMBNAIL_CLOUD_API_URL}/${video_id}.jpeg`;
}

export const getAllVideos = async () => {
  try{
    const response = await axios.get(`${API_URL}/api/video/list`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch(error){
    throw error;
  }
};

export const getUserVideos = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/video/list/user/${userId}`,{
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user videos:', error);
    throw error;
  }
};


export const getS3SignedUrl = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/video/s3-signed-url`,{
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting signed URL:', error);
    throw error;
  }
};

export const getS3SignedCookieForVideo = async (video_id) => {
  try {
    const response = await axios.get(`${API_URL}/api/video/signed-cookie/video/${video_id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting signed cookie for video:', error);
    throw error;
  }
}


export const uploadFileToS3 = async (url, file, fileType) => {
  try {
    await axios.put(url, file, {
      headers: {
        'Content-Type': fileType,
      },
    });

  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};


export const addVideoEntry = async (video_id, title, description, user_id) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/video/uploaded`,
      {
        video_id,
        title,
        description,
        user_id,
      },
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding video entry to the database:', error);
    throw error;
  }
};
