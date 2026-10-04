import { CameraView } from "expo-camera";
import { RefObject } from "react";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet } from "react-native";

type CameraScreenProps = {
  cameraRef: RefObject<CameraView | null>;
  facing: "back" | "front";
  roomName: string;
  photoCount: number;
  onTakePhoto: () => void;
};

export default function CameraScreen({
  cameraRef,
  facing,
  roomName,
  photoCount,
  onTakePhoto,
}: CameraScreenProps) {
  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      />

      <View style={styles.overlay}>
        <View style={styles.topSection}>
          <Text style={styles.logo}>iTour</Text>

          <Text style={styles.room}>
            {roomName}
          </Text>
        </View>

        <View style={styles.centerGuide}>
          <View style={styles.guideBox}>
            <View style={styles.centerDot} />
          </View>

          <Text style={styles.positionText}>
            Position {photoCount + 1} of 8
          </Text>

          <Text style={styles.instruction}>
            {photoCount === 0 && "Face forward"}
            {photoCount === 1 && "Turn slightly to the right"}
            {photoCount === 2 && "Turn further to the right"}
            {photoCount === 3 && "Continue turning right"}
            {photoCount === 4 && "Face the opposite side"}
            {photoCount === 5 && "Continue turning right"}
            {photoCount === 6 && "Turn toward the starting point"}
            {photoCount === 7 && "Almost complete"}
          </Text>

          <View style={styles.readyIndicator}>
            <View style={styles.readyDot} />

            <Text style={styles.readyText}>
              Ready to capture
            </Text>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.progress}>
            Step {Math.min(photoCount + 1, 8)} of 8
          </Text>

          <TouchableOpacity
            style={styles.captureButton}
            onPress={onTakePhoto}
          >
            <View style={styles.captureInner} />
          </TouchableOpacity>

          <Text style={styles.hint}>
            Keep your phone steady
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "space-between",
  },

  topSection: {
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  logo: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  room: {
    color: "#fff",
    fontSize: 16,
    marginTop: 6,
  },

  centerGuide: {
    alignItems: "center",
    justifyContent: "center",
  },

  guideBox: {
    width: 220,
    height: 220,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  centerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },

  positionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
  },

  instruction: {
    color: "#fff",
    fontSize: 15,
    marginTop: 8,
    textAlign: "center",
  },

  readyIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  readyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4ade80",
    marginRight: 7,
  },

  readyText: {
    color: "#fff",
    fontSize: 14,
  },

  bottomSection: {
    alignItems: "center",
    paddingBottom: 40,
  },

  progress: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 16,
  },

  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  captureInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 3,
    borderColor: "#111",
  },

  hint: {
    color: "#fff",
    fontSize: 13,
    marginTop: 14,
  },
});