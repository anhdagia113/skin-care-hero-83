
// Service types
export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
}

// Therapist types
export interface Therapist {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
  specialization: string;
  email: string;
  phoneNumber: string;
  photoUrl: string;
  workSchedule: string;
  serviceIds: number[];
}

// Customer types
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  skinConcerns: string;
  skinType: string;
  allergies: string;
}

// Booking types
export interface Booking {
  id: number;
  customerId: number;
  serviceId: number;
  therapistId?: number;
  appointmentTime: string;
  status: 'BOOKED' | 'CHECKED_IN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  checkinTime?: string;
  checkoutTime?: string;
  serviceResults?: string;
  amount: number;
  isPaid: boolean;
  paymentTime?: string;
  paymentMethod?: 'CASH' | 'CREDIT_CARD' | 'BANK_TRANSFER' | 'ONLINE';
  cancellationReason?: string;
}

// Feedback types
export interface Feedback {
  id: number;
  bookingId: number;
  rating: number;
  comment: string;
  isPublic: boolean;
}

// Skin Test types
export interface SkinTest {
  id?: number;
  customerId?: number;
  skinType?: string;
  skinConcerns?: string;
  oiliness?: number;
  sensitivity?: number;
  hydration?: number;
  pigmentation?: number;
  wrinkles?: number;
  additionalNotes?: string;
}

// Home page data
export interface HomePageData {
  introduction: {
    title: string;
    description: string;
    imageUrl: string;
  };
  services: Service[];
  therapists: Therapist[];
  blogs: {
    id: number;
    title: string;
    summary: string;
    imageUrl: string;
    publishDate: string;
  }[];
  news: {
    id: number;
    title: string;
    summary: string;
    publishDate: string;
  }[];
}

// Dashboard data
export interface DashboardData {
  totalRevenue: number;
  bookingsCount: {
    total: number;
    booked: number;
    completed: number;
    cancelled: number;
  };
  revenueByService: {
    serviceName: string;
    revenue: number;
  }[];
  topTherapists: {
    therapistName: string;
    bookingsCount: number;
    averageRating: number;
  }[];
  recentBookings: Booking[];
}
