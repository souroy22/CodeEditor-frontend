import { Box } from "@mui/material";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import RoomCard from "../../components/room-card";
import { JOINED_ROOM_TYPE, setMode } from "../../store/room/roomReducer";
import { setRoomSlug } from "../../store/global/globalReducer";

const Rooms = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const joinedRooms = useSelector(
    (state: RootState) => state.roomReducer.joinedRooms
  );

  const handleClick = (room: JOINED_ROOM_TYPE) => {
    // dispatch(setCurrentRoom(room));
    dispatch(setRoomSlug(room.slug));
    dispatch(setMode("JOIN"));
    // navigate(`/room/${room.slug}`);
  };

  return (
    <Box className="rooms-section">
      {joinedRooms?.map((room) => (
        <RoomCard key={room.slug} room={room} handleClick={handleClick} />
      ))}
    </Box>
  );
};

export default Rooms;
