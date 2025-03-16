
package com.skincare.controller;

import com.skincare.service.HomeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Home", description = "Home page and general information APIs")
public class HomeController {
    private final HomeService homeService;

    @GetMapping("/home")
    @Operation(summary = "Get homepage information", description = "Retrieves introduction, services, therapists, blog and news for homepage")
    public ResponseEntity<Map<String, Object>> getHomePageInfo() {
        Map<String, Object> homeData = homeService.getHomePageData();
        return ResponseEntity.ok(homeData);
    }

    @GetMapping("/schedule")
    @Operation(summary = "Get center schedule", description = "Retrieves the center's operating schedule")
    public ResponseEntity<Map<String, Object>> getSchedule() {
        Map<String, Object> schedule = homeService.getSchedule();
        return ResponseEntity.ok(schedule);
    }

    @GetMapping("/payment-policy")
    @Operation(summary = "Get payment policy", description = "Retrieves the center's payment and cancellation policy")
    public ResponseEntity<Map<String, Object>> getPaymentPolicy() {
        Map<String, Object> policy = homeService.getPaymentPolicy();
        return ResponseEntity.ok(policy);
    }
}
