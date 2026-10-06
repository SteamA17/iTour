package com.itour.backend.controller;

import com.itour.backend.entity.Property;
import com.itour.backend.repository.PropertyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

    private final PropertyRepository propertyRepository;

    public PropertyController(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    // Get all properties
    @GetMapping
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    // Get property by ID
    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        return propertyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create property
    @PostMapping
    public ResponseEntity<?> createProperty(@RequestBody Property property) {

        if (propertyRepository.findByNameIgnoreCase(property.getName()).isPresent()) {
            return ResponseEntity
                    .status(409)
                    .body("A property with this name already exists.");
        }

        return ResponseEntity.ok(propertyRepository.save(property));
    }

    // Update property
    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(
            @PathVariable Long id,
            @RequestBody Property propertyDetails) {

        return propertyRepository.findById(id)
                .map(property -> {
                    property.setName(propertyDetails.getName());
                    property.setDescription(propertyDetails.getDescription());
                    property.setLocation(propertyDetails.getLocation());

                    return ResponseEntity.ok(propertyRepository.save(property));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete property
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {

        if (!propertyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        propertyRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}