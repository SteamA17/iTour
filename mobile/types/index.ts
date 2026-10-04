export type Room = {
  id: number;
  name: string;
  photos: string[];
};

export type Property = {
  name: string;
  rooms: Room[];
};