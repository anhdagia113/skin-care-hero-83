
package com.skincare.mapper;

import com.skincare.dto.TherapistDto;
import com.skincare.model.Service;
import com.skincare.model.Therapist;
import com.skincare.repository.ServiceRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {ServiceMapper.class})
public abstract class TherapistMapper {
    @Autowired
    private ServiceRepository serviceRepository;

    @Mapping(target = "serviceIds", source = "services", qualifiedByName = "servicesToIds")
    public abstract TherapistDto toDto(Therapist therapist);

    @Mapping(target = "services", source = "serviceIds", qualifiedByName = "idsToServices")
    public abstract Therapist toEntity(TherapistDto therapistDto);

    public abstract List<TherapistDto> toDtoList(List<Therapist> therapists);

    @Mapping(target = "services", source = "serviceIds", qualifiedByName = "idsToServices")
    public abstract void updateEntityFromDto(TherapistDto dto, @MappingTarget Therapist entity);

    @Named("servicesToIds")
    Set<Long> servicesToIds(Set<Service> services) {
        if (services == null) {
            return new HashSet<>();
        }
        return services.stream()
                .map(Service::getId)
                .collect(Collectors.toSet());
    }

    @Named("idsToServices")
    Set<Service> idsToServices(Set<Long> ids) {
        if (ids == null) {
            return new HashSet<>();
        }
        return ids.stream()
                .map(id -> serviceRepository.findById(id).orElse(null))
                .filter(service -> service != null)
                .collect(Collectors.toSet());
    }
}
