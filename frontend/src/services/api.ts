import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
};

export const tenderService = {
  getAll: () => api.get('/tenders'),
  getById: (id: string) => api.get(`/tenders/${id}`),
  create: (data: any) => api.post('/tenders', data),
  update: (id: string, data: any) => api.put(`/tenders/${id}`, data),
  delete: (id: string) => api.delete(`/tenders/${id}`),
  publish: (id: string) => api.put(`/tenders/${id}/publish`, {}),
};

export const vendorService = {
  getAll: () => api.get('/vendors'),
  getById: (id: string) => api.get(`/vendors/${id}`),
  register: (data: any) => api.post('/vendors/register', data),
  update: (id: string, data: any) => api.put(`/vendors/${id}`, data),
  approve: (id: string) => api.put(`/vendors/${id}/approve`, {}),
  reject: (id: string) => api.put(`/vendors/${id}/reject`, {}),
};

export const submissionService = {
  getByTender: (tenderId: string) => api.get(`/submissions/tender/${tenderId}`),
  getByVendor: (vendorId: string) => api.get(`/submissions/vendor/${vendorId}`),
  create: (data: any) => api.post('/submissions', data),
  updateStatus: (id: string, data: any) => api.put(`/submissions/${id}/status`, data),
};

export const documentService = {
  upload: (formData: FormData) => api.post('/documents/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getByVendor: (vendorId: string) => api.get(`/documents/vendor/${vendorId}`),
  delete: (id: string) => api.delete(`/documents/${id}`),
};

export const contractService = {
  getAll: () => api.get('/contracts'),
  getById: (id: string) => api.get(`/contracts/${id}`),
  create: (data: any) => api.post('/contracts', data),
  updateStatus: (id: string, data: any) => api.put(`/contracts/${id}/status`, data),
  getByVendor: (vendorId: string) => api.get(`/contracts/vendor/${vendorId}`),
};

export const aiService = {
  analyzeDocuments: (data: any) => api.post('/ai/analyze-documents', data),
  evaluateEligibility: (data: any) => api.post('/ai/evaluate-eligibility', data),
  analyzeContracts: (data: any) => api.post('/ai/analyze-contracts', data),
  getRecommendations: (tenderId: string) => api.get(`/ai/recommendations/${tenderId}`),
};

export default api;
