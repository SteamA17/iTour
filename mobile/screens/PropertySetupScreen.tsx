import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet } from "react-native";

type PropertySetupScreenProps = {
  propertyName: string;
  onPropertyNameChange: (name: string) => void;
  onCreateProperty: () => void;
};

export default function PropertySetupScreen({
  propertyName,
  onPropertyNameChange,
  onCreateProperty,
}: PropertySetupScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>iTour</Text>

      <Text style={styles.title}>
        Create Your Property
      </Text>

      <Text style={styles.message}>
        Start by giving your property a name.
      </Text>

      <Text style={styles.inputLabel}>
        Property name
      </Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. My House"
        placeholderTextColor="#999"
        value={propertyName}
        onChangeText={onPropertyNameChange}
      />

      <TouchableOpacity
        style={[
          styles.button,
          !propertyName.trim() && styles.buttonDisabled,
        ]}
        disabled={!propertyName.trim()}
        onPress={onCreateProperty}
      >
        <Text style={styles.buttonText}>
          Create Property
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