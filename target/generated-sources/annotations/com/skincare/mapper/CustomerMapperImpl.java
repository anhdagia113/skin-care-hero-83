package com.skincare.mapper;

import com.skincare.dto.CustomerDto;
import com.skincare.model.Customer;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-16T08:49:15+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.9 (Oracle Corporation)"
)
@Component
public class CustomerMapperImpl implements CustomerMapper {

    @Override
    public CustomerDto toDto(Customer customer) {
        if ( customer == null ) {
            return null;
        }

        CustomerDto.CustomerDtoBuilder customerDto = CustomerDto.builder();

        customerDto.id( customer.getId() );
        customerDto.firstName( customer.getFirstName() );
        customerDto.lastName( customer.getLastName() );
        customerDto.email( customer.getEmail() );
        customerDto.phoneNumber( customer.getPhoneNumber() );
        customerDto.dateOfBirth( customer.getDateOfBirth() );
        customerDto.skinConcerns( customer.getSkinConcerns() );
        customerDto.skinType( customer.getSkinType() );
        customerDto.allergies( customer.getAllergies() );

        return customerDto.build();
    }

    @Override
    public Customer toEntity(CustomerDto customerDto) {
        if ( customerDto == null ) {
            return null;
        }

        Customer.CustomerBuilder customer = Customer.builder();

        customer.id( customerDto.getId() );
        customer.firstName( customerDto.getFirstName() );
        customer.lastName( customerDto.getLastName() );
        customer.email( customerDto.getEmail() );
        customer.phoneNumber( customerDto.getPhoneNumber() );
        customer.dateOfBirth( customerDto.getDateOfBirth() );
        customer.skinConcerns( customerDto.getSkinConcerns() );
        customer.skinType( customerDto.getSkinType() );
        customer.allergies( customerDto.getAllergies() );

        return customer.build();
    }

    @Override
    public List<CustomerDto> toDtoList(List<Customer> customers) {
        if ( customers == null ) {
            return null;
        }

        List<CustomerDto> list = new ArrayList<CustomerDto>( customers.size() );
        for ( Customer customer : customers ) {
            list.add( toDto( customer ) );
        }

        return list;
    }

    @Override
    public void updateEntityFromDto(CustomerDto dto, Customer entity) {
        if ( dto == null ) {
            return;
        }

        entity.setId( dto.getId() );
        entity.setFirstName( dto.getFirstName() );
        entity.setLastName( dto.getLastName() );
        entity.setEmail( dto.getEmail() );
        entity.setPhoneNumber( dto.getPhoneNumber() );
        entity.setDateOfBirth( dto.getDateOfBirth() );
        entity.setSkinConcerns( dto.getSkinConcerns() );
        entity.setSkinType( dto.getSkinType() );
        entity.setAllergies( dto.getAllergies() );
    }
}
