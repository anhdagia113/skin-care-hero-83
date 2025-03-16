
package com.skincare.service;

import com.skincare.dto.BookingDto;
import com.skincare.exception.ResourceNotFoundException;
import com.skincare.mapper.BookingMapper;
import com.skincare.model.Booking;
import com.skincare.model.Customer;
import com.skincare.repository.BookingRepository;
import com.skincare.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final CustomerRepository customerRepository;
    private final BookingMapper bookingMapper;

    public BookingDto getBookingById(Long id) {
        return bookingRepository.findById(id)
                .map(bookingMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
    }

    @Transactional
    public BookingDto createBooking(BookingDto bookingDto) {
        Booking booking = bookingMapper.toEntity(bookingDto);
        Booking savedBooking = bookingRepository.save(booking);
        return bookingMapper.toDto(savedBooking);
    }

    @Transactional
    public BookingDto checkInBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        
        booking.setCheckinTime(LocalDateTime.now());
        booking.setStatus(Booking.BookingStatus.CHECKED_IN);
        
        Booking updatedBooking = bookingRepository.save(booking);
        return bookingMapper.toDto(updatedBooking);
    }

    @Transactional
    public BookingDto assignTherapist(Long id, Long therapistId) {
        BookingDto bookingDto = getBookingById(id);
        bookingDto.setTherapistId(therapistId);
        
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        
        bookingMapper.updateEntityFromDto(bookingDto, booking);
        Booking updatedBooking = bookingRepository.save(booking);
        return bookingMapper.toDto(updatedBooking);
    }

    @Transactional
    public BookingDto recordServiceResults(Long id, String results) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        
        booking.setServiceResults(results);
        booking.setStatus(Booking.BookingStatus.COMPLETED);
        
        Booking updatedBooking = bookingRepository.save(booking);
        return bookingMapper.toDto(updatedBooking);
    }

    @Transactional
    public BookingDto checkOutBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        
        booking.setCheckoutTime(LocalDateTime.now());
        booking.setStatus(Booking.BookingStatus.COMPLETED);
        
        Booking updatedBooking = bookingRepository.save(booking);
        return bookingMapper.toDto(updatedBooking);
    }

    @Transactional
    public BookingDto processPayment(Long id, Booking.PaymentMethod paymentMethod) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        
        booking.setIsPaid(true);
        booking.setPaymentTime(LocalDateTime.now());
        booking.setPaymentMethod(paymentMethod);
        
        Booking updatedBooking = bookingRepository.save(booking);
        return bookingMapper.toDto(updatedBooking);
    }

    @Transactional
    public void cancelBooking(Long id, String reason) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        
        booking.setStatus(Booking.BookingStatus.CANCELLED);
        booking.setCancellationReason(reason);
        
        bookingRepository.save(booking);
    }

    public List<BookingDto> getCustomerBookings(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + customerId));
        
        List<Booking> bookings = bookingRepository.findByCustomer(customer);
        return bookingMapper.toDtoList(bookings);
    }

    public List<BookingDto> getBookingsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        List<Booking> bookings = bookingRepository.findBookingsBetweenDates(startDate, endDate);
        return bookingMapper.toDtoList(bookings);
    }
}
