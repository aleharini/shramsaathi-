


package com.osi.shramsaathi.service;

import java.util.List;

import com.osi.shramsaathi.dto.UserRequest;
import com.osi.shramsaathi.dto.UserResponse;

public interface UserService {

    /** Register a new worker */
    UserResponse register(UserRequest request);

    /** Get all registered workers */
    List<UserResponse> getAllUsers();

    /** Search workers by filters */
    List<UserResponse> filterUsers(String workType, String district,
                                   Integer minAge, Integer maxAge,
                                   Integer minExperience, Integer maxExperience);
}
