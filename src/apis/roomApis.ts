import AXIOS from "../configs/axiosConfig";

// type ROOM_DATA_TYPE = {
//   name: string;
// };

export const createRoom = async (name: string, password: string) => {
  const res: any = await AXIOS.post("/room/create", { name, password });
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};

export const getRoomData = async (slug: string) => {
  const res: any = await AXIOS.get(`/room/${slug}`);
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};

export const toggleRoomPinned = async (isPinned: boolean, slug: string) => {
  const res: any = await AXIOS.put(`/room/${slug}?pin=${isPinned}`);
  if (res.data.error) {
    return Promise.reject(res.data.error);
  }
  return res.data;
};
