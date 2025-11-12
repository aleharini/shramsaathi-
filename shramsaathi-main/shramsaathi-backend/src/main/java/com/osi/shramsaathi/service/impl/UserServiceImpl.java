// package com.osi.shramsaathi.service.impl;

// import com.osi.shramsaathi.dto.UserRequest;
// import com.osi.shramsaathi.dto.UserResponse;
// import com.osi.shramsaathi.model.User;
// import com.osi.shramsaathi.repository.UserRepository;
// import com.osi.shramsaathi.service.UserService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// @RequiredArgsConstructor
// public class UserServiceImpl implements UserService {

//     private final UserRepository userRepository;

//     /**
//      * Registers a new user with details provided in the request
//      */
//     @Override
//     public UserResponse register(UserRequest request) {
//         User user = User.builder()
//                 .name(request.getName())
//                 .phone(request.getPhone())
//                 .address(request.getAddress())
//                 .workType(request.getWorkType())
//                 .district(request.getDistrict())
//                 .mandal(request.getMandal())
//                 .pincode(request.getPincode())
//                 .registered(true)
//                 .build();

//         User savedUser = userRepository.save(user);
//         return toResponse(savedUser);
//     }

//     /**
//      * Retrieves all users from the database
//      */
//     @Override
//     public List<UserResponse> getAllUsers() {
//         return userRepository.findAll()
//                 .stream()
//                 .map(this::toResponse)
//                 .toList();
//     }

//     /**
//      * Finds users matching the given work type and district
//      */
//     @Override
//     public List<UserResponse> findByWorkTypeAndDistrict(String workType, String district) {
//         return userRepository.findByWorkTypeAndDistrict(workType, district)
//                 .stream()
//                 .map(this::toResponse)
//                 .toList();
//     }

//     /**
//      * Maps a User entity to a UserResponse DTO
//      */
//     private UserResponse toResponse(User user) {
//         return UserResponse.builder()
//                 .id(user.getId())
//                 .name(user.getName())
//                 .phone(user.getPhone())
//                 .address(user.getAddress())
//                 .workType(user.getWorkType())
//                 .district(user.getDistrict())
//                 .mandal(user.getMandal())
//                 .pincode(user.getPincode())
//                 .registered(user.getRegistered())
//                 .build();
//     }
// }


package com.osi.shramsaathi.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.osi.shramsaathi.dto.UserRequest;
import com.osi.shramsaathi.dto.UserResponse;
import com.osi.shramsaathi.model.User;
import com.osi.shramsaathi.repository.UserRepository;
import com.osi.shramsaathi.service.UserService;
import com.osi.shramsaathi.service.GeocodingService;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final GeocodingService geocodingService;
    private final ApplicationEventPublisher eventPublisher;

    /** Register a new worker */
    @Override
    public UserResponse register(UserRequest request) {
        User user = User.builder()
                .name(request.getName())
                .phone(request.getPhone())
                .address(request.getAddress())
                .workType(request.getWorkType())
                .district(request.getDistrict())
                .mandal(request.getMandal())
                .pincode(request.getPincode())
                .age(request.getAge())
                .experience(request.getExperience())
                .registered(true)
                .build();

        // Use the GeocodingService to get coordinates
        GeocodingService.GeoLocation location = geocodingService.geocodeAddress(
            user.getAddress(),
            user.getDistrict(),
            user.getMandal(),
            user.getPincode()
        );

        if (location != null) {
            user.setLatitude(location.latitude());
            user.setLongitude(location.longitude());
        }

        User savedUser = userRepository.save(user);
        
        // Publish event for real-time updates if coordinates are available
        if (user.getLatitude() != null && user.getLongitude() != null) {
            eventPublisher.publishEvent(new UserLocationUpdateEvent(savedUser));
        }
        
        return toResponse(savedUser);
    }

    /** Get all workers */
    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    /** Filter workers by multiple parameters */
    @Override
    public List<UserResponse> filterUsers(String workType, String district,
                                          Integer minAge, Integer maxAge,
                                          Integer minExperience, Integer maxExperience) {
        return userRepository.filterUsers(workType, district, minAge, maxAge, minExperience, maxExperience)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    /** Convert User entity to UserResponse */
    private UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .phone(user.getPhone())
                .address(user.getAddress())
                .workType(user.getWorkType())
                .district(user.getDistrict())
                .mandal(user.getMandal())
                .pincode(user.getPincode())
                .age(user.getAge())
                .experience(user.getExperience())
                .registered(user.getRegistered())
                .latitude(user.getLatitude())
                .longitude(user.getLongitude())
                .build();
    }
}
