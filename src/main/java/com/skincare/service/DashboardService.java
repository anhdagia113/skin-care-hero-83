
package com.skincare.service;

import com.skincare.model.Booking;
import com.skincare.repository.BookingRepository;
import com.skincare.repository.CustomerRepository;
import com.skincare.repository.FeedbackRepository;
import com.skincare.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final BookingRepository bookingRepository;
    private final CustomerRepository customerRepository;
    private final ServiceRepository serviceRepository;
    private final FeedbackRepository feedbackRepository;

    public Map<String, Object> getDashboardData() {
        Map<String, Object> dashboardData = new HashMap<>();
        
        // Add overview statistics
        dashboardData.put("totalBookings", bookingRepository.count());
        dashboardData.put("totalCustomers", customerRepository.count());
        dashboardData.put("totalServices", serviceRepository.count());
        
        // Add revenue data
        BigDecimal totalRevenue = calculateTotalRevenue();
        dashboardData.put("totalRevenue", totalRevenue);
        
        // Add recent bookings
        List<Booking> recentBookings = bookingRepository.findAll().stream()
                .sorted((b1, b2) -> b2.getCreatedAt().compareTo(b1.getCreatedAt()))
                .limit(5)
                .toList();
        dashboardData.put("recentBookings", recentBookings);
        
        // Add average rating
        Double avgRating = calculateAverageRating();
        dashboardData.put("averageRating", avgRating);
        
        return dashboardData;
    }

    public Map<String, Object> generateReport(LocalDateTime startDate, LocalDateTime endDate) {
        Map<String, Object> report = new HashMap<>();
        
        List<Booking> bookingsInPeriod = bookingRepository.findBookingsBetweenDates(startDate, endDate);
        
        // Basic report statistics
        report.put("period", Map.of("startDate", startDate, "endDate", endDate));
        report.put("totalBookings", bookingsInPeriod.size());
        
        // Revenue in period
        BigDecimal periodRevenue = bookingsInPeriod.stream()
                .filter(b -> b.getIsPaid() != null && b.getIsPaid())
                .map(Booking::getAmount)
                .filter(amount -> amount != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        report.put("totalRevenue", periodRevenue);
        
        // Bookings by status
        Map<Booking.BookingStatus, Long> bookingsByStatus = bookingsInPeriod.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                        Booking::getStatus,
                        java.util.stream.Collectors.counting()
                ));
        report.put("bookingsByStatus", bookingsByStatus);
        
        // Most popular services
        Map<String, Long> servicePopularity = bookingsInPeriod.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                        b -> b.getService().getName(),
                        java.util.stream.Collectors.counting()
                ));
        report.put("popularServices", servicePopularity);
        
        return report;
    }

    private BigDecimal calculateTotalRevenue() {
        return bookingRepository.findAll().stream()
                .filter(b -> b.getIsPaid() != null && b.getIsPaid())
                .map(Booking::getAmount)
                .filter(amount -> amount != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private Double calculateAverageRating() {
        return feedbackRepository.findAll().stream()
                .mapToInt(f -> f.getRating())
                .average()
                .orElse(0.0);
    }
}
