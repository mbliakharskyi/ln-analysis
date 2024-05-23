// utils/api.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_DEV_URL; // Replace with your backend URL
export const uploadProfiles = async (profiles: any[]) => {
  console.log("API URL:", `${API_URL}/score-profile`)
  try {
    const response = await axios.post(`${API_URL}/score-profile`, { profiles });
    return response.data;
  } catch (error) {
    console.error("Error uploading profiles:", error);
    throw error;
  }
};
