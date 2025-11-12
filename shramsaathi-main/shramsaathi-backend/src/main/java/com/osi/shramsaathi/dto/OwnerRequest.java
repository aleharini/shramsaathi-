// package com.osi.shramsaathi.dto;

// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Pattern;
// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Builder
// public class OwnerRequest {
//     @NotBlank(message = "Name is required")
//     private String name;

//     @NotBlank(message = "Phone is required")
//     @Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits")
//     private String phone;

//     @NotBlank(message = "Email is required")
//     @Email(message = "Invalid email format")
//     private String email;

//     @NotBlank(message = "District is required")
//     private String district;

//     @NotBlank(message = "Mandal is required")
//     private String mandal;

//     @Pattern(regexp = "^\\d{6}$", message = "Pincode must be 6 digits")
//     private String pincode;

//     @NotBlank(message = "Business name is required")
//     private String businessName;
// }


package com.osi.shramsaathi.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OwnerRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits")
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "District is required")
    private String district;

    @NotBlank(message = "Mandal is required")
    private String mandal;

    @Pattern(regexp = "^\\d{6}$", message = "Pincode must be 6 digits")
    private String pincode;

    @NotBlank(message = "Business name is required")
    private String businessName;
}
