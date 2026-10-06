import {
  API_BASE_URL,
  createProperty,
  createRoom,
  getProperties,
  getProperty,
  getRoomPhotos,
  getRooms,
  uploadPhoto,
} from "./api";

import { useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { BackHandler, View, Text } from "react-native";

import PermissionScreen from "./screens/PermissionScreen";
import PropertySetupScreen from "./screens/PropertySetupScreen";
import PropertyDashboardScreen from "./screens/PropertyDashboardScreen";
import RoomSetupScreen from "./screens/RoomSetupScreen";
import CameraScreen from "./screens/CameraScreen";
import ReviewScreen from "./screens/ReviewScreen";
import ProcessingScreen from "./screens/ProcessingScreen";
import RoomDetailsScreen from "./screens/RoomDetailsScreen";
import TourPreviewScreen from "./screens/TourPreviewScreen";
import EntryScreen from "./screens/EntryScreen";

import type { Room } from "./types";

export default function App() {
  const cameraRef = useRef<any>(null);

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

  const [propertyId, setPropertyId] = useState<number | null>(null);
  const [roomId, setRoomId] = useState<number | null>(null);
  const [propertyError, setPropertyError] = useState("");

  const [entryLoading, setEntryLoading] = useState(true);
  const [addingProperty, setAddingProperty] = useState(false);
  const [hasProperty, setHasProperty] = useState(false);

  useEffect(() => {
    const handleBackPress = () => {
      // Preview → Room Details
      if (previewing) {
        setPreviewing(false);
        return true;
      }

      // Room Details → Property Dashboard
      if (selectedRoom) {
        setSelectedRoom(null);
        return true;
      }

      // Review → Camera
      if (reviewing) {
        setReviewing(false);
        return true;
      }

      // Processing → don't allow leaving while uploading
      if (processing) {
        return true;
      }

      // Camera → Property Dashboard
      if (roomStarted) {
        setPhotos([]);
        setRoomId(null);
        setRoomStarted(false);
        setReviewing(false);
        setAddingRoom(false);
        return true;
      }

      // Room Setup → Property Dashboard
      if (addingRoom) {
        setRoomName("");
        setAddingRoom(false);
        return true;
      }

      // Property Setup → Entry
      if (addingProperty) {
        setPropertyName("");
        setPropertyError("");
        setAddingProperty(false);
        return true;
      }

      // Entry screen
      // Let Android perform its normal behavior.
      return false;
    };

    const subscription =
      BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );

    return () => subscription.remove();
  }, [
    previewing,
    selectedRoom,
    reviewing,
    processing,
    roomStarted,
    addingRoom,
    addingProperty,
  ]);

  useEffect(() => {
    if (!propertyId) return;

    const loadRooms = async () => {
      try {
        const backendRooms =
          await getRooms(propertyId);

        const formattedRooms: Room[] = [];

        for (const room of backendRooms) {
          const roomPhotos =
            await getRoomPhotos(room.id);

          const photoUrls =
            roomPhotos.map(
              (photo) =>
                `${API_BASE_URL}${photo.fileUrl}`
            );

          formattedRooms.push({
            id: room.id,
            name: room.name,
            photos: photoUrls,
          });
        }

        setRooms(formattedRooms);

        console.log(
          "Rooms with photos loaded:",
          formattedRooms
        );
      } catch (error) {
        console.error(
          "Failed to load rooms:",
          error
        );
      }
    };

    loadRooms();
  }, [propertyId]);

  useEffect(() => {
    const checkProperties = async () => {
      try {
        const properties = await getProperties();

        setHasProperty(properties.length > 0);

        console.log("Existing properties:", properties);
      } catch (error) {
        console.error(
          "Failed to check properties:",
          error
        );
      } finally {
        setEntryLoading(false);
      }
    };

    checkProperties();
  }, []);

  const finishRoom = () => {
    setPhotos([]);
    setRoomName("");
    setRoomId(null);
    setRoomStarted(false);
    setReviewing(false);
    setProcessing(false);
    setAddingRoom(false);
  };

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

  if (entryLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!propertyCreated && !propertyId && !addingProperty) {
    return (
      <EntryScreen
        hasProperty={hasProperty}
        onAddProperty={() => {
        setPropertyError("");
        setPropertyName("");
        setPropertyCreated(false);
        setPropertyId(null);
        setAddingProperty(true);
        setAddingRoom(false);
      }}
        onContinue={async () => {
          try {
            const properties = await getProperties();

            if (properties.length === 0) {
              return;
            }

            const latestProperty =
              properties[properties.length - 1];

            const property = await getProperty(
              latestProperty.id
            );

            setPropertyId(property.id);
            setPropertyName(property.name);
            setPropertyCreated(true);
          } catch (error) {
            console.error(
              "Failed to continue with property:",
              error
            );
          }
        }}
      />
    );
  }

  if (addingProperty && !propertyCreated) {
    return (
      <PropertySetupScreen
        propertyName={propertyName}
        onPropertyNameChange={(value) => {
          setPropertyName(value);
          setPropertyError("");
        }}
        error={propertyError}
        onCreateProperty={async () => {

          if (!propertyName.trim()) {
            setPropertyError("Please enter a property name.");
            return;
          }

          try {
            const property = await createProperty(
              propertyName.trim()
            );

            console.log("Property created:", property);

            setPropertyId(property.id);
            setPropertyCreated(true);
            setAddingProperty(false);
          } catch (error) {
            console.error("Failed to create property:", error);

            if (error instanceof Error) {
              setPropertyError(error.message);
            } else {
              setPropertyError(
                "Failed to create property. Please try again."
              );
            }
          }
        }}
        onBack={() => {
          setPropertyName("");
          setPropertyError("");
          setAddingProperty(false);
        }}
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
        onStartCapture={async () => {
          if (!propertyId) {
            console.error("Property ID is missing");
            return;
          }

          try {
            const room = await createRoom(
              propertyId,
              roomName.trim()
            );

            console.log("Room created:", room);

            setRoomId(room.id);
            setRoomStarted(true);
          } catch (error) {
            console.error(
              "Failed to create room:",
              error
            );
          }
        }}

        onBack={() => {
          setRoomName("");
          setAddingRoom(false);
        }}
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
        onContinue={async () => {
          if (!roomId) {
            console.error("Room ID is missing");
            return;
          }

          try {
            setProcessing(true);

            const uploadedPhotos: string[] = [];

            for (let i = 0; i < photos.length; i++) {
              console.log(
                `Uploading photo ${i + 1} of ${photos.length}...`
              );

              const uploadedPhoto = await uploadPhoto(
                roomId,
                photos[i],
                i + 1
              );

              uploadedPhotos.push(
                `${API_BASE_URL}${uploadedPhoto.fileUrl}`
              );
            }

            console.log(
              "Uploaded photo URLs:",
              uploadedPhotos
            );

            const newRoom: Room = {
              id: roomId,
              name: roomName,
              photos: uploadedPhotos,
            };

            setRooms((currentRooms) => [
              ...currentRooms,
              newRoom,
            ]);

            setPhotos([]);

          } catch (error) {
            console.error(
              "Failed to upload photos:",
              error
            );

            setProcessing(false);
          }
        }}

        onBack={() => {
          setReviewing(false);
        }}
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
      onBack={() => {
        setPhotos([]);
        setRoomId(null);
        setRoomStarted(false);
        setReviewing(false);
        setAddingRoom(false);
      }}
    />
  );
}