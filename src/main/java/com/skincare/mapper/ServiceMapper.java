
package com.skincare.mapper;

import com.skincare.dto.ServiceDto;
import com.skincare.model.Service;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ServiceMapper {
    ServiceDto toDto(Service service);
    
    Service toEntity(ServiceDto serviceDto);
    
    List<ServiceDto> toDtoList(List<Service> services);
    
    void updateEntityFromDto(ServiceDto dto, @MappingTarget Service entity);
}
