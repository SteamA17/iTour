import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ProcessingScreenProps = {
  photoCount: number;
  onFinishRoom: () => void;
};

export default function ProcessingScreen({
  photoCount,
  onFinishRoom,
}: ProcessingScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Preparing Your Tour
      </Text>

      <Text style={styles.message}>
        Your room photos are being prepared for the virtual tour.
      </Text>

      <View style={styles.indicator}>
        <Text style={styles.icon}>360°</Text>
      </View>

      <Text style={styles.status}>
        {photoCount} photos captured
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={onFinishRoom}
      >
        <Text style={styles.buttonText}>
          Finish Room
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111",
    textAlign: "center",
  },

  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginTop: 12,
    maxWidth: 340,
  },

  indicator: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#f3f3f3",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
  },

  icon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
  },

  status: {
    fontSize: 15,
    color: "#666",
    marginTop: 18,
  },

  button: {
    height: 54,
    width: "100%",
    backgroundColor: "#111",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});