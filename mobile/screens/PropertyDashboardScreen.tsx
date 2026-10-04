import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StyleSheet } from "react-native";
import type { Room } from "../types";

type PropertyDashboardScreenProps = {
  propertyName: string;
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
  onAddRoom: () => void;
};

export default function PropertyDashboardScreen({
  propertyName,
  rooms,
  onSelectRoom,
  onAddRoom,
}: PropertyDashboardScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>iTour</Text>

      <Text style={styles.title}>{propertyName}</Text>

      <Text style={styles.subtitle}>
        Manage your rooms and build your virtual tour.
      </Text>

      <View style={styles.roomsHeader}>
        <Text style={styles.roomsTitle}>Rooms</Text>

        <Text style={styles.roomCount}>
          {rooms.length} {rooms.length === 1 ? "room" : "rooms"}
        </Text>
      </View>

      {rooms.length === 0 ? (
        <View style={styles.emptyRooms}>
          <Text style={styles.emptyTitle}>No rooms yet</Text>

          <Text style={styles.emptyMessage}>
            Add your first room to start creating your virtual tour.
          </Text>
        </View>
      ) : (
        <View style={styles.roomList}>
          {rooms.map((room) => (
            <TouchableOpacity
              key={room.id}
              style={styles.roomCard}
              onPress={() => onSelectRoom(room)}
            >
              {room.photos.length > 0 && (
                <Image
                  source={{ uri: room.photos[0] }}
                  style={styles.roomImage}
                />
              )}

              <View style={styles.roomDetails}>
                <Text style={styles.roomName}>
                  {room.name}
                </Text>

                <Text style={styles.roomInfo}>
                  {room.photos.length} photos captured
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={onAddRoom}
      >
        <Text style={styles.addButtonText}>
          + Add Room
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 60,
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111",
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginTop: 8,
    lineHeight: 22,
  },

  roomsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 35,
    marginBottom: 15,
  },

  roomsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },

  roomCount: {
    fontSize: 14,
    color: "#666",
  },

  emptyRooms: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    padding: 24,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
    marginBottom: 8,
  },

  emptyMessage: {
    textAlign: "center",
    color: "#777",
    lineHeight: 21,
  },

  roomList: {
    gap: 12,
  },

  roomCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  roomImage: {
    width: 90,
    height: 90,
  },

  roomDetails: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  roomName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
  },

  roomInfo: {
    fontSize: 13,
    color: "#777",
    marginTop: 5,
  },

  addButton: {
    height: 54,
    backgroundColor: "#111",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});