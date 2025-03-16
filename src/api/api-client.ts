
import { toast } from "sonner";

const API_BASE_URL = "http://localhost:8080/api";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

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
    
    toast.error(errorMessage);
    return { data: null, error: errorMessage, status };
  }
}

export async function fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return handleResponse<T>(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Network error";
    toast.error(errorMessage);
    return { data: null, error: errorMessage, status: 0 };
  }
}

export async function postData<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return handleResponse<T>(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Network error";
    toast.error(errorMessage);
    return { data: null, error: errorMessage, status: 0 };
  }
}

export async function putData<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return handleResponse<T>(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Network error";
    toast.error(errorMessage);
    return { data: null, error: errorMessage, status: 0 };
  }
}

export async function deleteData<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE"
    });
    return handleResponse<T>(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Network error";
    toast.error(errorMessage);
    return { data: null, error: errorMessage, status: 0 };
  }
}
