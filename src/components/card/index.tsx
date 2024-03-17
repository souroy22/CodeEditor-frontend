import { Box } from "@mui/material";
import "./style.css";

type PropTypes = {
  title: string;
  description: string;
  TopImage: string;
};

const Card = ({ title, description, TopImage }: PropTypes) => {
  return (
    <Box className="card-container">
      <Box className="card-icon">
        {<img src={TopImage} className="card-image" />}
      </Box>
      <Box className="card-title">{title}</Box>
      <Box className="card-description">{description}</Box>
    </Box>
  );
};

export default Card;
