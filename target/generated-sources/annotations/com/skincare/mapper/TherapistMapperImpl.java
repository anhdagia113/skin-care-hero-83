package com.skincare.mapper;

import com.skincare.dto.TherapistDto;
import com.skincare.model.Service;
import com.skincare.model.Therapist;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-16T08:49:16+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.9 (Oracle Corporation)"
)
@Component
public class TherapistMapperImpl extends TherapistMapper {

    @Override
    public TherapistDto toDto(Therapist therapist) {
        if ( therapist == null ) {
            return null;
        }

        TherapistDto.TherapistDtoBuilder therapistDto = TherapistDto.builder();

        therapistDto.serviceIds( servicesToIds( therapist.getServices() ) );
        therapistDto.id( therapist.getId() );
        therapistDto.firstName( therapist.getFirstName() );
        therapistDto.lastName( therapist.getLastName() );
        therapistDto.bio( therapist.getBio() );
        therapistDto.specialization( therapist.getSpecialization() );
        therapistDto.email( therapist.getEmail() );
        therapistDto.phoneNumber( therapist.getPhoneNumber() );
        therapistDto.photoUrl( therapist.getPhotoUrl() );
        therapistDto.workSchedule( therapist.getWorkSchedule() );

        return therapistDto.build();
    }

    @Override
    public Therapist toEntity(TherapistDto therapistDto) {
        if ( therapistDto == null ) {
            return null;
        }

        Therapist.TherapistBuilder therapist = Therapist.builder();

        therapist.services( idsToServices( therapistDto.getServiceIds() ) );
        therapist.id( therapistDto.getId() );
        therapist.firstName( therapistDto.getFirstName() );
        therapist.lastName( therapistDto.getLastName() );
        therapist.bio( therapistDto.getBio() );
        therapist.specialization( therapistDto.getSpecialization() );
        therapist.email( therapistDto.getEmail() );
        therapist.phoneNumber( therapistDto.getPhoneNumber() );
        therapist.photoUrl( therapistDto.getPhotoUrl() );
        therapist.workSchedule( therapistDto.getWorkSchedule() );

        return therapist.build();
    }

    @Override
    public List<TherapistDto> toDtoList(List<Therapist> therapists) {
        if ( therapists == null ) {
            return null;
        }

        List<TherapistDto> list = new ArrayList<TherapistDto>( therapists.size() );
        for ( Therapist therapist : therapists ) {
            list.add( toDto( therapist ) );
        }

        return list;
    }

    @Override
    public void updateEntityFromDto(TherapistDto dto, Therapist entity) {
        if ( dto == null ) {
            return;
        }

        if ( entity.getServices() != null ) {
            Set<Service> set = idsToServices( dto.getServiceIds() );
            if ( set != null ) {
                entity.getServices().clear();
                entity.getServices().addAll( set );
            }
            else {
                entity.setServices( null );
            }
        }
        else {
            Set<Service> set = idsToServices( dto.getServiceIds() );
            if ( set != null ) {
                entity.setServices( set );
            }
        }
        entity.setId( dto.getId() );
        entity.setFirstName( dto.getFirstName() );
        entity.setLastName( dto.getLastName() );
        entity.setBio( dto.getBio() );
        entity.setSpecialization( dto.getSpecialization() );
        entity.setEmail( dto.getEmail() );
        entity.setPhoneNumber( dto.getPhoneNumber() );
        entity.setPhotoUrl( dto.getPhotoUrl() );
        entity.setWorkSchedule( dto.getWorkSchedule() );
    }
}
