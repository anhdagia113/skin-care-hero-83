
package com.skincare.payload.response;

import java.util.List;
import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private Long customerId;
    private Long therapistId;
    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String username, String email, Long customerId, Long therapistId, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.customerId = customerId;
        this.therapistId = therapistId;
        this.roles = roles;
    }
}
