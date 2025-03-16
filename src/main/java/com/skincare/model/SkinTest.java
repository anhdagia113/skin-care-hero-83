
package com.skincare.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "skin_tests")
public class SkinTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private String skinType;
    
    private String skinConcerns;
    
    private Integer oiliness;
    
    private Integer sensitivity;
    
    private Integer hydration;
    
    private Integer pigmentation;
    
    private Integer wrinkles;
    
    @Column(columnDefinition = "TEXT")
    private String additionalNotes;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
