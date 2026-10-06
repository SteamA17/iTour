import {
  File
} from "expo-file-system";

export const API_BASE_URL = "http://192.168.174.243:8080";

export type PropertyResponse = {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
};

export type RoomResponse = {
  id: number;
  name: string;
  description: string | null;
};

export type PhotoResponse = {
  id: number;
  fileName: string;
  fileUrl: string;
  photoOrder: number;
};

export async function createProperty(
  name: string
): Promise<PropertyResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/properties`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    }
  );

  if (response.status === 409) {
    throw new Error(
      "A property with this name already exists."
    );
  }

  if (!response.ok) {
    throw new Error(
      `Failed to create property: ${response.status}`
    );
  }

  return response.json();
}

export async function createRoom(
  propertyId: number,
  name: string
): Promise<RoomResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/properties/${propertyId}/rooms`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to create room: ${response.status}`
    );
  }

  return response.json();
}

export async function getRooms(
  propertyId: number
): Promise<RoomResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/properties/${propertyId}/rooms`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch rooms: ${response.status}`
    );
  }

  return response.json();
}

export async function getRoomPhotos(
  roomId: number
): Promise<PhotoResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/rooms/${roomId}/photos`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch room photos: ${response.status}`
    );
  }

  return response.json();
}

export async function uploadPhoto(
  roomId: number,
  photoUri: string,
  photoOrder: number
): Promise<PhotoResponse> {
  const uploadUrl =
    `${API_BASE_URL}/api/rooms/${roomId}/photos`;

  const file = new File(photoUri);

  const formData = new FormData();

  formData.append(
    "file",
    file as any
  );

  formData.append(
    "photoOrder",
    String(photoOrder)
  );

  const response = await fetch(
    uploadUrl,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(
      `Failed to upload photo ${photoOrder}: ${response.status} ${errorText}`
    );
  }

  return response.json();
}

export async function getProperties(): Promise<PropertyResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/properties`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch properties: ${response.status}`
    );
  }

  return response.json();
}

export async function getProperty(
  propertyId: number
): Promise<PropertyResponse> {
  const response = await fetch(
    `${API_BASE_URL}/api/properties/${propertyId}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch property: ${response.status}`
    );
  }

  return response.json();
}