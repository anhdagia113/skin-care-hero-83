
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/api/api-client";
import { toast } from "sonner";

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await postData<AuthResponse>("/auth/login", credentials);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data as AuthResponse;
    },
    onSuccess: (data) => {
      // Store token in localStorage or better yet, in a secure HTTP-only cookie
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (userData: RegisterRequest) => {
      const response = await postData<{ message: string }>("/auth/register", userData);
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("Registration successful! You can now log in.");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  });
}
