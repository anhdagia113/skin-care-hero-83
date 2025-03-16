
package com.skincare.controller;

import com.skincare.dto.TherapistDto;
import com.skincare.service.TherapistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/therapists")
@RequiredArgsConstructor
@Tag(name = "Therapists", description = "Therapist management APIs")
public class TherapistController {
    private final TherapistService therapistService;

    @GetMapping
    @Operation(summary = "Get all therapists", description = "Retrieves a list of all therapists")
    public ResponseEntity<List<TherapistDto>> getAllTherapists() {
        List<TherapistDto> therapists = therapistService.getAllTherapists();
        return ResponseEntity.ok(therapists);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get therapist by ID", description = "Retrieves a specific therapist by their ID")
    public ResponseEntity<TherapistDto> getTherapistById(@PathVariable Long id) {
        TherapistDto therapist = therapistService.getTherapistById(id);
        return ResponseEntity.ok(therapist);
    }

    @PostMapping
    @Operation(summary = "Create new therapist", description = "Creates a new therapist entry")
    public ResponseEntity<TherapistDto> createTherapist(@Valid @RequestBody TherapistDto therapistDto) {
        TherapistDto createdTherapist = therapistService.createTherapist(therapistDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTherapist);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update therapist", description = "Updates an existing therapist by their ID")
    public ResponseEntity<TherapistDto> updateTherapist(@PathVariable Long id, @Valid @RequestBody TherapistDto therapistDto) {
        TherapistDto updatedTherapist = therapistService.updateTherapist(id, therapistDto);
        return ResponseEntity.ok(updatedTherapist);
    }
}
