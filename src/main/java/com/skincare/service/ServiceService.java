
package com.skincare.service;

import com.skincare.dto.ServiceDto;
import com.skincare.exception.ResourceNotFoundException;
import com.skincare.mapper.ServiceMapper;
import com.skincare.model.Service;
import com.skincare.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceService {
    private final ServiceRepository serviceRepository;
    private final ServiceMapper serviceMapper;

    public List<ServiceDto> getAllServices() {
        return serviceMapper.toDtoList(serviceRepository.findAll());
    }

    public ServiceDto getServiceById(Long id) {
        return serviceRepository.findById(id)
                .map(serviceMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
    }

    @Transactional
    public ServiceDto createService(ServiceDto serviceDto) {
        Service service = serviceMapper.toEntity(serviceDto);
        Service savedService = serviceRepository.save(service);
        return serviceMapper.toDto(savedService);
    }

    @Transactional
    public ServiceDto updateService(Long id, ServiceDto serviceDto) {
        Service existingService = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));

        serviceMapper.updateEntityFromDto(serviceDto, existingService);
        Service updatedService = serviceRepository.save(existingService);
        return serviceMapper.toDto(updatedService);
    }

    @Transactional
    public void deleteService(Long id) {
        if (!serviceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Service not found with id: " + id);
        }
        serviceRepository.deleteById(id);
    }
}
