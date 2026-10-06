import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type BackButtonProps = {
  onPress: () => void;
  label?: string;
};

export default function BackButton({
  onPress,
  label,
}: BackButtonProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          width: 42,
          height: 42,
          borderRadius: 21,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f3f4f6",
        }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="#111"
        />
      </TouchableOpacity>

      {label ? (
        <Text
          style={{
            marginLeft: 12,
            fontSize: 17,
            fontWeight: "600",
            color: "#111",
          }}
        >
          {label}
        </Text>
      ) : null}
    </View>
  );
}