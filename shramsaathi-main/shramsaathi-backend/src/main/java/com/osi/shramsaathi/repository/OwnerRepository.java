// package com.osi.shramsaathi.repository;

// import org.springframework.data.jpa.repository.JpaRepository;
// import com.osi.shramsaathi.model.Owner;

// public interface OwnerRepository extends JpaRepository<Owner, Long> {
//     boolean existsByPhone(String phone);
//     boolean existsByEmail(String email);
// }


package com.osi.shramsaathi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.osi.shramsaathi.model.Owner;

public interface OwnerRepository extends JpaRepository<Owner, Long> {
    boolean existsByPhone(String phone);
    boolean existsByEmail(String email);
}
