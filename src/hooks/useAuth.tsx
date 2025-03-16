
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData, getToken, setToken, removeToken, getUserRole, setUserRole, removeUserRole, getUserId, setUserId, removeUserId } from '@/api/api-client';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  userId: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isStaff: () => boolean;
  isCustomer: () => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  customerId: number | null;
  therapistId: number | null;
  roles: string[];
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());
  const [userRole, setUserRoleState] = useState<string | null>(getUserRole());
  const [userId, setUserIdState] = useState<string | null>(getUserId());
  const navigate = useNavigate();

  useEffect(() => {
    // Check token validity on mount
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      setUserRoleState(getUserRole());
      setUserIdState(getUserId());
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await postData<LoginResponse>('/auth/login', { username, password });
      
      if (response.data) {
        setToken(response.data.token);
        
        // Determine highest role
        let role = 'ROLE_USER';
        if (response.data.roles.includes('ROLE_ADMIN')) {
          role = 'ROLE_ADMIN';
        } else if (response.data.roles.includes('ROLE_STAFF')) {
          role = 'ROLE_STAFF';
        }
        
        setUserRole(role);
        setUserRoleState(role);
        
        // Set user ID based on role
        const id = response.data.customerId 
          ? response.data.customerId.toString() 
          : response.data.therapistId 
            ? response.data.therapistId.toString() 
            : response.data.id.toString();
            
        setUserId(id);
        setUserIdState(id);
        
        setIsAuthenticated(true);
        toast.success('Login successful');
        
        // Redirect based on role
        if (role === 'ROLE_ADMIN') {
          navigate('/admin');
        } else if (role === 'ROLE_STAFF') {
          navigate('/dashboard');
        } else {
          navigate('/dashboard');
        }
        
        return true;
      }
      return false;
    } catch (error) {
      toast.error('Login failed');
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const response = await postData('/auth/register', userData);
      
      if (response.data) {
        toast.success('Registration successful. Please login.');
        navigate('/login');
        return true;
      }
      return false;
    } catch (error) {
      toast.error('Registration failed');
      return false;
    }
  };

  const logout = () => {
    removeToken();
    removeUserRole();
    removeUserId();
    setIsAuthenticated(false);
    setUserRoleState(null);
    setUserIdState(null);
    navigate('/');
    toast.success('Logged out successfully');
  };

  const isAdmin = () => userRole === 'ROLE_ADMIN';
  const isStaff = () => userRole === 'ROLE_STAFF' || userRole === 'ROLE_ADMIN';
  const isCustomer = () => userRole === 'ROLE_USER';

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      userRole, 
      userId,
      login, 
      register, 
      logout,
      isAdmin,
      isStaff,
      isCustomer
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
