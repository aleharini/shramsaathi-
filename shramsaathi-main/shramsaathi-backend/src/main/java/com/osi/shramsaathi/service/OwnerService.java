// package com.osi.shramsaathi.service;

// import org.springframework.stereotype.Service;
// import com.osi.shramsaathi.dto.OwnerRequest;
// import com.osi.shramsaathi.exception.DuplicateResourceException;
// import com.osi.shramsaathi.model.Owner;
// import com.osi.shramsaathi.repository.OwnerRepository;
// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// public class OwnerService {
    
//     private final OwnerRepository ownerRepository;

//     public Owner registerOwner(OwnerRequest request) {
//         // Check for existing owner with same phone or email
//         if (ownerRepository.existsByPhone(request.getPhone())) {
//             throw new DuplicateResourceException("Phone number already registered");
//         }
//         if (ownerRepository.existsByEmail(request.getEmail())) {
//             throw new DuplicateResourceException("Email already registered");
//         }

//         // Create and save new owner
//         Owner owner = Owner.builder()
//                 .name(request.getName())
//                 .phone(request.getPhone())
//                 .email(request.getEmail())
//                 .companyName(request.getBusinessName())
//                 .district(request.getDistrict())
//                 .mandal(request.getMandal())
//                 .pincode(Integer.parseInt(request.getPincode()))
//                 .build();

//         return ownerRepository.save(owner);
//     }
// }


package com.osi.shramsaathi.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.osi.shramsaathi.dto.OwnerRequest;
import com.osi.shramsaathi.exception.DuplicateResourceException;
import com.osi.shramsaathi.model.Owner;
import com.osi.shramsaathi.repository.OwnerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OwnerService {
    
    private final OwnerRepository ownerRepository;

    // ✅ Register new owner
    public Owner registerOwner(OwnerRequest request) {
        if (ownerRepository.existsByPhone(request.getPhone())) {
            throw new DuplicateResourceException("Phone number already registered");
        }
        if (ownerRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already registered");
        }

        Owner owner = Owner.builder()
                .name(request.getName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .companyName(request.getBusinessName())
                .district(request.getDistrict())
                .mandal(request.getMandal())
                .pincode(Integer.parseInt(request.getPincode()))
                .build();

        return ownerRepository.save(owner);
    }

    // ✅ Get all owners
    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }

    // ✅ Search owners by district or pincode
    public List<Owner> searchOwners(String district, String pincode) {
        List<Owner> owners = ownerRepository.findAll();

        return owners.stream()
                .filter(o -> 
                    (district == null || o.getDistrict().equalsIgnoreCase(district)) &&
                    (pincode == null || o.getPincode().toString().equals(pincode))
                )
                .collect(Collectors.toList());
    }
}
