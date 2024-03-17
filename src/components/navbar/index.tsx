import {
  Avatar,
  Backdrop,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import LOGO from "../../assets/images/undraw_code_thinking_re_gka2.svg";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { MouseEvent, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { signout } from "../../apis/authApis";
import { logoutUser } from "../../store/user/userReducer";
import PopupForm from "../popup-form";
import CreateRoomForm from "../create-room";
import JoinRoomForm from "../join-room";
import { setMode } from "../../store/room/roomReducer";
import { setShowNavbar } from "../../store/global/globalReducer";

type OPTION_TYPE = {
  label: string;
  value: string;
  url?: string;
};

export const navOptions: OPTION_TYPE[] = [
  {
    label: "Rooms",
    value: "rooms",
    url: "/rooms",
  },
  {
    label: "Join Room",
    value: "JOIN",
  },
  {
    label: "Create Room",
    value: "CREATE",
  },
];

export const settings: OPTION_TYPE[] = [
  {
    label: "Profile",
    value: "profile",
    url: "/profile",
  },
  {
    label: "Logout",
    value: "logout",
  },
];

const Navbar = () => {
  const [anchorEl, setAnchorElUser] = useState<null | HTMLElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { mode } = useSelector((state: RootState) => state.roomReducer);
  const { showNavbar } = useSelector((state: RootState) => state.globalReducer);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = async (setting: OPTION_TYPE) => {
    dispatch(setShowNavbar(false));
    setAnchorElUser(null);
    if (setting.url) {
      navigate(setting.url);
    }
    if (setting.value === "logout") {
      await signout();
      dispatch(logoutUser());
    }
  };

  const handleOpenNavMenu = () => {
    dispatch(setShowNavbar(true));
  };

  const stringAvatar = (name: string) => {
    if (!name?.trim()) {
      return "USER";
    }
    const splittedText = name.split(" ");
    let avatarText = "";
    for (const text of splittedText) {
      avatarText += text[0];
    }
    return avatarText;
  };

  return (
    <Box className="navbar-container">
      {mode && (
        <PopupForm
          title={mode === "JOIN" ? "Join Room" : "Create a room"}
          open={!!mode}
          handleClose={() => dispatch(setMode(null))}
          width={mode === "JOIN" ? "350px" : "300px"}
        >
          {mode === "JOIN" ? <JoinRoomForm /> : <CreateRoomForm />}
        </PopupForm>
      )}
      <Box className="navbar">
        <Box className="navigation-menu-section">
          <GiHamburgerMenu
            className="hamb-menu-icon"
            onClick={handleOpenNavMenu}
          />
          <Backdrop
            open={showNavbar}
            sx={{ visibility: !showNavbar ? "hidden" : "" }}
          >
            <Box sx={{ position: "relative" }}>
              <Box className={`side-options ${showNavbar ? "active" : ""}`}>
                <Box
                  className="close-section"
                  onClick={() => dispatch(setShowNavbar(false))}
                >
                  <IoClose className="close-icon" />
                </Box>
                {navOptions.map((page) => (
                  <MenuItem
                    key={page.value}
                    onClick={() => {
                      dispatch(setShowNavbar(false));
                      if (page.url) {
                        navigate(page.url);
                        return;
                      }
                      dispatch(setMode(page.value));
                    }}
                  >
                    <Typography textAlign="center" className="sidebar-option">
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Box>
            </Box>
          </Backdrop>
        </Box>
        <Link to="/" className="navbar-left">
          <Box>
            <img src={LOGO} className="logo-image" />
          </Box>
          <Box className="logo-name">Code Editor</Box>
        </Link>
        <Box className="navbar-right">
          <Box className="navbar-options">
            {navOptions.map((option) => (
              <Box
                key={option.value}
                onClick={() => {
                  if (option.url) {
                    navigate(option.url);
                    return;
                  }
                  dispatch(setMode(option.value));
                }}
              >
                {option.label}
              </Box>
            ))}
          </Box>
          <Box>
            <Avatar className="navbar-avatar" onClick={handleOpenUserMenu}>
              {stringAvatar(user.name || "")}
            </Avatar>
          </Box>
          {anchorEl && (
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorElUser(null)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.value}>
                  <Typography
                    textAlign="center"
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
