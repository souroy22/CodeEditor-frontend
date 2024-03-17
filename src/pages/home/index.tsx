import { Box, Button } from "@mui/material";
import HOME_PAGE_IMAGE from "../../assets/images/219923823-bf1ce878-c6b8-4faa-be07-93e6b1006521.gif";
import { cardData } from "../../data/cardData";
import Card from "../../components/card";
import { setMode } from "../../store/room/roomReducer";
import { useDispatch } from "react-redux";
import "./style.css";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <Box className="home-container">
      <Box className="top-section">
        <Box className="home-left-section">
          <Box className="header-title">
            A new model for {window.screen.availWidth > 1200 && <br />}
            open collaboration
          </Box>
          <Box className="header-description">
            Welcome to our dynamic live collaboration platform! Join coding
            sessions in real-time with fellow members, where everyone can
            actively participate and code together. Experience seamless
            collaboration as you see changes happen live, fostering teamwork and
            innovation. Start coding together now!
          </Box>
          <Button
            variant="contained"
            className="create-room-btn"
            onClick={() => dispatch(setMode("Create"))}
          >
            Create a Room
          </Button>
        </Box>
        <Box className="home-right-section">
          <img src={HOME_PAGE_IMAGE} className="header-image" />
        </Box>
      </Box>
      <Box className="mid-section">
        <Box className="mid-title">Reimgining what it means to work</Box>
        <Box className="mid-description">
          Discover the power of real-time coding collaboration! Dive into our
          interactive platform where users can join coding sessions and
          co-create in the moment. Experience the thrill of simultaneous coding,
          where every member in the room contributes and witnesses live changes.
          Join the collaborative coding revolution today!
        </Box>
        <Box className="card-section">
          {cardData.map((data) => (
            <Card
              key={data.id}
              title={data.title}
              description={data.description}
              TopImage={data.image}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
