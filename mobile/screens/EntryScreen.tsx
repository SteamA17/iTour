import { Text, TouchableOpacity, View } from "react-native";

type EntryScreenProps = {
  hasProperty: boolean;
  onAddProperty: () => void;
  onContinue: () => void;
};

export default function EntryScreen({
  hasProperty,
  onAddProperty,
  onContinue,
}: EntryScreenProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "700",
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        iTour
      </Text>

      <Text
        style={{
          fontSize: 17,
          textAlign: "center",
          color: "#666",
          marginBottom: 40,
        }}
      >
        Create and manage your property virtual tours.
      </Text>

      <TouchableOpacity
        onPress={onAddProperty}
        style={{
          backgroundColor: "#111",
          paddingVertical: 16,
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontSize: 17,
            fontWeight: "600",
          }}
        >
          + Add Property
        </Text>
      </TouchableOpacity>

      {hasProperty && (
        <TouchableOpacity
          onPress={onContinue}
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            paddingVertical: 16,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}