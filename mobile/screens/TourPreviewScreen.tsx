import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import type { Room } from "../types";
import BackButton from "./BackButton";

type TourPreviewScreenProps = {
  room: Room;
  previewIndex: number;
  onBack: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function TourPreviewScreen({
  room,
  previewIndex,
  onBack,
  onPrevious,
  onNext,
}: TourPreviewScreenProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: room.photos[previewIndex],
        }}
        style={styles.image}
      />

      <View style={styles.overlay}>
        <View style={styles.top}>
          <BackButton onPress={onBack} />
        </View>

        <View style={styles.bottom}>
          <Text style={styles.roomName}>
            {room.name}
          </Text>

          <Text style={styles.position}>
            {previewIndex + 1} / {room.photos.length}
          </Text>

          <View style={styles.controls}>
            <TouchableOpacity
              style={[
                styles.controlButton,
                previewIndex === 0 && styles.disabledButton,
              ]}
              disabled={previewIndex === 0}
              onPress={onPrevious}
            >
              <Text style={styles.controlText}>
                ←
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.controlButton,
                previewIndex === room.photos.length - 1 &&
                  styles.disabledButton,
              ]}
              disabled={previewIndex === room.photos.length - 1}
              onPress={onNext}
            >
              <Text style={styles.controlText}>
                →
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "space-between",
  },

  top: {
    marginTop: 55,
    marginLeft: 20,
  },

  bottom: {
    alignItems: "center",
    paddingBottom: 35,
  },

  roomName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  position: {
    color: "#fff",
    fontSize: 14,
    marginTop: 6,
  },

  controls: {
    flexDirection: "row",
    gap: 15,
    marginTop: 18,
  },

  controlButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },

  disabledButton: {
    opacity: 0.35,
  },

  controlText: {
    fontSize: 24,
    color: "#111",
    fontWeight: "bold",
  },
});