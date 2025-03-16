
package com.skincare.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TherapistDto {
    private Long id;
    
    @NotBlank(message = "First name is required")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    private String lastName;
    
    private String bio;
    
    private String specialization;
    
    @Email(message = "Invalid email format")
    private String email;
    
    private String phoneNumber;
    
    private String photoUrl;
    
    private String workSchedule;
    
    private Set<Long> serviceIds;
}
