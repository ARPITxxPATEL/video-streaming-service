import axios from 'axios';

const baseUrl = 'http://localhost:3006';

const getAuthToken = () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFycGl0MUBnbWFpbC5jb20iLCJpYXQiOjE3MTY3Mzg2MTgsImV4cCI6MTcxNjgyNTAxOH0.MZ8AhsMRd6Dp0RZVUU2YWuwODoLbZY96NK-Bsa1PGnM";
  // return localStorage.getItem('jwtToken');
};


export const getUserVideos = async (userId) => {
  try {
    const response = await axios.get(`${baseUrl}/api/video/user/${userId}`,{
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
    const response = await axios.get(`${baseUrl}/api/video/s3-signed-url`,{
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
      `${baseUrl}/api/video/uploaded`,
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
