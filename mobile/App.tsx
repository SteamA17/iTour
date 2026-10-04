import AsyncStorage from "@react-native-async-storage/async-storage";

import { useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";

import PermissionScreen from "./screens/PermissionScreen";
import PropertySetupScreen from "./screens/PropertySetupScreen";
import PropertyDashboardScreen from "./screens/PropertyDashboardScreen";
import RoomSetupScreen from "./screens/RoomSetupScreen";
import CameraScreen from "./screens/CameraScreen";
import ReviewScreen from "./screens/ReviewScreen";
import ProcessingScreen from "./screens/ProcessingScreen";
import RoomDetailsScreen from "./screens/RoomDetailsScreen";
import TourPreviewScreen from "./screens/TourPreviewScreen";

import type { Room } from "./types";

export default function App() {
  const cameraRef = useRef<any>(null);
  const STORAGE_KEY = "itour_property";

  const [permission, requestPermission] =
    useCameraPermissions();

  const [facing] = useState<"back" | "front">("back");

  const [photos, setPhotos] = useState<string[]>([]);
  const [reviewing, setReviewing] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [roomName, setRoomName] = useState("");
  const [roomStarted, setRoomStarted] = useState(false);

  const [propertyCreated, setPropertyCreated] = useState(false);
  const [propertyName, setPropertyName] = useState("");

  const [previewing, setPreviewing] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] =
    useState<Room | null>(null);

  const [addingRoom, setAddingRoom] = useState(false);

  const finishRoom = () => {
    const newRoom: Room = {
      id: Date.now(),
      name: roomName,
      photos,
    };

    setRooms((currentRooms) => [
      ...currentRooms,
      newRoom,
    ]);

    setPhotos([]);
    setRoomName("");
    setRoomStarted(false);
    setReviewing(false);
    setProcessing(false);
    setAddingRoom(false);
  };

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const savedProperty =
          await AsyncStorage.getItem(STORAGE_KEY);

        if (savedProperty) {
          const parsedProperty = JSON.parse(savedProperty);

          setPropertyName(parsedProperty.name);
          setRooms(parsedProperty.rooms || []);
          setPropertyCreated(true);
        }
      } catch (error) {
        console.error(
          "Failed to load saved property:",
          error
        );
      }
    };

    loadProperty();
  }, []);

  useEffect(() => {
    const saveProperty = async () => {
      if (!propertyCreated) return;

      try {
        const property = {
          name: propertyName,
          rooms,
        };

        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(property)
        );
      } catch (error) {
        console.error(
          "Failed to save property:",
          error
        );
      }
    };

    saveProperty();
  }, [propertyCreated, propertyName, rooms]);

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    if (photos.length >= 8) return;

    try {
      const photo =
        await cameraRef.current.takePictureAsync();

      if (photo?.uri) {
        const updatedPhotos = [
          ...photos,
          photo.uri,
        ];

        setPhotos(updatedPhotos);

        console.log(
          "Photo captured:",
          photo.uri
        );

        if (updatedPhotos.length === 8) {
          setReviewing(true);
        }
      }
    } catch (error) {
      console.error(
        "Camera error:",
        error
      );
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <PermissionScreen
        onRequestPermission={requestPermission}
      />
    );
  }

  if (!propertyCreated) {
    return (
      <PropertySetupScreen
        propertyName={propertyName}
        onPropertyNameChange={setPropertyName}
        onCreateProperty={() =>
          setPropertyCreated(true)
        }
      />
    );
  }

  if (previewing && selectedRoom) {
    return (
      <TourPreviewScreen
        room={selectedRoom}
        previewIndex={previewIndex}
        onBack={() =>
          setPreviewing(false)
        }
        onPrevious={() =>
          setPreviewIndex(
            (current) => current - 1
          )
        }
        onNext={() =>
          setPreviewIndex(
            (current) => current + 1
          )
        }
      />
    );
  }

  if (selectedRoom) {
    return (
      <RoomDetailsScreen
        room={selectedRoom}
        onBack={() =>
          setSelectedRoom(null)
        }
        onPreviewTour={() => {
          setPreviewIndex(0);
          setPreviewing(true);
        }}
      />
    );
  }

  if (!addingRoom) {
    return (
      <PropertyDashboardScreen
        propertyName={propertyName}
        rooms={rooms}
        onSelectRoom={setSelectedRoom}
        onAddRoom={() =>
          setAddingRoom(true)
        }
      />
    );
  }

  if (addingRoom && !roomStarted) {
    return (
      <RoomSetupScreen
        roomName={roomName}
        onRoomNameChange={setRoomName}
        onStartCapture={() =>
          setRoomStarted(true)
        }
      />
    );
  }

  if (processing) {
    return (
      <ProcessingScreen
        photoCount={photos.length}
        onFinishRoom={finishRoom}
      />
    );
  }

  if (reviewing) {
    return (
      <ReviewScreen
        photos={photos}
        roomName={roomName}
        onContinue={() =>
          setProcessing(true)
        }
      />
    );
  }

  return (
    <CameraScreen
      cameraRef={cameraRef}
      facing={facing}
      roomName={roomName}
      photoCount={photos.length}
      onTakePhoto={takePhoto}
    />
  );
}