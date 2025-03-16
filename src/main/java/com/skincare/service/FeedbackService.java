
package com.skincare.service;

import com.skincare.dto.FeedbackDto;
import com.skincare.exception.ResourceNotFoundException;
import com.skincare.model.Booking;
import com.skincare.model.Customer;
import com.skincare.model.Feedback;
import com.skincare.model.Service;
import com.skincare.model.Therapist;
import com.skincare.repository.BookingRepository;
import com.skincare.repository.FeedbackRepository;
import com.skincare.repository.ServiceRepository;
import com.skincare.repository.TherapistRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final BookingRepository bookingRepository;
    private final ServiceRepository serviceRepository;
    private final TherapistRepository therapistRepository;

    public List<FeedbackDto> getFeedbackByService(Long serviceId) {
        Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + serviceId));

        List<Feedback> feedbacks = feedbackRepository.findByServiceAndIsPublic(service, true);
        return mapToDtoList(feedbacks);
    }

    public List<FeedbackDto> getFeedbackByTherapist(Long therapistId) {
        Therapist therapist = therapistRepository.findById(therapistId)
                .orElseThrow(() -> new ResourceNotFoundException("Therapist not found with id: " + therapistId));

        List<Feedback> feedbacks = feedbackRepository.findByTherapistAndIsPublic(therapist, true);
        return mapToDtoList(feedbacks);
    }

    public FeedbackDto createFeedback(FeedbackDto feedbackDto) {
        Booking booking = bookingRepository.findById(feedbackDto.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Booking not found with id: " + feedbackDto.getBookingId()));

        Feedback feedback = new Feedback();
        feedback.setBooking(booking);
        feedback.setCustomer(booking.getCustomer());
        feedback.setService(booking.getService());
        feedback.setTherapist(booking.getTherapist());
        feedback.setRating(feedbackDto.getRating());
        feedback.setComment(feedbackDto.getComment());
        feedback.setIsPublic(feedbackDto.getIsPublic() != null ? feedbackDto.getIsPublic() : true);

        Feedback savedFeedback = feedbackRepository.save(feedback);
        return mapToDto(savedFeedback);
    }

    private FeedbackDto mapToDto(Feedback feedback) {
        FeedbackDto dto = new FeedbackDto();
        dto.setId(feedback.getId());
        dto.setBookingId(feedback.getBooking().getId());
        dto.setRating(feedback.getRating());
        dto.setComment(feedback.getComment());
        dto.setIsPublic(feedback.getIsPublic());
        return dto;
    }

    private List<FeedbackDto> mapToDtoList(List<Feedback> feedbacks) {
        return feedbacks.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
}
