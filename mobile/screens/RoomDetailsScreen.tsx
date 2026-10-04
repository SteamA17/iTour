import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import type { Room } from "../types";

type RoomDetailsScreenProps = {
  room: Room;
  onBack: () => void;
  onPreviewTour: () => void;
};

export default function RoomDetailsScreen({
  room,
  onBack,
  onPreviewTour,
}: RoomDetailsScreenProps) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backButton}>
          ← Back to Property
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        {room.name}
      </Text>

      <Text style={styles.subtitle}>
        {room.photos.length} photos captured
      </Text>

      {/* Photo Gallery */}
      <View style={styles.photoGrid}>
        {room.photos.map((photo, index) => (
          <View
            key={index}
            style={styles.photoContainer}
          >
            <Image
              source={{ uri: photo }}
              style={styles.thumbnail}
            />

            <Text style={styles.photoNumber}>
              Photo {index + 1}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.previewButton}
        onPress={onPreviewTour}
      >
        <Text style={styles.previewButtonText}>
          Preview Tour
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 50,
  },

  backButton: {
    fontSize: 15,
    color: "#555",
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111",
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    marginBottom: 24,
  },

  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  photoContainer: {
    width: "48%",
    marginBottom: 16,
  },

  thumbnail: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
  },

  photoNumber: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },

  previewButton: {
    height: 54,
    backgroundColor: "#111",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  previewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});