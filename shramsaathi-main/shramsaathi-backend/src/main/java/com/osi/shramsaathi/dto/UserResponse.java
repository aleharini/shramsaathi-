


package com.osi.shramsaathi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;
    private String name;
    private String phone;
    private String address;
    private String workType;
    private String district;
    private String mandal;
    private Integer pincode;
    private Integer age;
    private Integer experience;
    private Boolean registered;
    private Double latitude;
    private Double longitude;
}
