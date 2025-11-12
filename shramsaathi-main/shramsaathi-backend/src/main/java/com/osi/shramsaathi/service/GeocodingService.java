package com.osi.shramsaathi.service;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.JsonNode;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GeocodingService {
    private final RestTemplate restTemplate;
    private final ConcurrentHashMap<String, GeoLocation> cache;

    public GeocodingService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
        this.cache = new ConcurrentHashMap<>();
    }

    public GeoLocation geocodeAddress(String address, String district, String mandal, Integer pincode) {
        // Create a cache key from the address components
        String cacheKey = String.format("%s,%s,%s,%d", address, district, mandal, pincode);
        
        // Check cache first
        GeoLocation cached = cache.get(cacheKey);
        if (cached != null) {
            return cached;
        }

        try {
            // Build the search query
            String searchQuery = String.format("%s, %s, %s, %d, India", address, mandal, district, pincode);
            String encodedQuery = URLEncoder.encode(searchQuery, StandardCharsets.UTF_8);

            // Build the Nominatim API URL
            String url = UriComponentsBuilder.fromHttpUrl("https://nominatim.openstreetmap.org/search")
                    .queryParam("q", encodedQuery)
                    .queryParam("format", "json")
                    .queryParam("limit", 1)
                    .build()
                    .toUriString();

            // Add User-Agent header as required by Nominatim
            JsonNode[] response = restTemplate.getForObject(url, JsonNode[].class);

            if (response != null && response.length > 0) {
                JsonNode location = response[0];
                GeoLocation result = new GeoLocation(
                    Double.parseDouble(location.get("lat").asText()),
                    Double.parseDouble(location.get("lon").asText())
                );
                
                // Cache the result
                cache.put(cacheKey, result);
                return result;
            }
        } catch (Exception e) {
            // Log the error but don't throw - we'll return null if geocoding fails
            e.printStackTrace();
        }

        return null;
    }

    // Simple record to hold latitude and longitude
    public record GeoLocation(double latitude, double longitude) {}
}