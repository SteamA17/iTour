import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ReviewScreenProps = {
  photos: string[];
  roomName: string;
  onContinue: () => void;
};

export default function ReviewScreen({
  photos,
  roomName,
  onContinue,
}: ReviewScreenProps) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Review Capture</Text>

      <Text style={styles.subtitle}>
        You captured {photos.length} photos of the {roomName}.
      </Text>

      <View style={styles.photoGrid}>
        {photos.map((photo, index) => (
          <View key={index} style={styles.photoContainer}>
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
        style={styles.button}
        onPress={onContinue}
      >
        <Text style={styles.buttonText}>
          Continue
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
    lineHeight: 23,
  },

  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  photoContainer: {
    width: "31%",
  },

  thumbnail: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
  },

  photoNumber: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  button: {
    height: 54,
    backgroundColor: "#111",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});