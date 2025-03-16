
package com.skincare.controller;

import com.skincare.dto.BookingDto;
import com.skincare.dto.CustomerDto;
import com.skincare.service.BookingService;
import com.skincare.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@Tag(name = "Customers", description = "Customer management APIs")
public class CustomerController {
    private final CustomerService customerService;
    private final BookingService bookingService;

    @GetMapping("/{id}")
    @Operation(summary = "Get customer by ID", description = "Retrieves a specific customer by their ID")
    public ResponseEntity<CustomerDto> getCustomerById(@PathVariable Long id) {
        CustomerDto customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(customer);
    }

    @PostMapping
    @Operation(summary = "Create new customer", description = "Creates a new customer profile")
    public ResponseEntity<CustomerDto> createCustomer(@Valid @RequestBody CustomerDto customerDto) {
        CustomerDto createdCustomer = customerService.createCustomer(customerDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomer);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update customer", description = "Updates an existing customer by their ID")
    public ResponseEntity<CustomerDto> updateCustomer(@PathVariable Long id, @Valid @RequestBody CustomerDto customerDto) {
        CustomerDto updatedCustomer = customerService.updateCustomer(id, customerDto);
        return ResponseEntity.ok(updatedCustomer);
    }

    @GetMapping("/{id}/bookings")
    @Operation(summary = "Get customer bookings", description = "Retrieves a list of bookings for a specific customer")
    public ResponseEntity<List<BookingDto>> getCustomerBookings(@PathVariable Long id) {
        List<BookingDto> bookings = bookingService.getCustomerBookings(id);
        return ResponseEntity.ok(bookings);
    }
}
