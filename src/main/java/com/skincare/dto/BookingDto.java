
package com.skincare.dto;

import com.skincare.model.Booking.BookingStatus;
import com.skincare.model.Booking.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingDto {
    private Long id;
    
    @NotNull(message = "Customer ID is required")
    private Long customerId;
    
    @NotNull(message = "Service ID is required")
    private Long serviceId;
    
    private Long therapistId;
    
    @NotNull(message = "Appointment time is required")
    private LocalDateTime appointmentTime;
    
    private BookingStatus status;
    
    private LocalDateTime checkinTime;
    
    private LocalDateTime checkoutTime;
    
    private String serviceResults;
    
    private BigDecimal amount;
    
    private Boolean isPaid;
    
    private LocalDateTime paymentTime;
    
    private PaymentMethod paymentMethod;
    
    private String cancellationReason;
}
