
package com.skincare.service;

import com.skincare.dto.TherapistDto;
import com.skincare.exception.ResourceNotFoundException;
import com.skincare.mapper.TherapistMapper;
import com.skincare.model.Therapist;
import com.skincare.repository.TherapistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TherapistService {
    private final TherapistRepository therapistRepository;
    private final TherapistMapper therapistMapper;

    public List<TherapistDto> getAllTherapists() {
        return therapistMapper.toDtoList(therapistRepository.findAll());
    }

    public TherapistDto getTherapistById(Long id) {
        return therapistRepository.findById(id)
                .map(therapistMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Therapist not found with id: " + id));
    }

    @Transactional
    public TherapistDto createTherapist(TherapistDto therapistDto) {
        Therapist therapist = therapistMapper.toEntity(therapistDto);
        Therapist savedTherapist = therapistRepository.save(therapist);
        return therapistMapper.toDto(savedTherapist);
    }

    @Transactional
    public TherapistDto updateTherapist(Long id, TherapistDto therapistDto) {
        Therapist existingTherapist = therapistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Therapist not found with id: " + id));
        
        therapistMapper.updateEntityFromDto(therapistDto, existingTherapist);
        Therapist updatedTherapist = therapistRepository.save(existingTherapist);
        return therapistMapper.toDto(updatedTherapist);
    }
}
