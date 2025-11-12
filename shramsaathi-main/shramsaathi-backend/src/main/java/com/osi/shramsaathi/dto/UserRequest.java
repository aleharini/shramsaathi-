


package com.osi.shramsaathi.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Phone is required")
    private String phone;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Work type is required")
    private String workType;

    @NotBlank(message = "District is required")
    private String district;

    @NotBlank(message = "Mandal is required")
    private String mandal;

    @NotNull(message = "Pincode is required")
    private Integer pincode;

    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 80, message = "Age cannot exceed 80")
    private Integer age;

    @Min(value = 0, message = "Experience must be at least 0 years")
    @Max(value = 60, message = "Experience cannot exceed 60 years")
    private Integer experience;
}
