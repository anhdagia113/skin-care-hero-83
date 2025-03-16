
package com.skincare.controller;

import com.skincare.dto.ServiceDto;
import com.skincare.service.ServiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@Tag(name = "Services", description = "Service management APIs")
public class ServiceController {
    private final ServiceService serviceService;

    @GetMapping
    @Operation(summary = "Get all services", description = "Retrieves a list of all available services")
    public ResponseEntity<List<ServiceDto>> getAllServices() {
        List<ServiceDto> services = serviceService.getAllServices();
        return ResponseEntity.ok(services);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get service by ID", description = "Retrieves a specific service by its ID")
    public ResponseEntity<ServiceDto> getServiceById(@PathVariable Long id) {
        ServiceDto service = serviceService.getServiceById(id);
        return ResponseEntity.ok(service);
    }

    @PostMapping
    @Operation(summary = "Create new service", description = "Creates a new service entry")
    public ResponseEntity<ServiceDto> createService(@Valid @RequestBody ServiceDto serviceDto) {
        ServiceDto createdService = serviceService.createService(serviceDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdService);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update service", description = "Updates an existing service by its ID")
    public ResponseEntity<ServiceDto> updateService(@PathVariable Long id, @Valid @RequestBody ServiceDto serviceDto) {
        ServiceDto updatedService = serviceService.updateService(id, serviceDto);
        return ResponseEntity.ok(updatedService);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete service", description = "Deletes a service by its ID")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }
}
