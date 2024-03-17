import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Tooltip,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import "./style.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const JoinRoomForm = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const roomSlug = useSelector(
    (state: RootState) => state.globalReducer.clickedJoinedRoomSlug
  );

  const handlePaste = async () => {
    if (!roomSlug.trim()) {
      const text = await navigator.clipboard.readText();
      setRoomId(text);
    }
  };

  useEffect(() => {
    if (roomSlug.trim()) {
      setRoomId(roomSlug);
    }
  }, []);

  return (
    <Box className="join-room-form-container">
      <Box className="form-field-section">
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="standard-adornment-password">
            Enter room id
          </InputLabel>
          <Input
            fullWidth
            id="standard-adornment-password"
            type="text"
            value={roomId}
            disabled={!!roomSlug.trim()}
            onChange={(event) => setRoomId(event.target.value)}
            endAdornment={
              <Tooltip
                title={roomSlug.trim() ? "" : "Click to Paste"}
                arrow
                placement="right"
              >
                <InputAdornment position="end">
                  <IconButton onClick={handlePaste}>
                    <ContentPasteGoIcon
                      sx={
                        roomSlug.trim()
                          ? { color: "gray", cursor: "not-allowed" }
                          : { color: "#512da8", cursor: "pointer" }
                      }
                    />
                  </IconButton>
                </InputAdornment>
              </Tooltip>
            }
          />
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            fullWidth
            id="standard-adornment-password"
            type={show ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            endAdornment={
              <Tooltip
                title={`${show ? "Hide" : "Show"}`}
                arrow
                placement="right"
              >
                <InputAdornment position="end">
                  <IconButton onClick={() => setShow(!show)}>
                    {show ? (
                      <VisibilityOffIcon sx={{ color: "#512da8" }} />
                    ) : (
                      <RemoveRedEyeIcon sx={{ color: "#512da8" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              </Tooltip>
            }
          />
        </FormControl>
      </Box>
      <Button variant="contained" className="join-room-btn">
        Join
      </Button>
    </Box>
  );
};

export default JoinRoomForm;
