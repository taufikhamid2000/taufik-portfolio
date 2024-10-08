// import axios from 'axios';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCreatedSurveys = async () => {
  try {
    const response = await fetch('/api/created-surveys');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching created surveys:', error);
    throw error;
  }
};

export const fetchAnsweredSurveys = async () => {
  try {
    const response = await fetch('/api/answered-surveys');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching answered surveys:', error);
    throw error;
  }
};


// // Function to get all surveys available for the user
// export const fetchSurveys = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/surveys`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching surveys:", error);
//     throw error;
//   }
// };

// // Function to get user-specific data like profile info
// export const fetchUserProfile = async (userId) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     throw error;
//   }
// };

// // Function to create a new survey (for survey creators)
// export const createSurvey = async (surveyData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/surveys`, surveyData);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating survey:", error);
//     throw error;
//   }
// };

// // Function to update user profile
// export const updateUserProfile = async (userId, userData) => {
//   try {
//     const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating user profile:", error);
//     throw error;
//   }
// };

// // Function to delete a survey
// export const deleteSurvey = async (surveyId) => {
//   try {
//     const response = await axios.delete(`${API_BASE_URL}/surveys/${surveyId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting survey:", error);
//     throw error;
//   }
// };

// const apiService = {
//   fetchSurveys,
//   fetchUserProfile,
//   createSurvey,
//   updateUserProfile,
//   deleteSurvey,
// };

// export default apiService;