package com.skincare.mapper;

import com.skincare.dto.ServiceDto;
import com.skincare.model.Service;
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
public class ServiceMapperImpl implements ServiceMapper {

    @Override
    public ServiceDto toDto(Service service) {
        if ( service == null ) {
            return null;
        }

        ServiceDto.ServiceDtoBuilder serviceDto = ServiceDto.builder();

        serviceDto.id( service.getId() );
        serviceDto.name( service.getName() );
        serviceDto.description( service.getDescription() );
        serviceDto.price( service.getPrice() );
        serviceDto.durationMinutes( service.getDurationMinutes() );

        return serviceDto.build();
    }

    @Override
    public Service toEntity(ServiceDto serviceDto) {
        if ( serviceDto == null ) {
            return null;
        }

        Service.ServiceBuilder service = Service.builder();

        service.id( serviceDto.getId() );
        service.name( serviceDto.getName() );
        service.description( serviceDto.getDescription() );
        service.price( serviceDto.getPrice() );
        service.durationMinutes( serviceDto.getDurationMinutes() );

        return service.build();
    }

    @Override
    public List<ServiceDto> toDtoList(List<Service> services) {
        if ( services == null ) {
            return null;
        }

        List<ServiceDto> list = new ArrayList<ServiceDto>( services.size() );
        for ( Service service : services ) {
            list.add( toDto( service ) );
        }

        return list;
    }

    @Override
    public void updateEntityFromDto(ServiceDto dto, Service entity) {
        if ( dto == null ) {
            return;
        }

        entity.setId( dto.getId() );
        entity.setName( dto.getName() );
        entity.setDescription( dto.getDescription() );
        entity.setPrice( dto.getPrice() );
        entity.setDurationMinutes( dto.getDurationMinutes() );
    }
}
