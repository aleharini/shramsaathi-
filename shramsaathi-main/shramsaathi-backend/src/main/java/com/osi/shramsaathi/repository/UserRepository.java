// package com.osi.shramsaathi.repository;

// import com.osi.shramsaathi.model.User;
// import org.springframework.data.jpa.repository.JpaRepository;
// import java.util.List;

// public interface UserRepository extends JpaRepository<User, Long> {
//     List<User> findByWorkTypeAndDistrict(String workType, String district);
// }
// This interface extends JpaRepository to provide CRUD operations for User entities.
// It includes a custom method to find users by their work type and district.   


package com.osi.shramsaathi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.osi.shramsaathi.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("""
        SELECT u FROM User u
        WHERE (:workType IS NULL OR u.workType = :workType)
          AND (:district IS NULL OR u.district = :district)
          AND (:minAge IS NULL OR u.age >= :minAge)
          AND (:maxAge IS NULL OR u.age <= :maxAge)
          AND (:minExperience IS NULL OR u.experience >= :minExperience)
          AND (:maxExperience IS NULL OR u.experience <= :maxExperience)
        """)
    List<User> filterUsers(
            @Param("workType") String workType,
            @Param("district") String district,
            @Param("minAge") Integer minAge,
            @Param("maxAge") Integer maxAge,
            @Param("minExperience") Integer minExperience,
            @Param("maxExperience") Integer maxExperience
    );

    @Query("""
        SELECT u FROM User u
        WHERE u.latitude IS NOT NULL
          AND u.longitude IS NOT NULL
          AND (6371 * acos(cos(radians(:lat)) * cos(radians(u.latitude))
          * cos(radians(u.longitude) - radians(:lon))
          + sin(radians(:lat)) * sin(radians(u.latitude)))) <= :radius
        """)
    List<User> findUsersWithinRadius(
            @Param("lat") double latitude,
            @Param("lon") double longitude,
            @Param("radius") double radiusInKm
    );
}
