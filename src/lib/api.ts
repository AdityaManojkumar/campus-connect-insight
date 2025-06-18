const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function for API requests
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  register: async (data: { username: string; password: string; email: string }) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login: async (data: { username: string; password: string }) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// Student API
export const studentAPI = {
  getDetails: async (userId: string) => {
    return apiRequest(`/student/${userId}`);
  },

  saveDetails: async (data: {
    name: string;
    dob: string;
    semester: string;
    college: string;
    branch: string;
    skills?: string[];
    subjects?: string[];
  }) => {
    return apiRequest('/student', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateSkills: async (userId: string, skills: string[]) => {
    return apiRequest(`/student/${userId}/skills`, {
      method: 'PUT',
      body: JSON.stringify({ skills }),
    });
  },

  updateSubjects: async (userId: string, subjects: string[]) => {
    return apiRequest(`/student/${userId}/subjects`, {
      method: 'PUT',
      body: JSON.stringify({ subjects }),
    });
  },
};

// Health check
export const healthCheck = async () => {
  return apiRequest('/health');
}; 