package com.osi.shramsaathi.service.impl;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.osi.shramsaathi.dto.UserResponse;
import com.osi.shramsaathi.model.User;
import com.osi.shramsaathi.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
public class UserLocationEventListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleUserLocationUpdate(UserLocationUpdateEvent event) {
        User user = event.getUser();
        // Only broadcast if we have valid coordinates
        if (user != null && user.getLatitude() != null && user.getLongitude() != null) {
            // Convert to DTO to avoid exposing sensitive data
            UserResponse response = UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .workType(user.getWorkType())
                .district(user.getDistrict())
                .mandal(user.getMandal())
                .latitude(user.getLatitude())
                .longitude(user.getLongitude())
                .build();

            // Broadcast to all subscribers
            messagingTemplate.convertAndSend("/topic/worker-locations", response);
        }
    }
}

// Event class for user location updates
class UserLocationUpdateEvent {
    private final User user;

    public UserLocationUpdateEvent(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}