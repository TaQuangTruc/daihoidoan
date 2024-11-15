import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { changeMaSo } from "../service/service";

const ChangeMaSoPage = () => {
  const [hoVaTen, setHoVaTen] = useState(""); // State to hold the user's name
  const [maSoMoi, setMaSoMoi] = useState(""); // State to hold the new code
  const [statusMessage, setStatusMessage] = useState(""); // State to hold the status message

  const handleSubmit = async () => {
    if (!hoVaTen || !maSoMoi) {
      setStatusMessage("Please fill in both fields.");
      return;
    }
    try {
      await changeMaSo({ hoVaTen, maSoMoi });
      setStatusMessage("Code changed successfully!");
      setHoVaTen("");
      setMaSoMoi("");
    } catch (error) {
      setStatusMessage("Failed to change code. Please try again.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        Change Code
      </Typography>

      {statusMessage && (
        <Typography variant="body1" color="textSecondary" style={{ marginBottom: "16px" }}>
          {statusMessage}
        </Typography>
      )}

      <TextField
        label="Họ và Tên"
        variant="outlined"
        fullWidth
        value={hoVaTen}
        onChange={(e) => setHoVaTen(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ marginBottom: "16px" }}
      />

      <TextField
        label="Mã Số Mới"
        variant="outlined"
        fullWidth
        value={maSoMoi}
        onChange={(e) => setMaSoMoi(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ marginBottom: "16px" }}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default ChangeMaSoPage;
