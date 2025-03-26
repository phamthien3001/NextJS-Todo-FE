// src/app/api/authService.ts
import apiClient from './apiClient';

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const authService = {
  async login(data: LoginData) {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },
  
  async register(data: RegisterData) {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
  
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return apiClient.post('/auth/logout');
  },
  
  getCurrentUser() {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    
    // Giải mã token để lấy thông tin user (cần thêm thư viện jwt-decode)
    // const decoded = jwtDecode(token);
    // return decoded;
    
    // Hoặc gọi API lấy thông tin user
    return apiClient.get('/auth/me');
  }
};