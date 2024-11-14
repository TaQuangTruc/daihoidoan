import { Box, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Footer = () => {
  return (
    <Box sx={{ height: "2vh" }}>
      <Typography sx={{ fontSize: "13px", color: "#333", textAlign: "center" }}>
        Made with{" "}
        <FavoriteBorderIcon sx={{ color: "#FF4545", fontSize: "13px" }} /> from
        HCMUT
      </Typography>
    </Box>
  );
};

export default Footer;
