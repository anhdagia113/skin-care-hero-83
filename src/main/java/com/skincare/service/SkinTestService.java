
package com.skincare.service;

import com.skincare.dto.ServiceDto;
import com.skincare.dto.SkinTestDto;
import com.skincare.exception.ResourceNotFoundException;
import com.skincare.mapper.ServiceMapper;
import com.skincare.model.Customer;
import com.skincare.model.Service;
import com.skincare.model.SkinTest;
import com.skincare.repository.CustomerRepository;
import com.skincare.repository.ServiceRepository;
import com.skincare.repository.SkinTestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class SkinTestService {
    private final SkinTestRepository skinTestRepository;
    private final CustomerRepository customerRepository;
    private final ServiceRepository serviceRepository;
    private final ServiceMapper serviceMapper;

    @Transactional
    public SkinTestDto createSkinTest(SkinTestDto skinTestDto) {
        SkinTest skinTest = new SkinTest();

        if (skinTestDto.getCustomerId() != null) {
            Customer customer = customerRepository.findById(skinTestDto.getCustomerId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Customer not found with id: " + skinTestDto.getCustomerId()));
            skinTest.setCustomer(customer);
        }

        skinTest.setSkinType(skinTestDto.getSkinType());
        skinTest.setSkinConcerns(skinTestDto.getSkinConcerns());
        skinTest.setOiliness(skinTestDto.getOiliness());
        skinTest.setSensitivity(skinTestDto.getSensitivity());
        skinTest.setHydration(skinTestDto.getHydration());
        skinTest.setPigmentation(skinTestDto.getPigmentation());
        skinTest.setWrinkles(skinTestDto.getWrinkles());
        skinTest.setAdditionalNotes(skinTestDto.getAdditionalNotes());

        SkinTest savedSkinTest = skinTestRepository.save(skinTest);

        SkinTestDto responseDto = new SkinTestDto();
        responseDto.setId(savedSkinTest.getId());
        if (savedSkinTest.getCustomer() != null) {
            responseDto.setCustomerId(savedSkinTest.getCustomer().getId());
        }
        responseDto.setSkinType(savedSkinTest.getSkinType());
        responseDto.setSkinConcerns(savedSkinTest.getSkinConcerns());
        responseDto.setOiliness(savedSkinTest.getOiliness());
        responseDto.setSensitivity(savedSkinTest.getSensitivity());
        responseDto.setHydration(savedSkinTest.getHydration());
        responseDto.setPigmentation(savedSkinTest.getPigmentation());
        responseDto.setWrinkles(savedSkinTest.getWrinkles());
        responseDto.setAdditionalNotes(savedSkinTest.getAdditionalNotes());

        return responseDto;
    }

    public List<ServiceDto> getRecommendedServices(SkinTestDto skinTestDto) {
        // Implementation of recommendation algorithm based on skin test data
        List<Service> allServices = serviceRepository.findAll();
        List<Service> recommendedServices = new ArrayList<>();

        // Simple algorithm - in a real system this would be more sophisticated
        for (Service service : allServices) {
            // Example logic - add services that match the skin type
            if (service.getDescription() != null &&
                    skinTestDto.getSkinType() != null &&
                    service.getDescription().toLowerCase().contains(skinTestDto.getSkinType().toLowerCase())) {
                recommendedServices.add(service);
                continue;
            }

            // Add services that address specific concerns
            if (service.getDescription() != null &&
                    skinTestDto.getSkinConcerns() != null &&
                    service.getDescription().toLowerCase().contains(skinTestDto.getSkinConcerns().toLowerCase())) {
                recommendedServices.add(service);
                continue;
            }

            // More recommendation logic can be added based on other parameters
        }

        return serviceMapper.toDtoList(recommendedServices);
    }
}
