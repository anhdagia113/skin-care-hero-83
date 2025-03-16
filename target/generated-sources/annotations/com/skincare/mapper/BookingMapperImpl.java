package com.skincare.mapper;

import com.skincare.dto.BookingDto;
import com.skincare.model.Booking;
import com.skincare.model.Customer;
import com.skincare.model.Service;
import com.skincare.model.Therapist;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-16T08:49:16+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.9 (Oracle Corporation)"
)
@Component
public class BookingMapperImpl extends BookingMapper {

    @Override
    public BookingDto toDto(Booking booking) {
        if ( booking == null ) {
            return null;
        }

        BookingDto.BookingDtoBuilder bookingDto = BookingDto.builder();

        bookingDto.customerId( bookingCustomerId( booking ) );
        bookingDto.serviceId( bookingServiceId( booking ) );
        bookingDto.therapistId( bookingTherapistId( booking ) );
        bookingDto.id( booking.getId() );
        bookingDto.appointmentTime( booking.getAppointmentTime() );
        bookingDto.status( booking.getStatus() );
        bookingDto.checkinTime( booking.getCheckinTime() );
        bookingDto.checkoutTime( booking.getCheckoutTime() );
        bookingDto.serviceResults( booking.getServiceResults() );
        bookingDto.amount( booking.getAmount() );
        bookingDto.isPaid( booking.getIsPaid() );
        bookingDto.paymentTime( booking.getPaymentTime() );
        bookingDto.paymentMethod( booking.getPaymentMethod() );
        bookingDto.cancellationReason( booking.getCancellationReason() );

        return bookingDto.build();
    }

    @Override
    public Booking toEntity(BookingDto bookingDto) {
        if ( bookingDto == null ) {
            return null;
        }

        Booking.BookingBuilder booking = Booking.builder();

        booking.customer( idToCustomer( bookingDto.getCustomerId() ) );
        booking.service( idToService( bookingDto.getServiceId() ) );
        booking.therapist( idToTherapist( bookingDto.getTherapistId() ) );
        booking.id( bookingDto.getId() );
        booking.appointmentTime( bookingDto.getAppointmentTime() );
        booking.status( bookingDto.getStatus() );
        booking.checkinTime( bookingDto.getCheckinTime() );
        booking.checkoutTime( bookingDto.getCheckoutTime() );
        booking.serviceResults( bookingDto.getServiceResults() );
        booking.amount( bookingDto.getAmount() );
        booking.isPaid( bookingDto.getIsPaid() );
        booking.paymentTime( bookingDto.getPaymentTime() );
        booking.paymentMethod( bookingDto.getPaymentMethod() );
        booking.cancellationReason( bookingDto.getCancellationReason() );

        return booking.build();
    }

    @Override
    public List<BookingDto> toDtoList(List<Booking> bookings) {
        if ( bookings == null ) {
            return null;
        }

        List<BookingDto> list = new ArrayList<BookingDto>( bookings.size() );
        for ( Booking booking : bookings ) {
            list.add( toDto( booking ) );
        }

        return list;
    }

    @Override
    public void updateEntityFromDto(BookingDto dto, Booking entity) {
        if ( dto == null ) {
            return;
        }

        entity.setCustomer( idToCustomer( dto.getCustomerId() ) );
        entity.setService( idToService( dto.getServiceId() ) );
        entity.setTherapist( idToTherapist( dto.getTherapistId() ) );
        entity.setId( dto.getId() );
        entity.setAppointmentTime( dto.getAppointmentTime() );
        entity.setStatus( dto.getStatus() );
        entity.setCheckinTime( dto.getCheckinTime() );
        entity.setCheckoutTime( dto.getCheckoutTime() );
        entity.setServiceResults( dto.getServiceResults() );
        entity.setAmount( dto.getAmount() );
        entity.setIsPaid( dto.getIsPaid() );
        entity.setPaymentTime( dto.getPaymentTime() );
        entity.setPaymentMethod( dto.getPaymentMethod() );
        entity.setCancellationReason( dto.getCancellationReason() );
    }

    private Long bookingCustomerId(Booking booking) {
        if ( booking == null ) {
            return null;
        }
        Customer customer = booking.getCustomer();
        if ( customer == null ) {
            return null;
        }
        Long id = customer.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long bookingServiceId(Booking booking) {
        if ( booking == null ) {
            return null;
        }
        Service service = booking.getService();
        if ( service == null ) {
            return null;
        }
        Long id = service.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long bookingTherapistId(Booking booking) {
        if ( booking == null ) {
            return null;
        }
        Therapist therapist = booking.getTherapist();
        if ( therapist == null ) {
            return null;
        }
        Long id = therapist.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
