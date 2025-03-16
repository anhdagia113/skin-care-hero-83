
package com.skincare.mapper;

import com.skincare.dto.BookingDto;
import com.skincare.model.Booking;
import com.skincare.model.Customer;
import com.skincare.model.Service;
import com.skincare.model.Therapist;
import com.skincare.repository.CustomerRepository;
import com.skincare.repository.ServiceRepository;
import com.skincare.repository.TherapistRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class BookingMapper {
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private ServiceRepository serviceRepository;
    
    @Autowired
    private TherapistRepository therapistRepository;

    @Mappings({
        @Mapping(target = "customerId", source = "customer.id"),
        @Mapping(target = "serviceId", source = "service.id"),
        @Mapping(target = "therapistId", source = "therapist.id")
    })
    public abstract BookingDto toDto(Booking booking);

    @Mappings({
        @Mapping(target = "customer", source = "customerId", qualifiedByName = "idToCustomer"),
        @Mapping(target = "service", source = "serviceId", qualifiedByName = "idToService"),
        @Mapping(target = "therapist", source = "therapistId", qualifiedByName = "idToTherapist")
    })
    public abstract Booking toEntity(BookingDto bookingDto);

    public abstract List<BookingDto> toDtoList(List<Booking> bookings);

    @Mappings({
        @Mapping(target = "customer", source = "customerId", qualifiedByName = "idToCustomer"),
        @Mapping(target = "service", source = "serviceId", qualifiedByName = "idToService"),
        @Mapping(target = "therapist", source = "therapistId", qualifiedByName = "idToTherapist")
    })
    public abstract void updateEntityFromDto(BookingDto dto, @MappingTarget Booking entity);

    @Named("idToCustomer")
    Customer idToCustomer(Long id) {
        if (id == null) {
            return null;
        }
        return customerRepository.findById(id).orElse(null);
    }

    @Named("idToService")
    Service idToService(Long id) {
        if (id == null) {
            return null;
        }
        return serviceRepository.findById(id).orElse(null);
    }

    @Named("idToTherapist")
    Therapist idToTherapist(Long id) {
        if (id == null) {
            return null;
        }
        return therapistRepository.findById(id).orElse(null);
    }
}
