package com.itour.backend.repository;

import com.itour.backend.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    List<Photo> findByRoomIdOrderByPhotoOrderAsc(Long roomId);
}