
// User and Authentication
export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

// Customer
export interface Customer {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  birthDate?: string;
  dateOfBirth?: string; // Added to fix type errors
  skinType?: string;
  skinConcerns?: string;
  concerns?: string[]; // Added to fix type errors
  allergies?: string;
  additionalNotes?: string; // Added to fix type errors
  createdAt: string;
  updatedAt: string;
}

// Therapist
export interface Therapist {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  specialization: string;
  experience: number;
  bio: string;
  rating: number;
  availability: string[];
  serviceIds?: number[]; // Added to fix type errors
  photoUrl?: string; // Added to fix type errors
  imageUrl?: string; 
  workSchedule?: string; // Added to fix type errors
  createdAt: string;
  updatedAt: string;
}

// Service
export interface Service {
  id: number;
  name: string;
  description: string;
  duration: number;
  durationMinutes?: number; // Added to fix type errors
  price: number;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Booking
export interface Booking {
  id: number;
  customerId: number;
  serviceId: number;
  therapistId?: number;
  appointmentTime: string;
  duration: number;
  status: "BOOKED" | "CHECKED_IN" | "COMPLETED" | "CANCELLED";
  amount: number;
  isPaid: boolean;
  paymentMethod?: string;
  notes?: string;
  serviceResults?: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
}

// Feedback
export interface Feedback {
  id: number;
  customerId: number;
  therapistId?: number;
  serviceId?: number;
  bookingId?: number;
  rating: number;
  comment: string;
  createdAt: string;
}

// Skin Test
export interface SkinTest {
  skinType: string;
  concerns: string[];
  skinConcerns?: string; // Added to fix type errors
  sensitivity: string;
  allergies?: string;
  previousTreatments?: string;
  additionalNotes?: string; // Added to fix type errors
}

// Home Page Data
export interface HomePageData {
  banners: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    linkUrl?: string;
  }[];
  featuredServices: Service[];
  topTherapists: Therapist[];
  therapists?: Therapist[]; // Added to fix type errors
  services?: Service[]; // Added to fix type errors
  testimonials: Feedback[];
  blogs?: any[]; // Added to fix type errors
  introduction?: { // Added to fix type errors
    title: string;
    description: string;
    imageUrl: string;
  };
  statistics: {
    customersServed: number;
    servicesOffered: number;
    experienceYears: number;
    satisfactionRate: number;
  };
}

// Dashboard Data
export interface DashboardData {
  // Original properties
  totalRevenue: number;
  bookingsCount: {
    total: number;
    booked: number;
    completed: number;
    cancelled: number;
  };
  revenueByService: {
    serviceId: number;
    serviceName: string;
    revenue: number;
    bookingsCount: number;
  }[];
  topTherapists: {
    therapistId: number;
    therapistName: string;
    bookingsCount: number;
    averageRating: number;
  }[];
  recentBookings: Booking[];
  monthlyRevenue: {
    month: string;
    revenue: number;
  }[];
  
  // Adding missing properties used in Dashboard.tsx
  upcomingBookings?: {
    id: number;
    serviceId: number;
    serviceName: string;
    appointmentTime: string;
    therapistName: string;
    status: string;
  }[];
  recentTransactions?: {
    id: number;
    amount: number;
    date: string;
    description: string;
    type: 'payment' | 'refund';
  }[];
  stats?: {
    totalBookings: number;
    newBookings: number;
    completedTreatments: number;
    completionRate: number;
    loyaltyPoints: number;
    pointsToNextReward: number;
    totalSpent: number;
    totalServices: number;
  };
  charts?: {
    treatmentHistory: { name: string; value: number }[];
    treatmentTypes: { name: string; value: number }[];
    monthlySpending: { name: string; value: number }[];
  };
}

// Form Types
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface ProfileUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  birthDate?: string;
  dateOfBirth?: string; // Added to fix type errors
  skinType?: string;
  skinConcerns?: string;
  allergies?: string;
}

export interface BookingFormData {
  serviceId: number;
  therapistId?: number;
  appointmentDate: Date;
  appointmentTime: string;
  notes?: string;
}

export interface PaymentData {
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  billingAddress?: string;
}
