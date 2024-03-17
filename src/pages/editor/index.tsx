import { Box } from "@mui/material";
import "./style.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import notification from "../../configs/notification";
import { useQuery } from "@tanstack/react-query";
import { getRoomData } from "../../apis/roomApis";

const Editor = () => {
  const currentJoinedRoom = useSelector(
    (state: RootState) => state.roomReducer.currentJoinedRoom
  );

  const { slug } = useParams();

  const getRoom = async () => {
    if (currentJoinedRoom !== null) {
      return;
    }
    try {
      if (slug) {
        const res = await getRoomData(slug);
        return res.room;
      }
    } catch (error) {
      if (error instanceof Error) {
        notification.error(error.message);
      }
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["GET_ROOM_DATA"],
    queryFn: getRoom,
    retry: false,
  });

  console.log("data", data);
  console.log("isLoading", isLoading);

  return <Box>Editor</Box>;
};

export default Editor;
