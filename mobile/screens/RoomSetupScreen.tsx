import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet } from "react-native";

import BackButton from "./BackButton";

type RoomSetupScreenProps = {
  roomName: string;
  onRoomNameChange: (name: string) => void;
  onStartCapture: () => void;
  onBack: () => void;
};

export default function RoomSetupScreen({
  roomName,
  onRoomNameChange,
  onStartCapture,
  onBack,
}: RoomSetupScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton
          onPress={onBack}
          label="Add Room"
        />
      </View>
      <Text style={styles.logo}>iTour</Text>

      <Text style={styles.title}>
        Set Up Room
      </Text>

      <Text style={styles.message}>
        Give this room a name before starting the capture.
      </Text>

      <Text style={styles.inputLabel}>
        Room name
      </Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. Living Room"
        placeholderTextColor="#999"
        value={roomName}
        onChangeText={onRoomNameChange}
      />

      <TouchableOpacity
        style={[
          styles.button,
          !roomName.trim() && styles.buttonDisabled,
        ]}
        disabled={!roomName.trim()}
        onPress={onStartCapture}
      >
        <Text style={styles.buttonText}>
          Start Capture
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
    marginBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111",
  },

  backButtonContainer: {
    position: "absolute",
    top: 55,
    left: 20,
  },

  message: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    marginBottom: 35,
    lineHeight: 24,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111",
  },

  button: {
    height: 54,
    backgroundColor: "#111",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  buttonDisabled: {
    opacity: 0.4,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});