import { Box, Button, CircularProgress, TextField } from "@mui/material";
import "./style.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createRoom } from "../../apis/roomApis";
import notification from "../../configs/notification";
import { useDispatch, useSelector } from "react-redux";
import {
  JOINED_ROOM_TYPE,
  setCurrentRoom,
  setMode,
} from "../../store/room/roomReducer";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";

const CreateRoomForm = () => {
  const [roomName, setRoomName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    const res = await createRoom(roomName, password);
    return res;
  };

  const mutation = useMutation({
    mutationFn: handleCreateRoom,
  });

  const { user } = useSelector((state: RootState) => state.userReducer);

  const handleCreate = async () => {
    if (roomName.trim()) {
      try {
        const data: any = await mutation.mutateAsync();
        setRoomName("");
        const newRoom: JOINED_ROOM_TYPE = {
          name: data.room.name,
          slug: data.room.slug,
          createdBy: {
            name: user.name || "",
          },
          pinned: false,
        };

        dispatch(setCurrentRoom(newRoom));
        navigate(`/room/${data.room.slug}`);

        dispatch(setMode(null));
        notification.success("Room created successfully");
      } catch (error) {
        if (error instanceof Error) {
          notification.error(error.message);
        }
      }
    }
  };

  return (
    <Box className="create-form">
      <TextField
        id="create-room-name"
        label="Enter room name"
        variant="standard"
        value={roomName}
        onChange={(event) => setRoomName(event.target.value)}
      />
      <TextField
        id="create-room-password"
        label="Enter room password"
        variant="standard"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        variant="contained"
        className="create-room-form-btn"
        onClick={handleCreate}
        disabled={
          roomName.trim() && password.trim() ? mutation.isPending : true
        }
      >
        {mutation.isPending ? (
          <CircularProgress
            sx={{
              color: "white",
              width: "25px !important",
              height: "25px !important",
            }}
          />
        ) : (
          "Create"
        )}
      </Button>
    </Box>
  );
};

export default CreateRoomForm;
