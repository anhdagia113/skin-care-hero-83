import { toast } from "sonner";

const API_BASE_URL = "http://localhost:8080/api";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

// Token management
export const getToken = () => localStorage.getItem('auth_token');
export const setToken = (token: string) => localStorage.setItem('auth_token', token);
export const removeToken = () => localStorage.removeItem('auth_token');

// User role management
export const getUserRole = () => localStorage.getItem('user_role');
export const setUserRole = (role: string) => localStorage.setItem('user_role', role);
export const removeUserRole = () => localStorage.removeItem('user_role');

// User ID management
export const getUserId = () => localStorage.getItem('user_id');
export const setUserId = (id: string) => localStorage.setItem('user_id', id);
export const removeUserId = () => localStorage.removeItem('user_id');

// Check if user is authenticated
export const isAuthenticated = () => !!getToken();

// Clear all auth data
export const clearAuthData = () => {
  removeToken();
  removeUserRole();
  removeUserId();
};

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const status = response.status;
  
  if (status >= 200 && status < 300) {
    const data = await response.json();
    return { data, error: null, status };
  } else {
    let errorMessage: string;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || `Error: ${response.statusText}`;
    } catch (e) {
      errorMessage = `Error: ${response.statusText}`;
    }
    
    if (status === 401) {
      // Handle unauthorized access
      clearAuthData();
      window.location.href = '/login';
    }
    
    toast.error(errorMessage);
    return { data: null, error: errorMessage, status };
  }
}

export async function fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json"
    };
    
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
    return handleResponse<T>(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Network error";
    toast.error(errorMessage);
    console.error("API Error:", errorMessage);
    return { data: null, error: errorMessage, status: 0 };
  }
}

export async function postData<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json"
    };
    
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    });
    return handleResponse<T>(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Network error";
    toast.error(errorMessage);
    console.error("API Error:", errorMessage);
    return { data: null, error: errorMessage, status: 0 };
  }
}

export async function putData<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json"
    };
    
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data)
    });
    return handleResponse<T>(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Network error";
    toast.error(errorMessage);
    console.error("API Error:", errorMessage);
    return { data: null, error: errorMessage, status: 0 };
  }
}

export async function deleteData<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json"
    };
    
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const options: RequestInit = {
      method: "DELETE",
      headers
    };
    
    if (data) {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    return handleResponse<T>(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Network error";
    toast.error(errorMessage);
    console.error("API Error:", errorMessage);
    return { data: null, error: errorMessage, status: 0 };
  }
}

/**
 * Creates a new booking
 */
export const createBooking = async (bookingData: any) => {
  try {
    // Simulated API response for now
    console.log('Creating booking:', bookingData);
    return {
      success: true,
      data: {
        id: Math.floor(Math.random() * 1000),
        ...bookingData,
        createdAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create booking'
    };
  }
};

/**
 * Submits a skin test assessment
 */
export const submitSkinTest = async (skinTestData: any) => {
  try {
    // Simulated API response for now
    console.log('Submitting skin test:', skinTestData);
    
    // Simulate recommendations based on skin type and concerns
    const recommendations = generateRecommendations(skinTestData);
    
    return {
      success: true,
      data: {
        id: Math.floor(Math.random() * 1000),
        ...skinTestData,
        recommendations,
        createdAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Error submitting skin test:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit skin test'
    };
  }
};

/**
 * Helper function to generate skin care recommendations based on skin test data
 */
const generateRecommendations = (skinTestData: any) => {
  const { skinType, concerns, sensitivity } = skinTestData;
  
  // Basic recommendations based on skin type
  const recommendations = {
    services: [],
    products: [],
    routine: ''
  };
  
  // Add service recommendations based on skin type and concerns
  if (skinType === 'dry' || concerns.includes('8')) {
    recommendations.services.push({
      id: 1,
      name: 'Hydrating Facial',
      description: 'Deep hydration treatment for dry skin'
    });
  }
  
  if (skinType === 'oily' || concerns.includes('1') || concerns.includes('7')) {
    recommendations.services.push({
      id: 2,
      name: 'Purifying Facial',
      description: 'Balancing treatment for oily and acne-prone skin'
    });
  }
  
  if (concerns.includes('2') || concerns.includes('3')) {
    recommendations.services.push({
      id: 3,
      name: 'Anti-Aging Facial',
      description: 'Targets fine lines, wrinkles, and hyperpigmentation'
    });
  }
  
  if (sensitivity === 'high') {
    recommendations.services.push({
      id: 4,
      name: 'Sensitive Skin Facial',
      description: 'Gentle treatment for sensitive skin'
    });
    recommendations.routine = 'Use gentle, fragrance-free products. Patch test new products. Focus on barrier repair.';
  } else if (skinType === 'combination') {
    recommendations.routine = 'Use different products for different areas of your face. Balance hydration without over-oiling.';
  } else if (skinType === 'normal') {
    recommendations.routine = 'Maintain skin health with consistent cleansing, hydration, and sun protection.';
  }
  
  return recommendations;
};
