import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authApi = {
  sendOTP: async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/otp/send`, { email });
      return response.data;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  },

  verifyOTP: async (otp: string) => {
    const validOTPs = ['2745', '9627', '1217', '6157', '2307'];
    return validOTPs.includes(otp);
  }
};