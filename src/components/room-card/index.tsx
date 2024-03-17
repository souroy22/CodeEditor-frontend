import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import {
  JOINED_ROOM_TYPE,
  togglePinnedRoom,
} from "../../store/room/roomReducer";
import { toggleRoomPinned } from "../../apis/roomApis";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import notification from "../../configs/notification";
import "animate.css/animate.min.css";
import { RootState } from "../../store/store";

type ROOM_CARD_TYPE = {
  room: JOINED_ROOM_TYPE;
  handleClick: (room: JOINED_ROOM_TYPE) => void;
};

const RoomCard = ({ room, handleClick }: ROOM_CARD_TYPE) => {
  const dispatch = useDispatch();

  const show = useSelector(
    (state: RootState) => state.globalReducer.showNavbar
  );

  const capitalizeEveryWord = (title: string) => {
    let words: string[] | string = title.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    words = words.join(" ");
    return words;
  };

  const handlePinClick = () => {
    try {
      toggleRoomPinned(!room.pinned, room.slug);
      dispatch(togglePinnedRoom({ slug: room.slug, isPinned: !room.pinned }));
      notification.success(
        `${!room.pinned ? "Pinned" : "Unpin"} room successfully`
      );
    } catch (error) {
      if (error instanceof Error) {
        notification.error(error.message);
      }
    }
  };

  return (
    <Card
      className={`room-card animate__bounce animate__delay-0.3s ${
        room.pinned ? "animate__fadeInLeft" : "animate__fadeInRight"
      } ${show ? "" : `animate__animated`}`}
    >
      <Box className="isFav-icon-section">
        {room.pinned ? (
          <PushPinIcon
            className="isPinned-icon"
            sx={{
              color: "#512da8",
              width: "19px !important",
              height: "19px !important",
            }}
            onClick={handlePinClick}
          />
        ) : (
          <PushPinOutlinedIcon
            className="isNotPinned-icon"
            sx={{
              color: "gray",
              width: "19px !important",
              height: "19px !important",
            }}
            onClick={handlePinClick}
          />
        )}
      </Box>
      <CardContent className="card-content">
        <Box className="card-content-left">
          <img
            className="card-image"
            src="https://thumbs.dreamstime.com/b/programmer-avatar-flat-design-long-shadow-style-programmer-avatar-flat-design-long-shadow-style-avatar-flat-design-189410011.jpg"
          />
        </Box>
        <Box className="card-content-right">
          <Box className="card-title">{capitalizeEveryWord(room.name)}</Box>
          <Box className="card-description">
            Created By: {room.createdBy.name}
          </Box>
          <Button
            size="small"
            variant="contained"
            className="card-join-btn"
            onClick={() => handleClick(room)}
          >
            Join
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
