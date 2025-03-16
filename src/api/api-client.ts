
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
