import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

type PermissionScreenProps = {
  onRequestPermission: () => void;
};

export default function PermissionScreen({
  onRequestPermission,
}: PermissionScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>iTour Camera</Text>

      <Text style={styles.message}>
        iTour needs access to your camera to capture your room.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onRequestPermission}
      >
        <Text style={styles.buttonText}>Allow Camera</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },

  message: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 24,
    color: "#555",
  },

  button: {
    backgroundColor: "#111",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});