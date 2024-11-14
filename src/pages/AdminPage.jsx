import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { resetDatabase } from "../service/service";

const AdminPage = () => {
  const [statusMessage, setStatusMessage] = useState(""); // State to hold the message

  const handleClick = async () => {
    try {
      await resetDatabase();
      setStatusMessage(
        "Database reset successfully: 'checkedIn' and 'checkedOut' fields removed."
      );
    } catch (error) {
      setStatusMessage("Failed to reset database. Please try again.");
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Reset Database
      </Button>
      {statusMessage && (
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ marginTop: "16px" }}
        >
          {statusMessage}
        </Typography>
      )}
    </div>
  );
};

export default AdminPage;
