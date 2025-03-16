
package com.skincare.controller;

import com.skincare.dto.FeedbackDto;
import com.skincare.service.FeedbackService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
@Tag(name = "Feedback", description = "Feedback and rating APIs")
public class FeedbackController {
    private final FeedbackService feedbackService;

    @GetMapping
    @Operation(summary = "Get feedback", description = "Retrieves feedback by service or therapist ID")
    public ResponseEntity<List<FeedbackDto>> getFeedback(@RequestParam(required = false) Long serviceId, 
                                                         @RequestParam(required = false) Long therapistId) {
        if (serviceId != null) {
            return ResponseEntity.ok(feedbackService.getFeedbackByService(serviceId));
        } else if (therapistId != null) {
            return ResponseEntity.ok(feedbackService.getFeedbackByTherapist(therapistId));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping
    @Operation(summary = "Submit feedback", description = "Submits feedback and rating for a service/therapist")
    public ResponseEntity<FeedbackDto> submitFeedback(@Valid @RequestBody FeedbackDto feedbackDto) {
        FeedbackDto savedFeedback = feedbackService.createFeedback(feedbackDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFeedback);
    }
}
