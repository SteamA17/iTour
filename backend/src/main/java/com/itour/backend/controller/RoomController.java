package com.itour.backend.controller;

import com.itour.backend.entity.Room;
import com.itour.backend.repository.PropertyRepository;
import com.itour.backend.repository.RoomRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class RoomController {

    private final RoomRepository roomRepository;
    private final PropertyRepository propertyRepository;

    public RoomController(
            RoomRepository roomRepository,
            PropertyRepository propertyRepository) {
        this.roomRepository = roomRepository;
        this.propertyRepository = propertyRepository;
    }

    // Get all rooms belonging to a property
    @GetMapping("/properties/{propertyId}/rooms")
    public ResponseEntity<List<Room>> getRoomsByProperty(
            @PathVariable Long propertyId) {

        if (!propertyRepository.existsById(propertyId)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                roomRepository.findByPropertyId(propertyId)
        );
    }

    // Create a room for a property
    @PostMapping("/properties/{propertyId}/rooms")
    public ResponseEntity<Room> createRoom(
            @PathVariable Long propertyId,
            @RequestBody Room room) {

        return propertyRepository.findById(propertyId)
                .map(property -> {

                    room.setProperty(property);

                    return ResponseEntity.ok(
                            roomRepository.save(room)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Get room by ID
    @GetMapping("/rooms/{id}")
    public ResponseEntity<Room> getRoomById(
            @PathVariable Long id) {

        return roomRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update room
    @PutMapping("/rooms/{id}")
    public ResponseEntity<Room> updateRoom(
            @PathVariable Long id,
            @RequestBody Room roomDetails) {

        return roomRepository.findById(id)
                .map(room -> {

                    room.setName(roomDetails.getName());
                    room.setDescription(roomDetails.getDescription());

                    return ResponseEntity.ok(
                            roomRepository.save(room)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete room
    @DeleteMapping("/rooms/{id}")
    public ResponseEntity<Void> deleteRoom(
            @PathVariable Long id) {

        if (!roomRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        roomRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}