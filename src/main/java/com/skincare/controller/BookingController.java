
package com.skincare.controller;

import com.skincare.dto.BookingDto;
import com.skincare.model.Booking;
import com.skincare.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@Tag(name = "Bookings", description = "Booking management APIs")
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
    @Operation(summary = "Create new booking", description = "Creates a new booking for a service")
    public ResponseEntity<BookingDto> createBooking(@Valid @RequestBody BookingDto bookingDto) {
        BookingDto createdBooking = bookingService.createBooking(bookingDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
    }

    @PutMapping("/{id}/checkin")
    @Operation(summary = "Check in customer", description = "Records when a customer checks in for their appointment")
    public ResponseEntity<BookingDto> checkInBooking(@PathVariable Long id) {
        BookingDto updatedBooking = bookingService.checkInBooking(id);
        return ResponseEntity.ok(updatedBooking);
    }

    @PutMapping("/{id}/assign")
    @Operation(summary = "Assign therapist", description = "Assigns a therapist to a booking")
    public ResponseEntity<BookingDto> assignTherapist(@PathVariable Long id, @RequestBody Map<String, Long> payload) {
        Long therapistId = payload.get("therapistId");
        BookingDto updatedBooking = bookingService.assignTherapist(id, therapistId);
        return ResponseEntity.ok(updatedBooking);
    }

    @PutMapping("/{id}/result")
    @Operation(summary = "Record service results", description = "Records the results of a service")
    public ResponseEntity<BookingDto> recordServiceResults(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String results = payload.get("results");
        BookingDto updatedBooking = bookingService.recordServiceResults(id, results);
        return ResponseEntity.ok(updatedBooking);
    }

    @PutMapping("/{id}/checkout")
    @Operation(summary = "Check out customer", description = "Records when a customer checks out after their appointment")
    public ResponseEntity<BookingDto> checkOutBooking(@PathVariable Long id) {
        BookingDto updatedBooking = bookingService.checkOutBooking(id);
        return ResponseEntity.ok(updatedBooking);
    }

    @PostMapping("/{id}/payment")
    @Operation(summary = "Process payment", description = "Processes payment for a booking")
    public ResponseEntity<BookingDto> processPayment(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        Booking.PaymentMethod paymentMethod = Booking.PaymentMethod.valueOf(payload.get("paymentMethod"));
        BookingDto updatedBooking = bookingService.processPayment(id, paymentMethod);
        return ResponseEntity.ok(updatedBooking);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancel booking", description = "Cancels a booking")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String reason = payload.get("reason");
        bookingService.cancelBooking(id, reason);
        return ResponseEntity.noContent().build();
    }
}
