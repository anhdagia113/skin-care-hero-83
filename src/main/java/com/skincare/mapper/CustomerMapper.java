
package com.skincare.mapper;

import com.skincare.dto.CustomerDto;
import com.skincare.model.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    CustomerDto toDto(Customer customer);
    
    Customer toEntity(CustomerDto customerDto);
    
    List<CustomerDto> toDtoList(List<Customer> customers);
    
    void updateEntityFromDto(CustomerDto dto, @MappingTarget Customer entity);
}
