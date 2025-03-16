
package com.skincare.controller;

import com.skincare.dto.ServiceDto;
import com.skincare.dto.SkinTestDto;
import com.skincare.service.SkinTestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/skin-test")
@RequiredArgsConstructor
@Tag(name = "Skin Test", description = "Skin test and recommendation APIs")
public class SkinTestController {
    private final SkinTestService skinTestService;

    @PostMapping
    @Operation(summary = "Submit skin test", description = "Submits skin test data and returns recommended services")
    public ResponseEntity<List<ServiceDto>> submitSkinTest(@Valid @RequestBody SkinTestDto skinTestDto) {
        SkinTestDto savedTest = skinTestService.createSkinTest(skinTestDto);
        List<ServiceDto> recommendedServices = skinTestService.getRecommendedServices(skinTestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(recommendedServices);
    }
}
