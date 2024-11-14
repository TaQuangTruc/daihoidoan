import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Fab } from "@mui/material";
import { CameraAlt, Search, Home, ExitToApp } from "@mui/icons-material";

const Layout = ({ onScannerActivate, onSearchActivate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  const handleNavigationChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Floating Action Buttons */}
      <Fab
        onClick={onScannerActivate}
        style={{
          position: "fixed",
          bottom: 80,
          right: 20,
          backgroundImage: "linear-gradient(-225deg, #ea6426 0%, #f1881b 100%)",
          boxShadow: "1px 1px 0 #f1881b, 2px 2px 0 #fff",
          color: "#fff",
        }}
      >
        <CameraAlt />
      </Fab>
      <Fab
        onClick={onSearchActivate}
        style={{
          position: "fixed",
          bottom: 150,
          right: 20,
          color: "#fff",
          backgroundImage: "linear-gradient(-225deg, #41c1ed 0%, #6fc7e9 100%)",
          boxShadow: " 2px 2px 0 #fff",
        }}
      >
        <Search />
      </Fab>

      {/* Main content area */}
      <div style={{ paddingBottom: 60 }}>
        <Outlet /> {/* Render child routes here */}
      </div>

      {/* Bottom navigation bar */}
      <BottomNavigation
        value={value}
        onChange={handleNavigationChange}
        style={{ position: "fixed", bottom: 0, width: "100%" }}
        sx={{
          "& .Mui-selected": {
            backgroundImage:
              "linear-gradient(-225deg, #ea6426 0%, #f1881b 100%)", // Active background color
            color: "#fff", // Active icon color
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            marginTop: "-12px",
            "& .MuiSvgIcon-root": {
              color: "#fff", // Set icon to white when active
            },
          },
        }}
      >
        <BottomNavigationAction
          value="/"
          icon={<Home />}
          sx={{
            "& .MuiSvgIcon-root": {
              color: value === "/" ? "#fff" : "rgba(231, 54, 20, 1)",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        />
        <BottomNavigationAction
          value="/check-in"
          icon={<CameraAlt />}
          sx={{
            "& .MuiSvgIcon-root": {
              color: value === "/check-in" ? "#fff" : "rgba(231, 54, 20, 1)",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        />
        <BottomNavigationAction
          value="/check-out"
          icon={<ExitToApp />}
          sx={{
            "& .MuiSvgIcon-root": {
              color: value === "/check-out" ? "#fff" : "rgba(231, 54, 20, 1)",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        />
      </BottomNavigation>
    </div>
  );
};

export default Layout;
