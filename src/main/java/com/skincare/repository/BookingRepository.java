
package com.skincare.repository;

import com.skincare.model.Booking;
import com.skincare.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomer(Customer customer);
    
    @Query("SELECT b FROM Booking b WHERE b.appointmentTime BETWEEN :startDate AND :endDate")
    List<Booking> findBookingsBetweenDates(LocalDateTime startDate, LocalDateTime endDate);
}
