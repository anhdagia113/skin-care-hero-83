
package com.skincare.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkinTestDto {
    private Long id;
    
    private Long customerId;
    
    private String skinType;
    
    private String skinConcerns;
    
    private Integer oiliness;
    
    private Integer sensitivity;
    
    private Integer hydration;
    
    private Integer pigmentation;
    
    private Integer wrinkles;
    
    private String additionalNotes;
}
