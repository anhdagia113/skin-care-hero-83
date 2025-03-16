
package com.skincare.model;

import jakarta.persistence.*;
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
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

    @ManyToOne
    @JoinColumn(name = "therapist_id")
    private Therapist therapist;

    @NotNull
    private LocalDateTime appointmentTime;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private LocalDateTime checkinTime;
    
    private LocalDateTime checkoutTime;

    @Column(columnDefinition = "TEXT")
    private String serviceResults;

    private BigDecimal amount;

    private Boolean isPaid;

    private LocalDateTime paymentTime;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private String cancellationReason;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        status = BookingStatus.BOOKED;
        isPaid = false;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum BookingStatus {
        BOOKED, CHECKED_IN, IN_PROGRESS, COMPLETED, CANCELLED
    }

    public enum PaymentMethod {
        CASH, CREDIT_CARD, BANK_TRANSFER, ONLINE
    }
}
