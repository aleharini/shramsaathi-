// package com.osi.shramsaathi.controller;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.osi.shramsaathi.dto.OwnerRequest;
// import com.osi.shramsaathi.model.Owner;
// import com.osi.shramsaathi.service.OwnerService;

// import jakarta.validation.Valid;
// import lombok.RequiredArgsConstructor;

// @RestController
// @RequestMapping("/api/owners")
// @RequiredArgsConstructor
// @CrossOrigin(origins = "*")
// public class OwnerController {
    
//     private final OwnerService ownerService;

//     @PostMapping("/register")
//     public ResponseEntity<Owner> registerOwner(@Valid @RequestBody OwnerRequest request) {
//         Owner owner = ownerService.registerOwner(request);
//         return ResponseEntity.ok(owner);
//     }
// }

package com.osi.shramsaathi.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.osi.shramsaathi.dto.OwnerRequest;
import com.osi.shramsaathi.model.Owner;
import com.osi.shramsaathi.service.OwnerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/owners")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OwnerController {

    private final OwnerService ownerService;

    // ✅ Register new owner
    @PostMapping("/register")
    public ResponseEntity<Owner> registerOwner(@Valid @RequestBody OwnerRequest request) {
        Owner owner = ownerService.registerOwner(request);
        return ResponseEntity.ok(owner);
    }

    // ✅ Fetch all owners
    @GetMapping
    public ResponseEntity<List<Owner>> getAllOwners() {
        return ResponseEntity.ok(ownerService.getAllOwners());
    }

    // ✅ Search owners by district or pincode
    @GetMapping("/search")
    public ResponseEntity<List<Owner>> searchOwners(
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String pincode) {

        return ResponseEntity.ok(ownerService.searchOwners(district, pincode));
    }
}
