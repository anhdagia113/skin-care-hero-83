
package com.skincare.service;

import com.skincare.dto.ServiceDto;
import com.skincare.dto.TherapistDto;
import com.skincare.mapper.ServiceMapper;
import com.skincare.mapper.TherapistMapper;
import com.skincare.model.Service;
import com.skincare.model.Therapist;
import com.skincare.repository.ServiceRepository;
import com.skincare.repository.TherapistRepository;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HomeService {
    private final ServiceRepository serviceRepository;
    private final TherapistRepository therapistRepository;
    private final ServiceMapper serviceMapper;
    private final TherapistMapper therapistMapper;

    public Map<String, Object> getHomePageData() {
        Map<String, Object> homeData = new HashMap<>();
        
        // Add introduction
        homeData.put("introduction", getIntroduction());
        
        // Add services
        List<Service> services = serviceRepository.findAll();
        List<ServiceDto> serviceDtos = serviceMapper.toDtoList(services);
        homeData.put("services", serviceDtos);
        
        // Add therapists
        List<Therapist> therapists = therapistRepository.findAll();
        List<TherapistDto> therapistDtos = therapistMapper.toDtoList(therapists);
        homeData.put("therapists", therapistDtos);
        
        // Add blog and news placeholders
        homeData.put("blog", getBlogPosts());
        homeData.put("news", getNewsItems());
        
        return homeData;
    }

    private Map<String, String> getIntroduction() {
        Map<String, String> intro = new HashMap<>();
        intro.put("title", "Welcome to Skin Care Hero");
        intro.put("description", "Your trusted partner for professional skincare services. Our expert therapists provide personalized treatments to help you achieve your best skin ever.");
        return intro;
    }

    private List<Map<String, String>> getBlogPosts() {
        // This would typically come from a blog database
        List<Map<String, String>> posts = new java.util.ArrayList<>();
        
        Map<String, String> post1 = new HashMap<>();
        post1.put("title", "5 Steps to Perfect Skin");
        post1.put("summary", "Learn the essential steps for a flawless complexion.");
        posts.add(post1);
        
        Map<String, String> post2 = new HashMap<>();
        post2.put("title", "Understanding Your Skin Type");
        post2.put("summary", "How to identify and care for your specific skin needs.");
        posts.add(post2);
        
        return posts;
    }

    private List<Map<String, String>> getNewsItems() {
        // This would typically come from a news database
        List<Map<String, String>> news = new java.util.ArrayList<>();
        
        Map<String, String> news1 = new HashMap<>();
        news1.put("title", "New Advanced Facial Treatment Now Available");
        news1.put("summary", "Try our revolutionary new facial treatment for amazing results.");
        news.add(news1);
        
        Map<String, String> news2 = new HashMap<>();
        news2.put("title", "Summer Skincare Special Offers");
        news2.put("summary", "Exclusive discounts on selected treatments this summer.");
        news.add(news2);
        
        return news;
    }

    public Map<String, Object> getSchedule() {
        Map<String, Object> schedule = new HashMap<>();
        
        schedule.put("weekdays", "09:00 - 20:00");
        schedule.put("saturday", "10:00 - 18:00");
        schedule.put("sunday", "10:00 - 16:00");
        schedule.put("holidayHours", "11:00 - 15:00");
        schedule.put("specialNotes", "Appointments must be booked at least 24 hours in advance.");
        
        return schedule;
    }

    public Map<String, Object> getPaymentPolicy() {
        Map<String, Object> policy = new HashMap<>();
        
        policy.put("acceptedMethods", List.of("Cash", "Credit Card", "Bank Transfer", "Online Payment"));
        policy.put("depositRequired", "30% advance payment required for bookings over $100");
        policy.put("cancellationPolicy", "Free cancellation up to 24 hours before appointment. Late cancellations incur a 50% fee.");
        policy.put("refundPolicy", "Refunds available within 7 days if service was unsatisfactory, subject to review.");
        
        return policy;
    }
}
