import axios from 'axios';

const API_URL = 'http://localhost:3006';

const getAuthToken = () => {
  return localStorage.getItem('jwtToken');
};

export const getUserVideos = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/video/user/${userId}`,{
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


export const addVideoEntry = async (videoId, title, description="") => {
  try {
    const response = await axios.post(
      `${API_URL}/api/video/uploaded`,
      {
        videoId,
        title,
        description,
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
