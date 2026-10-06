package com.itour.backend.controller;

import com.itour.backend.entity.Photo;
import com.itour.backend.repository.PhotoRepository;
import com.itour.backend.repository.RoomRepository;
import com.itour.backend.service.FileStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PhotoController {

    private final PhotoRepository photoRepository;
    private final RoomRepository roomRepository;
    private final FileStorageService fileStorageService;

    public PhotoController(
            PhotoRepository photoRepository,
            RoomRepository roomRepository,
            FileStorageService fileStorageService) {

        this.photoRepository = photoRepository;
        this.roomRepository = roomRepository;
        this.fileStorageService = fileStorageService;
    }

    // Get all photos belonging to a room
    @GetMapping("/rooms/{roomId}/photos")
    public ResponseEntity<List<Photo>> getPhotosByRoom(
            @PathVariable Long roomId) {

        if (!roomRepository.existsById(roomId)) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                photoRepository.findByRoomIdOrderByPhotoOrderAsc(roomId)
        );
    }

    // Upload a photo to a room
    @PostMapping(
            value = "/rooms/{roomId}/photos",
            consumes = "multipart/form-data"
    )
    public ResponseEntity<Photo> uploadPhoto(
            @PathVariable Long roomId,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "photoOrder", required = false) Integer photoOrder) {

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        if (photoOrder == null) {
            return ResponseEntity.badRequest().build();
        }

        return roomRepository.findById(roomId)
                .map(room -> {

                    String fileName =
                            fileStorageService.storeFile(file);

                    Photo photo = new Photo();

                    photo.setFileName(fileName);
                    photo.setFileUrl("/uploads/" + fileName);
                    photo.setPhotoOrder(photoOrder);
                    photo.setRoom(room);

                    return ResponseEntity.ok(
                            photoRepository.save(photo)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Get photo by ID
    @GetMapping("/photos/{id}")
    public ResponseEntity<Photo> getPhotoById(
            @PathVariable Long id) {

        return photoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update photo metadata
    @PutMapping("/photos/{id}")
    public ResponseEntity<Photo> updatePhoto(
            @PathVariable Long id,
            @RequestBody Photo photoDetails) {

        return photoRepository.findById(id)
                .map(photo -> {

                    photo.setFileName(photoDetails.getFileName());
                    photo.setFileUrl(photoDetails.getFileUrl());
                    photo.setPhotoOrder(photoDetails.getPhotoOrder());

                    return ResponseEntity.ok(
                            photoRepository.save(photo)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete photo
    @DeleteMapping("/photos/{id}")
    public ResponseEntity<Void> deletePhoto(
            @PathVariable Long id) {

        if (!photoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        photoRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}